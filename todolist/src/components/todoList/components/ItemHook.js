import { useState, useEffect, useContext } from 'react';
import {todoListContext} from '../context';


export const useItemHook = (props) => {
    const { todoItem: propsTodoItem = {} } = props || {}
    const [todoItem, setTodoItem] = useState([])
    // const [ selected, setSelectStatus ] = useState(false)
    const [editing, setEditingState] = useState(false)
    const [focusIn, setFocusState] = useState(false)
    const {dispatch, itemState} = useContext(todoListContext)

    let pending = false;
    let clickTimeout;

    useEffect(() => {
      setTodoItem(propsTodoItem);

      handleFocusState(itemState);

    }, [propsTodoItem, itemState]);

    const handleFocusState = (newState) => {
      const newStatefocus = newState.payload.focusItemId === todoItem.item_id;
      const newStateEdit = newState.payload.editItemId === todoItem.item_id;
      const focusOut = focusIn && !newStatefocus; // 失去聚焦
      const editEnd = (editing && !newStateEdit); // 完成编辑

      // 进入编辑状态，将同时设置focus 和 editing 为true
      // 下面的两行代码也能正常工作
      if(newStatefocus) setFocusState(true);
      if(newStateEdit) setEditingState(true);

      if(focusOut) {
        setFocusState(false);

        if(editing) setEditingState(false);
      }
      if(editEnd) setEditingState(false);   // 从编辑状态退出，不失焦
      
      // console.log(newState);
    }


    const titleClick = () => {
      // 编辑状态下，不响应点击
      // 不需要再次聚焦或进入编辑状态
      if (editing) return;

      if (pending) { // 双击
        dispatch({
          type: 'edit',
          payload: {
            editItemId: todoItem.item_id,
            focusItemId: todoItem.item_id,
          }
        })

        // clear
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
          type: 'focus',
          payload: { focusItemId: todoItem.item_id }
        })
      }, 300);
    }


    return { editing, focusIn, todoItem, titleClick }
}
