import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);


apiClient.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if (error.response?.status == 401) {
            localStorage.clear();
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)