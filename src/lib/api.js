import axios from "axios";

  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",

// ================= REQUEST =================

api.interceptors.request.use(
    const token = localStorage.getItem("access");


    return config;
  (error) => Promise.reject(error)
);

// ================= RESPONSE =================

api.interceptors.response.use(
  (response) => response,

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

            refresh,

          localStorage.setItem("access", res.data.access);


          return api(originalRequest);
          let user = null;

            user = JSON.parse(localStorage.getItem("user"));
            user = null;

          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("user");

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

          return Promise.reject(refreshError);

    return Promise.reject(error);
);

export default api;