import express from "express";
import dotenv from "dotenv";
import connectToDB from "../database/db.js";
import { Todo } from "../models/todo.model.js";
//load environment variables first
dotenv.config();
//connect to mongodb
connectToDB();
const app = express();
const port = 4000;
//enable json parsing
app.use(express.json());
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
      data: "result",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "failed to create todo",
      data: "result",
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
