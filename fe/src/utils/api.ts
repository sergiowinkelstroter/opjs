import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.BACKEND_URL || "http://localhost:3001",
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
