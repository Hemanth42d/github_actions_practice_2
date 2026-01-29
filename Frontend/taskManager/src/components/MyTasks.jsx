import React, { useState } from "react";
import Sidebar from "./HomePage/Sidebar";

const MyTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Review project proposal",
      completed: false,
      priority: "high",
    },
    {
      id: 2,
      title: "Update website content",
      completed: true,
      priority: "medium",
    },
    {
      id: 3,
      title: "Call client about meeting",
      completed: false,
      priority: "low",
    },
  ]);
  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask.trim(),
          completed: false,
          priority: newTaskPriority,
        },
      ]);
      setNewTask("");
      setNewTaskPriority("medium");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            My Tasks
          </h1>

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
            {tasks.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <span className="text-4xl">📝</span>
                <p className="mt-2">No tasks yet. Add one above!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
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
                          {task.title}
                        </span>
                      </div>

                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                      >
                        🗑️
                      </button>
                    </div>
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
