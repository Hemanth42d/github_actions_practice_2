const taskModel = require("../models/task.js");
const userModel = require("../models/user.js");

const addTask = async (req, res) => {
  try {
    let { taskName, priority, completed } = req.body;
    let userId = req.user.id; // Assuming you have middleware to get user from token

    if (!taskName || !priority)
      return res
        .status(400)
        .json({ error: true, message: "Task name and priority are required" });

    const newTask = await taskModel.create({
      taskName,
      priority,
      completed: completed || false,
      user: userId,
    });

    // Add task to user's tasks array
    await userModel.findByIdAndUpdate(userId, {
      $push: { tasks: newTask._id },
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "Successfully added task",
        task: newTask,
      });
  } catch (error) {
    res.status(500).json({ error: true, message: "Something went wrong" });
  }
};

const updateTask = async (req, res) => {
  try {
    let { taskId } = req.params;
    let { taskName, priority, completed } = req.body;
    let userId = req.user.id;

    if (!taskName || !priority)
      return res
        .status(400)
        .json({ error: true, message: "Task name and priority are required" });

    // Check if task belongs to user
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    if (task.user.toString() !== userId) {
      return res.status(403).json({ error: true, message: "Unauthorized" });
    }

    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { taskName, priority, completed },
      { new: true },
    );

    return res
      .status(200)
      .json({
        success: true,
        message: "Task updated successfully",
        task: updatedTask,
      });
  } catch (error) {
    res.status(500).json({ error: true, message: "Something went wrong" });
  }
};

const deleteTask = async (req, res) => {
  try {
    let { taskId } = req.params;
    let userId = req.user.id;

    // Check if task belongs to user
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    if (task.user.toString() !== userId) {
      return res.status(403).json({ error: true, message: "Unauthorized" });
    }

    await taskModel.findByIdAndDelete(taskId);

    // Remove task from user's tasks array
    await userModel.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Something went wrong" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    let userId = req.user.id;

    const tasks = await taskModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ error: true, message: "Something went wrong" });
  }
};

const getTaskById = async (req, res) => {
  try {
    let { taskId } = req.params;
    let userId = req.user.id;

    const task = await taskModel
      .findById(taskId)
      .populate("user", "name email");

    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    if (task.user._id.toString() !== userId) {
      return res.status(403).json({ error: true, message: "Unauthorized" });
    }

    return res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ error: true, message: "Something went wrong" });
  }
};

const toggleTaskStatus = async (req, res) => {
  try {
    let { taskId } = req.params;
    let userId = req.user.id;

    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    if (task.user.toString() !== userId) {
      return res.status(403).json({ error: true, message: "Unauthorized" });
    }

    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { completed: !task.completed },
      { new: true },
    );

    return res
      .status(200)
      .json({
        success: true,
        message: "Task status updated",
        task: updatedTask,
      });
  } catch (error) {
    res.status(500).json({ error: true, message: "Something went wrong" });
  }
};

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  toggleTaskStatus,
};
