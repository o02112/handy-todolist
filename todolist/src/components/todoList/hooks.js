import {useState, useEffect, useReducer, useRef} from 'react';
import {
  queryListItem,
  queryAddItem,
  queryUpdateItem,
  queryToggleFinishItem,
  queryDeleteItem,
} from './urls';


export const useTodoListHook = () => {
  const [todos, setTodos] = useState([]);
  const textEditorRef = useRef();

  const initState = {
    payload: {
      editItemId: 0,
      focusItemId: 0,
      toggleItemIds: {},
    }
  }

  const reducer = (state, action) => { console.log('reducer', action);
    let textEditorValue;
    // const editingJump = state.payload.editItemId !== 0 && state.payload.focusItemId !== 0
    textEditorValue = textEditorRef.current ? textEditorRef.current.value : '';

    switch (action.type) {
      case 'focusChange':
        return {
          payload: {
            ...state.payload,
            editItemId: 0,
            focusItemId: action.payload.focusItemId,
            textEditorValue,
          }
        }
      case 'editingStartNew':

        return {
          payload: {
            ...state.payload,
            editItemId: action.payload.editItemId,
            focusItemId: action.payload.focusItemId, // 进入编辑状态时，自动设置聚焦
            textEditorValue,
          }
        }
      case 'editingOut':
        return {
          payload: {
            ...state.payload,
            editItemId: 0,
            textEditorValue,
          }
        }
      case 'focusOut':
        return {
          payload: {
            ...state.payload,
            focusItemId: 0,
            textEditorValue,
          }
        }
      case 'toggleFinish':
        return {
          payload: {
            ...state.payload,
            toggleItemIds: {...action.payload.toggleItemIds}
          }
        }
      default:
        return { payload: {...state.payload} }
    }
  }

  const [itemState, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    queryTodoList();
  }, []);

  const queryTodoList = () => {
    queryListItem().then((data = {}) => {
      setTodos(data.data || [])
    })
  }


  const addItem = title => {
    queryAddItem(title)
      .then((data = {}) => {
        if (data.data && data.data.rowCount) {
          queryTodoList();
        }
    })
  }

  const deleteItem = itemId => {
    queryDeleteItem(itemId)
      .then((data = {}) => {
        if(data.data && data.data.rowCount) {
          queryTodoList();
        }
      })
  }

  const handleClickAway = () => {

    let prevState = itemState.payload;
    const editingOut = prevState.editItemId !== 0 && prevState.focusItemId !== 0
    const focusOut = prevState.editItemId === 0 && prevState.focusItemId !== 0

    if(editingOut) {
      // 编辑状态点击空白处，退出编辑，仍保留聚焦状态
      dispatch({ type: 'editingOut' });
    } else if(focusOut) {
      dispatch({ type: 'focusOut' });
    }
  }


  return {
    todos,
    addItem,
    deleteItem,
    handleClickAway,
    itemState,
    dispatch,
    textEditorRef,
  }

}
