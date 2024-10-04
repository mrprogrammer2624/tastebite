import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL; // Access environment variable in Vite

const axiosApi = axios.create({
  baseURL: backendUrl,
});

const setAuthHeader = (name) => {
  const cookieMatch = document.cookie.match("(?:^|; )" + name + "=([^;]*)");
  return cookieMatch ? decodeURIComponent(cookieMatch[1]) : "";
};

// Check if we are in the browser environment
if (typeof window !== "undefined") {
  const token = window.localStorage.getItem("_token");
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

// Setting up interceptors
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 404) {
      console.log(" ERROR => 404 => API not available");
      toast.error(error.response.data.message);
    } else if (error?.response?.status === 500) {
      console.log(" ERROR => 500 => Server Error");
      toast.error(error.response.data.message);
    } else if (error?.response?.status === 401) {
      toast.error(error.response.data.message);
      console.log(" ERROR => 401 => User is not authorized");
      if (localStorage.getItem("_token")) {
        window.location.href = "/";
      }
    } else {
      toast.error("/other-errors.");
    }

    return Promise.reject(error);
  }
);

export { axiosApi, setAuthHeader };
