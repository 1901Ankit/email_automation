import axios from "axios";
const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
