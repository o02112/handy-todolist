import { useState, useEffect, useContext } from 'react';

import {todoListContext} from '../context';
import {queryToggleFinishItem, queryUpdateItem, queryDeleteItem} from '../urls';


export const useItemHook = (props) => {
    const { todoItem: propsTodoItem = {} } = props || {}
    // const [todoItem, setTodoItem] = useState({})
    const [editing, setEditingState] = useState(false)
    const [focusIn, setFocusState] = useState(false)
    const [finished, setFinishState] = useState(false)
    const [title, setTitleState] = useState(propsTodoItem.item_title)
    const {dispatch, itemState, textEditorRef} = useContext(todoListContext)

    let pending = false;
    let clickTimeout;

    useEffect(() => {
      handleFocusState(itemState);
      handleFinishState(itemState);
    }, [itemState]);

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

      if(editEnd) { console.log(newState.payload);
        onUpdate(newState.payload.textEditorValue);
      }

      setFocusState(newStatefocus);
      setEditingState(newStateEdit);

    }

    const changeIntoEditMode = () => {
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
      // 不需要再次聚焦或进入编辑状态
      if (editing) return;

      if (pending) { // 双击
        changeIntoEditMode();

        clearTimeout(clickTimeout);
        pending = false;
        return;
      }

      // 单击，聚焦
      pending = true;

      clickTimeout = setTimeout(() => {
        pending = false;

        if(focusIn) return;
        dispatch({
          type: 'focusChange',
          payload: { focusItemId: propsTodoItem.item_id }
        })
      }, 250);
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
                toggleItemIds: { [propsTodoItem.item_id]: !finished }
              }
            })
          }

        })
    }

    const onUpdate = (newTitle) => {
      if(newTitle === title) return;

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
      onUpdate,
      textEditorRef,
    }
}
