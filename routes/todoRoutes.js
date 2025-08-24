const express = require("express");
const router = express.Router();
const {createTodo,getTodos,updateTodo,deleteTodo} = require("../controllers/todoController");
const protect = require("../middleware/authMiddleware");

router.get("/get-todo",protect,getTodos);
router.post("/create-todo",protect,createTodo);
router.put("/update-todo",protect,updateTodo);
router.delete("/delete-todo",protect,deleteTodo);

module.exports = router;