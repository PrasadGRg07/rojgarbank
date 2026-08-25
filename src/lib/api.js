import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
});

// ================= REQUEST =================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE =================

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        try {
          const res = await axios.post(`${api.defaults.baseURL}/auth/refresh/`, {
            refresh,
          });

          localStorage.setItem("access", res.data.access);

          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

          return api(originalRequest);
        } catch (refreshError) {
          let user = null;

          try {
            user = JSON.parse(localStorage.getItem("user"));
          } catch (e) {
            user = null;
          }

          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("user");

          switch (user?.role) {
            case "employee":
              window.location.href = "/employee/login";
              break;

            case "jobseeker":
              window.location.href = "/jobseeker/login";
              break;

            case "admin":
              window.location.href = "/admin/login";
              break;

            case "superadmin":
              window.location.href = "/superadmin/login";
              break;

            default:
              window.location.href = "/";
          }

          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;