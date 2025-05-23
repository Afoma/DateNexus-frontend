import router from "@/routes/routes";
import axios from "axios";
import Airtable from "airtable";

export const base = new Airtable({
  apiKey:
    import.meta.env.VITE_AIRTABLE_API_KEY ||
    "patw9NBFD4IyquKVM.239148b7f512100f9fd92d2db81d0cc413ee4845dcdefc1d5a79aa1eb06f9db2",
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

const axiosInstance = axios.create({
  baseURL: `https://datenexus-be.onrender.com/api/v1`,
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
        error.response?.status === 403 ||
        error.response?.status === 500
      ) {
        localStorage.clear();
        router.navigate("/app/signin", { replace: true });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
