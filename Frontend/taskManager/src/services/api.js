import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const authAPI = {
  register: async (userData) => {
    const response = await api.post("/register", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
};

export const tasksAPI = {
  getAllTasks: async () => {
    const response = await api.get("/tasks");
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post("/tasks", taskData);
    return response.data;
  },

  updateTask: async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },

  toggleTask: async (taskId) => {
    const response = await api.patch(`/tasks/${taskId}/toggle`);
    return response.data;
  },

  getTaskById: async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },
};

export default api;
