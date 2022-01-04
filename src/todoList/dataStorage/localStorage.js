// using localstorage to save todoList data
const LS = window.localStorage;
if(LS === undefined) {
  throw new Error('window.localStorage is not supported.')
}
const LS_TODOLIST_KEY = 'handy-todolist';
const LS_SORT_ARRAY_KEY = 'handy-todolist-sort';


const getLSData = (lsKey = LS_TODOLIST_KEY) => {
  let lsData = LS.getItem(lsKey);
  let initData;

  if(!lsData) {
    switch (lsKey) {
      case LS_TODOLIST_KEY:
        initData = {};
      break;
      case LS_SORT_ARRAY_KEY:
        initData = [];
      break;
    }
    setLSData(initData, lsKey);
    return initData;
  } else {
    lsData = JSON.parse(lsData);
    return lsData;
  }
}
const setLSData = (data, lsKey=LS_TODOLIST_KEY) => {
  LS.setItem(lsKey, JSON.stringify(data));
}



const lsAddTodoSortItem = (itemId) => {
  const sortArray = getLSData(LS_SORT_ARRAY_KEY);
  sortArray.unshift(itemId.toString());
  setLSData(sortArray, LS_SORT_ARRAY_KEY);
}


const lsAddTodoItem = (id, value) => {
  const lsData = getLSData();
  lsData[id] = value;

  setLSData(lsData);
}
const getTodoItem = (id) => {
  const itemData = getLSData()[id];
  if(!itemData) {
    throw new Error(`[update ${id}]: Id is not exists.`);
  }

  return itemData;
}

const modifyItem = (itemId, callback) => {
  const itemData = getTodoItem(itemId);
  if(typeof callback === 'function') {
    callback(itemData);
  }

  lsAddTodoItem(itemId, itemData);
}


// 将以item_id为key的 todosObject
// 按排序数组sortArray排序后，转换为数组结构
// 返回，做为最终展示数据 resultArray
const sortTodosObjectToArray = (todosObject={}) => {
  let resultArray = [];
  const tmpArray = []; // 容错，保存未排序或排序有误的项，并将其置于结果数组末尾
  const sortArray = getLSData(LS_SORT_ARRAY_KEY);
  for(let todoItemId in todosObject) {
    const index = sortArray.indexOf(todoItemId);

    if(index === -1) {
      tmpArray.push(todosObject[todoItemId]);
    } else if(resultArray[index]){
      tmpArray.push(todosObject[todoItemId]);
    } else {
      resultArray[index] = todosObject[todoItemId];
    }

    resultArray = resultArray.concat(tmpArray);
  }

  // 排序数据 sortArray 中没有数据时
  // 将现有的顺序保存到localStorage
  // 此情景在初次使用时出现
  if(sortArray.length === 0) {
    setLSData(tmpArray.map(todoItem => todoItem['item_id']), LS_SORT_ARRAY_KEY)
  }

  return resultArray;
}


export const queryListItem = () => {
  const lsData = getLSData();
  const todoList = sortTodosObjectToArray(lsData);

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

  lsAddTodoItem(createTime, initItemData);
  lsAddTodoSortItem(createTime);

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
