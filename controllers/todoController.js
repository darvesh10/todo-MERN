const Todo = require("../models/Todo");

// Create
const createTodo = async (req, res, next) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: "Title is required" });
  }
  try {
    const todo = await Todo.create({
      user: req.user._id,
      title,
      description,
    });
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// Read
const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    next(error);
  }
};

// Update
const updateTodo = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const userId = req.user._id;

    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, user: userId },
      req.body,  // Accepts title, description, completed
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found or unauthorized" });
    }

    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// Delete
const deleteTodo = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const userId = req.user._id;

    const todo = await Todo.findOneAndDelete({ _id: todoId, user: userId });

    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found or unauthorized" });
    }

    res.json({ success: true, message: "Todo deleted successfully " });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
