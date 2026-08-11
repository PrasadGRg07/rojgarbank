import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();

  // ================= USER NOT LOGGED IN =================

  if (!user) {
    if (location.pathname.startsWith("/superadmin")) {
      return <Navigate to="/superadmin/login" replace />;
    }

    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/login" replace />;
    }

    if (location.pathname.startsWith("/employee")) {
      return <Navigate to="/employee/login" replace />;
    }

    if (location.pathname.startsWith("/jobseeker")) {
      return <Navigate to="/jobseeker/login" replace />;
    }

    return <Navigate to="/" replace />;
  }

  // ================= ROLE NOT ALLOWED =================

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "superadmin":
        return <Navigate to="/superadmin/dashboard" replace />;

      case "admin":
        return <Navigate to="/admin/dashboard" replace />;

      case "employee":
        return <Navigate to="/employee/dashboard" replace />;

      case "jobseeker":
        return <Navigate to="/jobseeker/dashboard" replace />;

      default:
        return <Navigate to="/" replace />;
    }
  }

  // ================= AUTHORIZED =================

  return children;
}
