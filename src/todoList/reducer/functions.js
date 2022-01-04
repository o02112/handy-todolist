const initItemStates = { focusing: false, editing: false, finished: false };

export default class Funcs {

  generateItemsStates = todos => {
    const newItemsStates = {};

    todos.map(todoItem => {
      const oldItemStates = this.state.itemsStates[todoItem.item_id];
      const finished = todoItem['item_finished'];
      newItemsStates[todoItem.item_id] = oldItemStates ? { ...oldItemStates } : { ...initItemStates, finished }
    });
    return newItemsStates;
  }

  deepCloneItemsStates = () => {
    const newItemsStates = { ...this.state['itemsStates']}
    for(let tmpItemId in this.state.itemsStates) {
      newItemsStates[tmpItemId] = { ...this.state.itemsStates[tmpItemId]}
    }
    return newItemsStates;
  }

  // 返回一个新的改变之后的对象
  changeItemStates = ({ itemId, newStates }) => { console.log(newStates)
    const newItemsStates = this.deepCloneItemsStates();
    newItemsStates[itemId] = {...newItemsStates[itemId], ...newStates}
    
    return newItemsStates;
  }

  changeFocusItem = ({ itemId }) => {
    const newItemsStates = this.deepCloneItemsStates();
    
    for(let tmpItemId in newItemsStates) {
      newItemsStates[tmpItemId]['focusing'] = false;
      newItemsStates[tmpItemId]['editing'] = false;
    }

    newItemsStates[itemId]['focusing'] = true;
    return newItemsStates;
  }

  changeEditItem = ({ itemId }) => {
    const newItemsStates = this.deepCloneItemsStates();
    
    for(let tmpItemId in newItemsStates) {
      newItemsStates[tmpItemId]['focusing'] = false;
      newItemsStates[tmpItemId]['editing'] = false;
    }

     newItemsStates[itemId]['editing'] = true;
     return newItemsStates;

  }

}