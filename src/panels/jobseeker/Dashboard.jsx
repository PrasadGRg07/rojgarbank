import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/jobseeker/login");
  }, [logout, navigate]);

  useEffect(() => {
    if (!sidebarOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") closeSidebar();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen, closeSidebar]);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">

      {/* ---- Mobile Overlay ---- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* ---- Sidebar ---- */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out
          lg:relative lg:z-auto lg:translate-x-0 lg:flex lg:flex-shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar user={user} onClose={closeSidebar} />
      </div>

      {/* ---- Main Content ---- */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header
          user={user}
          onLogout={handleLogout}
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}