import React, { useState, useEffect } from "react";
import Sidebar from "./HomePage/Sidebar";
import { tasksAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const MyTasks = () => {
  const { user, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskPriority, setEditTaskPriority] = useState("medium");

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getAllTasks();
      if (response.success) {
        setTasks(response.tasks);
      }
    } catch (error) {
      setError("Failed to fetch tasks");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      try {
        const response = await tasksAPI.createTask({
          taskName: newTask.trim(),
          priority: newTaskPriority,
          completed: false,
        });

        if (response.success) {
          setTasks([response.task, ...tasks]);
          setNewTask("");
          setNewTaskPriority("medium");
        } else {
          setError("Failed to add task");
        }
      } catch (error) {
        setError("Failed to add task");
        console.error("Error adding task:", error);
      }
    }
  };

  const toggleTask = async (id) => {
    try {
      const response = await tasksAPI.toggleTask(id);
      if (response.success) {
        setTasks(tasks.map((task) => (task._id === id ? response.task : task)));
      }
    } catch (error) {
      setError("Failed to update task");
      console.error("Error toggling task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await tasksAPI.deleteTask(id);
      if (response.success) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      setError("Failed to delete task");
      console.error("Error deleting task:", error);
    }
  };

  const startEditTask = (task) => {
    setEditingTask(task._id);
    setEditTaskName(task.taskName);
    setEditTaskPriority(task.priority);
  };

  const cancelEditTask = () => {
    setEditingTask(null);
    setEditTaskName("");
    setEditTaskPriority("medium");
  };

  const updateTask = async (taskId) => {
    try {
      const response = await tasksAPI.updateTask(taskId, {
        taskName: editTaskName,
        priority: editTaskPriority,
        completed: tasks.find((task) => task._id === taskId).completed,
      });

      if (response.success) {
        setTasks(
          tasks.map((task) => (task._id === taskId ? response.task : task)),
        );
        cancelEditTask();
      } else {
        setError("Failed to update task");
      }
    } catch (error) {
      setError("Failed to update task");
      console.error("Error updating task:", error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">My Tasks</h1>
            {user && (
              <p className="text-gray-600">
                Welcome back, {user.name || user.email}!
              </p>
            )}
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form
            onSubmit={addTask}
            className="mb-8 bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Task
              </button>
            </div>
          </form>

          <div className="bg-white rounded-lg shadow-sm">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                <span className="text-4xl">⏳</span>
                <p className="mt-2">Loading tasks...</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <span className="text-4xl">📝</span>
                <p className="mt-2">No tasks yet. Add one above!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    {editingTask === task._id ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleTask(task._id)}
                          className={`w-5 h-5 rounded border-2 transition-colors ${
                            task.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-green-400"
                          }`}
                        >
                          {task.completed && "✓"}
                        </button>

                        <input
                          type="text"
                          value={editTaskName}
                          onChange={(e) => setEditTaskName(e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />

                        <select
                          value={editTaskPriority}
                          onChange={(e) => setEditTaskPriority(e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                        >
                          <option value="high">🔴 High</option>
                          <option value="medium">🟡 Medium</option>
                          <option value="low">🟢 Low</option>
                        </select>

                        <button
                          onClick={() => updateTask(task._id)}
                          className="text-green-600 hover:text-green-700 transition-colors p-1"
                          title="Save changes"
                        >
                          ✅
                        </button>

                        <button
                          onClick={cancelEditTask}
                          className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                          title="Cancel editing"
                        >
                          ❌
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleTask(task._id)}
                          className={`w-5 h-5 rounded border-2 transition-colors ${
                            task.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-green-400"
                          }`}
                        >
                          {task.completed && "✓"}
                        </button>

                        <div className="flex-1">
                          <span
                            className={`${
                              task.completed
                                ? "text-gray-500 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            {task.taskName}
                          </span>
                        </div>

                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </span>

                        <button
                          onClick={() => startEditTask(task)}
                          className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                          title="Edit task"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() => deleteTask(task._id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                          title="Delete task"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {tasks.length}
              </div>
              <div className="text-sm text-gray-500">Total Tasks</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-semibold text-green-600">
                {tasks.filter((task) => task.completed).length}
              </div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-semibold text-blue-600">
                {tasks.filter((task) => !task.completed).length}
              </div>
              <div className="text-sm text-gray-500">Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
