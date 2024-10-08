import axios from "axios";
import { getToken } from "./functions";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://192.168.2.105:3001",
});

api.interceptors.request.use(async (config) => {
  const token = await getToken("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
