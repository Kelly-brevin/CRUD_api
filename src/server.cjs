const express = require("express");
const dotenv = require("dotenv");
const connectToDB = require("../database/db.cjs");
const { Todo } = require("../models/todo.model.cjs");

const bodyParser = require("body-parser");
const cors = require("cors");
//load environment variables first
dotenv.config();
//connect to mongodb
connectToDB();
const app = express();
const port = 4000;
//enable json parsing
app.use(express.json());

//use the packages here
app.use(bodyParser.json()); //to suport json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //to support url encoded bodies
app.use(cors()); //allows data sharing front-back

//TODO API
app.get("/todos", async (req, res) => {
  try {
    const result = await Todo.find();
    res.send({
      success: true,
      message: "TODO LIST RETRIEVED",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Todo list not retrieved",
      data: result,
    });
  }
});
app.post("/post-todos", async (req, res) => {
  const todoDetails = req.body;
  try {
    const result = await Todo.create(todoDetails);
    res.send({
      success: true,
      message: "todo is created successfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "failed to create todo",
      error: error.message,
    });
  }
});

app.get("/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  try {
    const result = await Todo.findByIdAndUpdate(todoId);
    res.send({
      success: true,
      message: "todo list retrieved succesfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "todo list not restrieved",
      data: result,
    });
  }
});

app.patch("/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  const updatedTodo = req.body;
  try {
    const result = await Todo.findByIdAndUpdate(todoId, updatedTodo);
    res.send({
      success: true,
      message: "todo list succesfully updated",
      data: "result",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "failed to update todo list",
      data: "result",
    });
  }
});

app.listen(port, () => console.log(`SERVER IS RUNNING ON ${port}`));
