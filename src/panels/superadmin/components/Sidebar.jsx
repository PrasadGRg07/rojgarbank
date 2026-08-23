import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { X } from "lucide-react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BackupIcon from "@mui/icons-material/Backup";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import StarIcon from "@mui/icons-material/Star";

const menuItems = [
  {
    title: "Dashboard",
    path: "/superadmin/dashboard",
    icon: <DashboardIcon />,
    end: true,
  },
  {
    title: "Manage Admins",
    path: "/superadmin/dashboard/admins",
    icon: <AdminPanelSettingsIcon />,
  },
  {
    title: "Subscriptions",
    path: "/superadmin/dashboard/subscriptions",
    icon: <SubscriptionsIcon />,
  },
  {
    title: "Roles & Permissions",
    path: "/superadmin/dashboard/roles",
    icon: <SecurityIcon />,
  },
  {
    title: "Special Accounts",
    path: "/superadmin/dashboard/special-accounts",
    icon: <StarIcon />,
  },
  {
    title: "System Settings",
    path: "/superadmin/dashboard/settings",
    icon: <SettingsIcon />,
  },
  {
    title: "Analytics",
    path: "/superadmin/dashboard/analytics",
    icon: <AnalyticsIcon />,
  },
  {
    title: "Backup Database",
    path: "/superadmin/dashboard/backup",
    icon: <BackupIcon />,
  },
  {
    title: "Audit Logs",
    path: "/superadmin/dashboard/audit-logs",
    icon: <HistoryIcon />,
  },
  {
    title: "Profile",
    path: "/superadmin/dashboard/profile",
    icon: <PersonIcon />,
  },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/superadmin/login");
  };

  return (
    <>
      {/* Mobile overlay — tap outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-40
          h-screen w-72
          bg-slate-900 text-white flex flex-col shadow-xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo / Header */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Super Admin</h1>
            <p className="text-sm text-gray-400 mt-1">Rojgar Bank</p>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 mx-3 my-1 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800 text-gray-300"
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 bg-red-600 hover:bg-red-700 transition rounded-lg px-4 py-3"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;