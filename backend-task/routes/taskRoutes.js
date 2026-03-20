const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = require("../controllers/taskController");

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTaskStatus);

module.exports = router;