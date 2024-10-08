import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.BACKEND_URL || "https://api.waiterapp.cloud/",
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
