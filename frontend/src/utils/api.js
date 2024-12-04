import axios from "axios";
import { toast } from "react-hot-toast";

// Base API configuration
const api = axios.create({
  baseURL: "https://authify-kewx.onrender.com/api/v1",
  withCredentials: true, // Allow cookies to be sent with requests
});

// Axios Interceptor: Response Handler
api.interceptors.response.use(
  (response) => response, // Successful responses
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message;

      // Handle "Refresh token missing" error
      if (errorMessage === "Refresh token missing. Please log in again.") {
        localStorage.clear();
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // Handle token expiration case
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh the access token
          const refreshResponse = await axios.post(
            "http://localhost:3000/api/v1/auth/refresh-access-token",
            {}, // No headers needed, cookies are automatically sent
            { withCredentials: true }
          );

          // Retry the original request, no need to set Authorization manually
          return api(originalRequest); // No need to modify originalRequest headers
        } catch (refreshError) {
          console.error("Failed to refresh access token:", refreshError);
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error); // Other errors
  }
);

export default api;
