// using localstorage to save todoList data
const LS = window.localStorage;
if(LS === undefined) {
  throw new Error('window.localStorage is not supported.')
}
const LSKEY = 'handy-todolist';


const getLSData = () => {
  let lsData = LS.getItem(LSKEY);

  if(!lsData) {
    LS.setItem(LSKEY, JSON.stringify({}));
    console.log('localstorage initialized.');
    return {};
  } else {
    lsData = JSON.parse(lsData);

    return lsData;
  }
}
const setLSData = (data) => {
  LS.setItem(LSKEY, JSON.stringify(data));
}
const setTodoItem = (id, value) => {
  const lsData = getLSData();
  lsData[id] = value;

  setLSData(lsData);
}
const modifyItem = (itemId, callback) => {
  const itemData = getTodoItem(itemId);
  if(typeof callback === 'function') {
    callback(itemData);
  }

  setTodoItem(itemId, itemData);
}
const getTodoItem = (id) => {
  const itemData = getLSData()[id];
  if(!itemData) {
    throw new Error(`[update ${id}]: Id is not exists.`);
  }

  return itemData;
}


export const queryListItem = () => {
  const lsData = getLSData();
  const todoList = [];
  for(let itemId in lsData) {
    todoList.unshift(lsData[itemId]);
  }

  return Promise.resolve({ err: null, data: todoList});
}


export const queryAddItem = (title) => {
  if(!title.trim()) {
    console.error(`[add title]: ${title} should not be empty.`)
    return;
  }

  const createTime = Date.now();
  const initItemData = {
    item_id: createTime,
    item_title: title,
    item_finished: false,
    item_created: createTime,
    item_last_update: createTime,
  }

  setTodoItem(createTime, initItemData);
  return Promise.resolve({ err: null, data: { rowCount: 1 }});
}


export const queryUpdateItem = (itemId, itemTitle) => {
  if(!itemTitle.trim()) {
    console.error(`[add ${itemTitle}]:  should not be empty.`)
    return;
  }

  modifyItem(itemId, itemData => {
    itemData['item_title'] = itemTitle;
    itemData['item_last_update'] = Date.now();
  });

  return Promise.resolve({ err: null, data: { rowCount: 1 }});
}


export const queryToggleFinishItem = (itemId) => {
  modifyItem(itemId, itemData => {
    itemData['item_finished'] = !itemData['item_finished'];
  });

  return Promise.resolve({ err: null, data: { rowCount: 1 }});
}


export const queryDeleteItem = (itemId) => {
  const lsData = getLSData();
  delete lsData[itemId];
  setLSData(lsData);

  return Promise.resolve({ err: null, data: { rowCount: 1 }});
}
