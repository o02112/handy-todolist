import {
  SET_TODOS,
  EDIT_ITEM_START,
  FOCUS_OUT,
  FOCUS_ITEM,
  FINISH_ITEM,
} from '../actionTypes'

import Funcs from './functions'
const funcs = new Funcs();

export default (state, action) => {
  let finalState,
    newItemsStates;
  
  funcs.state = state;
  const {
    generateItemsStates,
    deepCloneItemsStates,
    changeEditItem,
    changeFocusItem,
    changeItemStates,
  } = funcs;

  switch (action.type) {
    case SET_TODOS:
      const todos = action.payload.todos;

      finalState = {
        ...state,
        todos,
        itemsStates: generateItemsStates(todos),
      }
      break;
    case EDIT_ITEM_START:
      // newItemsStates = deepCloneItemsStates();
      // newItemsStates[action.payload.id]['editing'] = true;
      finalState = {
        ...state,
        itemsStates: changeEditItem({ itemId: action.payload.itemId }),
      }
      break;
    case FOCUS_OUT:
      newItemsStates = deepCloneItemsStates();
      for (let itemId in newItemsStates) {

        // 处于编辑状态的项，改为聚焦状态
        const editing = !!newItemsStates[itemId]['editing'];
        newItemsStates[itemId] = { ...newItemsStates[itemId], focusing: editing, editing: false };
      }
      finalState = {
        ...state,
        itemsStates: newItemsStates,
      }
      break;
    case FOCUS_ITEM:
      finalState = {
        ...state,
        itemsStates: changeFocusItem({ itemId: action.payload.itemId }),
      }
      break;
    case FINISH_ITEM:
      const itemId = action.payload.itemId;
      const finished = !state.itemsStates[itemId]['finished'];

      finalState = {
        ...state,
        itemsStates: changeItemStates({ itemId, newStates: { finished } })
      }
      break;
    default:
      finalState = { ...state }
      break;
  }


  console.log(action, finalState);
  return finalState;
}
