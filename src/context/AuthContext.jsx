import { createContext, useContext, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext();

const getCompanyLabel = (value) => {
  if (!value || typeof value !== "object") return null;

  return (
    value.company_name ||
    value.companyName ||
    value.company ||
    value.companyname ||
    value.organization_name ||
    value.organization ||
    value.company_detail?.name ||
    value.company?.name ||
    value.profile?.company_name ||
    value.profile?.companyName ||
    value.profile?.company ||
    value.profile?.organization_name ||
    value.profile?.organization ||
    value.employer?.company_name ||
    value.employer?.company ||
    value.employer?.name
  );
};

const normalizeUser = (value) => {
  if (!value || typeof value !== "object") return value;

  const companyName = getCompanyLabel(value);

  return {
    ...value,
    company_name: companyName || value.company_name || null,
    companyName: companyName || value.companyName || null,
    company: companyName || value.company || null,
  };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
  try {
    const saved = localStorage.getItem("user");

    if (!saved || saved === "undefined") {
      return null;
    }

    return normalizeUser(JSON.parse(saved));
  } catch (error) {
    console.error("Invalid user in localStorage:", error);
    localStorage.removeItem("user");
    return null;
  }
});

  // ================= EMPLOYEE LOGIN =================

  const login = async (username, password) => {
    const candidates = [];
    const trimmed = (username || "").trim();

    if (trimmed) {
      candidates.push(trimmed);

      if (trimmed.includes("@")) {
        candidates.push(trimmed.split("@")[0]);
      } else {
        candidates.push(`${trimmed}@example.com`);
      }
    }

    let lastError = null;

    for (const candidate of candidates) {
      try {
        const res = await api.post("/auth/login/", {
          username: candidate,
          password,
        });

        const access =
          res.data?.access ||
          res.data?.access_token ||
          res.data?.token?.access;

        const refresh =
          res.data?.refresh ||
          res.data?.refresh_token ||
          res.data?.token?.refresh;

        const userData = normalizeUser(
          res.data?.user ||
            res.data?.employee ||
            res.data?.data?.user ||
            res.data?.data?.employee ||
            res.data?.data ||
            res.data
        );

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);

        return userData;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("Employee login failed");
  };

  // ================= ADMIN LOGIN =================

  const adminLogin = async (username, password) => {
    const res = await api.post("/admin/login/", {
      username,
      password,
    });

    const access = res.data.access;
    const refresh = res.data.refresh;

    const userData = normalizeUser(res.data.user);

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);

    return userData;
  };

   // =================Super ADMIN LOGIN =================
  const superAdminLogin = async (username, password) => {
    const res = await api.post("/superadmin/login/", {
      username,
      password,
    });

    const access = res.data.access;
    const refresh = res.data.refresh;

    const userData = normalizeUser(res.data.user);

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);

    return userData;
  };
  // ================= JOBSEEKER LOGIN =================

const jobseekerLogin = async (email, password) => {
  try {
    const res = await api.post("/auth/login/", {
      email,
      password,
    });

    const access = res.data.access;
    const refresh = res.data.refresh;

    const userData = normalizeUser(
      res.data.user
    );

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

    return userData;

  } catch (error) {
    throw error;
  }
};

  // ================= LOGOUT =================

const logout = () => {
  console.log("Logout clicked");

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");

  setUser(null);
};

  // Merge a patch into user state AND localStorage (call after account/profile edits)
  const updateUser = (patch) => {
    setUser((prev) => {
      const updated = normalizeUser({ ...prev, ...patch });
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        adminLogin,
        superAdminLogin,
        jobseekerLogin,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
  
}

export const useAuth = () => useContext(AuthContext);