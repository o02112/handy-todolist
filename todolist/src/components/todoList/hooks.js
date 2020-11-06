import {useState, useEffect, useReducer} from 'react';
import {queryListItem, queryAddItem} from './urls';


export const useTodoListHook = () => {
  const [todos, setTodos] = useState([]);

  const initState = {
    payload: {
      editItemId: 0,
      focusItemId: 0,
    }
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'focus':
        return {
          payload: {
            ...state.payload,
            focusItemId: action.payload.focusItemId,
          }
        };
      case 'edit':
        return {
          payload: {
            ...state.payload,
            editItemId: action.payload.editItemId,
            focusItemId: action.payload.focusItemId, // 进入编辑状态时，自动设置聚焦
          }
        }
      default:
        return { payload: {...initState.payload} }
    }
  }

  const [itemState, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    queryListItem().then(data => {
      // console.log(data);
      setTodos(data.data || [])
    })
  }, [])


  const addItem = title => {
    queryAddItem(title).then(data => {
      console.log(data);
      if (!data.rowCount) {
        console.log('add success!');

        queryListItem().then(data => {
          // console.log(data);
          setTodos([...data.data] || [])
        })
      }
    })
  }

  const deleteItem = itemId => {

    // fetch /api/deleteItem
    // itemId = ...
    const newTodos = todos.filter(todo => todo.item_id !== itemId)

    setTodos(newTodos);
  }


  const handleClickAway = () => {
    console.log('click away');

    let oldState = itemState.payload;
    const editEnd = oldState.editItemId !== 0;
    const focusOut = oldState.editItemId === 0 && oldState.focusItemId !== 0

    const payload = {};
    if(editEnd) {
      dispatch({
        type: 'edit',
        payload: { editItemId: 0, focusItemId: oldState.focusItemId }
      })
    }
    
    if(focusOut) dispatch({ type: 'focus', payload: { focusItemId: 0 } })
  }


  return { todos, addItem, deleteItem, handleClickAway, itemState, dispatch }

}
