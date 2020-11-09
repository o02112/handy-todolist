const mongoose = require('mongoose');

const todolistSchema = new mongoose.Schema({
  item_id: String,
  item_title: String,
  item_finished: { type: Boolean, default: false },
  item_created: { type: Date, default: Date.now },
  item_last_update: { type: Date, default: Date.now },
});
 
module.exports = mongoose.model('todolist', todolistSchema);;
