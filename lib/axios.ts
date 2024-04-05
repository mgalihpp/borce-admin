import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.ADMIN_DASHBOARD_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;