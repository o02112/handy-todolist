import { useState, useEffect, useContext, useRef } from 'react';

import {todoListContext} from '../context';
import dataStorage from '../dataStorage';
import { FOCUS_ITEM, EDIT_ITEM_START, FINISH_ITEM } from '../actionTypes';

const {
  queryToggleFinishItem,
  queryUpdateItem
} = dataStorage;

let clickTimeout;
let isPending = false;


export const useItemHook = (props) => {
  const { todoItem: propsTodoItem = {} } = props || {}
  const [editing, setEditingState] = useState(false)
  const [focusing, setFocusState] = useState(false)
  const [finished, setFinishState] = useState(false)
  const [title, setTitleState] = useState(propsTodoItem.item_title)
  const {dispatch, todoListAppState} = useContext(todoListContext)

  const textEditorValueRef = useRef('');
  const textEditorRef = useRef();

  useEffect(() => {
    handleStates(todoListAppState.itemsStates);
  }, [propsTodoItem, todoListAppState]);

  useEffect(() => {
    setTitleState(propsTodoItem.item_title)
  }, [propsTodoItem])

  useEffect(() => {
    if(editing) { // 自动聚焦到编辑器，且将光标置于文本的末尾
      const editor = textEditorRef.current;
      const textLen = editor.value.length;
      editor.setSelectionRange(textLen, textLen);
    }
  }, [ editing ])

  const handleStates = (itemsStates) => {
    const itemState = itemsStates[propsTodoItem.item_id];
    const { editing: newEditingState, focusing: newFocusingState, finished: newFinishedState } = itemState;
    
    if(editing===false && newEditingState===true ) textEditorValueRef.current = title; // 进入编辑状态
    
    if(editing===true && newEditingState===false) onUpdate(textEditorValueRef.current); // 退出编辑状态

    setEditingState(newEditingState);
    setFocusState(newFocusingState);
    setFinishState(newFinishedState);
  }

  const onEditTitle = value => {
    textEditorValueRef.current = value;
  }


  const changeIntoEditMode = () => {
    if(finished) return;
    dispatch({
      type: EDIT_ITEM_START,
      payload: { itemId: propsTodoItem.item_id }
    })
  }


  const titleClick = () => {

    if (editing) return; // 编辑状态时触发点击

    if (isPending && focusing) { // 双击
      changeIntoEditMode();

      clearTimeout(clickTimeout);
      isPending = false;
      return;
    }

    // 单击，聚焦
    isPending = true;
    clickTimeout = setTimeout(() => {
      isPending = false;
    }, 250);

    if(focusing) return;
    dispatch({
      type: FOCUS_ITEM,
      payload: {
        itemId: propsTodoItem.item_id,
      }
    })
  }

  const onClickEditIcon = () => {
    changeIntoEditMode();
  }

  const onClickDeleteIcon = () => {
    if(typeof props.deleteItem === 'function') {
      props.deleteItem(propsTodoItem.item_id);
    }
  }

  const onClickDoneOrRefreshIcon = () => {
    queryToggleFinishItem(propsTodoItem.item_id)
      .then((response = {}) => {
        if(response.data.rowCount) {
          dispatch({
            type: FINISH_ITEM,
            payload: {
              itemId: propsTodoItem.item_id,
            }
          })
        }
      })
  }

  const onUpdate = (newTitle = '') => {
    if(typeof newTitle !== 'string') return;
    if(newTitle.trim() === title || newTitle.trim() === '') return;

    setTitleState(newTitle);
    queryUpdateItem(propsTodoItem.item_id, newTitle)
      .then((response = {}) => {
        if(response.data.rowCount) {
          // 更新成功
        }
      })
  }

  return {
    title,
    setTitleState,
    editing,
    focusing,
    finished,
    titleClick,
    onClickEditIcon,
    onClickDeleteIcon,
    onClickDoneOrRefreshIcon,
    onEditTitle,
    textEditorRef,
  }
}
