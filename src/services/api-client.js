import router from "@/routes/routes";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        localStorage.clear();
        router.navigate("/signin", { replace: true });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
