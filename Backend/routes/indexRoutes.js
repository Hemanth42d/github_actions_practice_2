const express = require("express");
const {
  loginUser,
  registerUser,
  logout,
  updatePassword,
} = require("../controllers/authController");
const {
  addTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  toggleTaskStatus,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logout);
router.put("/update-password", authMiddleware, updatePassword);

router.post("/tasks", authMiddleware, addTask);
router.get("/tasks", authMiddleware, getAllTasks);
router.get("/tasks/:taskId", authMiddleware, getTaskById);
router.put("/tasks/:taskId", authMiddleware, updateTask);
router.delete("/tasks/:taskId", authMiddleware, deleteTask);
router.patch("/tasks/:taskId/toggle", authMiddleware, toggleTaskStatus);

module.exports = router;
