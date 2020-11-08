import { useState, useEffect, useContext } from 'react';

import {todoListContext} from '../context';
import {queryToggleFinishItem, queryUpdateItem} from '../urls';
let clickTimeout;
let isPending = false;


export const useItemHook = (props) => {
    const { todoItem: propsTodoItem = {} } = props || {}
    const [editing, setEditingState] = useState(false)
    const [focusIn, setFocusState] = useState(false)
    const [finished, setFinishState] = useState(false)
    const [title, setTitleState] = useState(propsTodoItem.item_title)
    const {dispatch, itemState, textEditorRef} = useContext(todoListContext)


    useEffect(() => {
      handleFocusState(itemState);
      handleFinishState(itemState);
    }, [propsTodoItem, itemState]);

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


    const handleFinishState = (newState) => {
      if(propsTodoItem.item_finished === undefined) return;

      if(propsTodoItem.item_id in newState.payload.toggleItemIds) {
        setFinishState(newState.payload.toggleItemIds[propsTodoItem.item_id]);
      } else {
        setFinishState(propsTodoItem.item_finished);
      }
    }

    const handleFocusState = (newState) => {
      const newStatefocus = newState.payload.focusItemId === propsTodoItem.item_id;
      const newStateEdit = newState.payload.editItemId === propsTodoItem.item_id;
      const editEnd = (editing && !newStateEdit); // 完成编辑

      if(editEnd) {
        onUpdate(newState.payload.textEditorValue);
      }
      setFocusState(newStatefocus);
      setEditingState(newStateEdit);
    }

    const changeIntoEditMode = () => {
      if(finished) return;
      dispatch({
        type: 'editingStartNew',
        payload: {
          editItemId: propsTodoItem.item_id,
          focusItemId: propsTodoItem.item_id,
        }
      })
    }


    const titleClick = () => {

      // 编辑状态下，不响应点击
      if (editing) return;
      if (isPending && focusIn) { // 双击
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

      if(focusIn) return;
      dispatch({
        type: 'focusChange',
        payload: {
          focusItemId: propsTodoItem.item_id,
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
        .then((data = {}) => {
          if(data.data && data.data.rowCount) {
            dispatch({
              type: 'toggleFinish',
              payload: {
                [propsTodoItem.item_id]: !finished,
              }
            })
          }
        })
    }

    const onUpdate = (newTitle = '') => {
      if(typeof newTitle !== 'string') return;
      if(newTitle.trim() === title || newTitle.trim() === '') return;

      setTitleState(newTitle);
      queryUpdateItem(newTitle, propsTodoItem.item_id)
        .then((data = {}) => {
          console.log(data);
          if(data.data && data.data.rowCount) {
            // 更新成功
          }
        })
    }

    return {
      title,
      setTitleState,
      editing,
      focusIn,
      finished,
      titleClick,
      onClickEditIcon,
      onClickDeleteIcon,
      onClickDoneOrRefreshIcon,
      textEditorRef,
    }
}
