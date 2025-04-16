const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = new Schema({
  text: { type: String, required: false },
  priority: { type: String, required: false },
  deadline: { type: String, required: false },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = { Todo };
