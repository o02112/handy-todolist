const mongoose = require('mongoose');
const TodoSchema = require('./schema');
const { v4: uuidv4 } = require('uuid');



const listItem = (cb) => {
  TodoSchema.find().sort('-item_created').then(data => {
    cb(null, { data })
  });
}


const insertItem = (title, cb) => {
  const createTodo = new TodoSchema({
    item_id: uuidv4(),
    item_title: title,
  });
  createTodo.save().then(data => {
    cb(null, { rowCount: 1 })
  })

}


const updateItem = ({title = '', itemId=0 } = {}, cb) => {
  TodoSchema.findOne({ item_id: itemId })
    .then(data => {
      data['item_title'] = title;

      data.save()
      .then(data => {
        cb(null, { rowCount: 1 })
      })
    })
}


const toggleItem = ({ itemId = 0 } = {}, cb) => {
  TodoSchema.findOne({ item_id: itemId })
    .then(data => { console.log('toggle', data);
      data['item_finished'] = !data['item_finished'];

      data.save()
      .then(data => {
        cb(null, { rowCount: 1 })
      })
    })
}


const deleteItem = (itemId, cb) => {
  TodoSchema.deleteOne({ item_id: itemId })
    .then(data => {
      cb(null, { rowCount: 1 })
    })

}

module.exports = { listItem, insertItem, updateItem, toggleItem, deleteItem };