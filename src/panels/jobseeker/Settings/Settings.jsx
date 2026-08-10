import { NavLink, Outlet } from "react-router-dom";
import { User, Bell, Shield, Lock } from "lucide-react";

const SETTINGS_MENU = [
  { title: "Account", path: "account", icon: User },
  { title: "Notifications", path: "notifications", icon: Bell },
  { title: "Privacy", path: "privacy", icon: Shield },
  { title: "Change Password", path: "change-password", icon: Lock },
];

function navLinkClasses({ isActive }) {
  return [
    "flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 font-medium transition",
    isActive
      ? "bg-cyan-600 text-white shadow-md"
      : "text-slate-600 hover:bg-cyan-50 hover:text-cyan-700",
  ].join(" ");
}

export default function Settings() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      {/* Settings Sidebar */}
      <nav
        aria-label="Settings"
        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 lg:col-span-1 lg:h-fit"
      >
        <h2 className="mb-5 text-xl font-bold text-slate-800">Settings</h2>

        <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:space-y-2 lg:overflow-visible lg:pb-0">
          {SETTINGS_MENU.map(({ path, title, icon: Icon }) => (
            <NavLink key={path} to={path} className={navLinkClasses}>
              <Icon size={18} />
              {title}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Settings Content */}
      <div className="lg:col-span-3">
        <Outlet />
      </div>
    </div>
  );
}