import {useState, useEffect, useReducer, useRef} from 'react';
import dataStorage from './dataStorage/index';
const {
  queryListItem,
  queryAddItem,
  queryDeleteItem,
} = dataStorage

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

  const reducer = (state, action) => {
    let finalState;
    let textEditorValue;
    textEditorValue = textEditorRef.current ? textEditorRef.current.value : '';

    switch (action.type) {
      case 'focusChange':
        finalState = {
          payload: {
            ...state.payload,
            textEditorValue,
            editItemId: 0,
            focusItemId: action.payload.focusItemId
          }
        }
      break;
      case 'editingStartNew':
        finalState = {
          payload: {
            ...state.payload,
            textEditorValue,
            ...action.payload,
          }
        }
      break;
      case 'editingOut':
        // 编辑状态点击空白处，退出编辑，仍保留聚焦状态
        finalState = {
          payload: {
            ...state.payload,
            textEditorValue,
            editItemId: 0,
          }
        }
      break;
      case 'focusOut':
        finalState = {
          payload: {
            ...state.payload,
            textEditorValue,
            focusItemId: 0,
          }
        }
      break;
      case 'toggleFinish':
        finalState = {
          payload: {
            ...state.payload,
            toggleItemIds: {
              ...state.payload.toggleItemIds,
              ...action.payload,
            }
          }
        }
      break;
      default:
        finalState = { payload: {...state.payload} }
      break;
    }

    // console.log(action.type, finalState);
    return finalState;
  }

  const [itemState, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    queryTodoList();
  }, []);

  const queryTodoList = () => {
    queryListItem().then((response = {}) => { console.log(response);
      setTodos(response.data || [])
    })
  }


  const addItem = title => {
    queryAddItem(title)
      .then((response = {}) => {
        if (response.data.rowCount) {
          queryTodoList();
        }
    })
  }

  const deleteItem = itemId => {
    queryDeleteItem(itemId)
      .then((response = {}) => {
        if(response.data.rowCount) {
          queryTodoList();
        }
      })
  }

  const handleClickAway = () => {

    let prevState = itemState.payload;
    const editingOut = prevState.editItemId !== 0 && prevState.focusItemId !== 0
    const focusOut = prevState.editItemId === 0 && prevState.focusItemId !== 0

    if(editingOut) {
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
