
export const urls = {
  listItemUrl: 'http://localhost:5000/api/todolist/listItem',
  addItemUrl: 'http://localhost:5000/api/todolist/addItem',
  finisheItemUrl: 'http://localhost:5000/api/todolist/finishItem',
  deleteItemUrl: 'http://localhost:5000/api/todolist/deleteItem',
}


export const post = (url, data={}) => { console.log(data);
  return fetch(url, {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  })
}


export const get = (url, data) => {
  return fetch(url, {
    method: 'GET',
    body: JSON.stringify(data),
  })
}


export const queryListItem = () => {
  return post(urls.listItemUrl)
    .then(response => {
      return response.json();
    })
}

export const queryAddItem = (title) => {
  return post(urls.addItemUrl, { title })
    .then(response => {
      return response.json();
    })
}


export const queryFinishItem = (itemId) => {
  return post(urls.finisheItemUrl, { itemId })
  .then(response => {
    return response.json();
  })
}


export const queryDeleteItem = (itemId) => {
  return post(urls.deleteItemUrl, { itemId })
  .then(response => {
    return response.json();
  })
}
