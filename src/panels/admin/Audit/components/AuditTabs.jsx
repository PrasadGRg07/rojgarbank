import { NavLink } from "react-router-dom";

const tabs = [
  { title: "Dashboard", path: "/admin/dashboard/audit" },
  { title: "Activity Logs", path: "/admin/dashboard/audit/activity" },
  { title: "Login History", path: "/admin/dashboard/audit/login-history" },
  { title: "Security Logs", path: "/admin/dashboard/audit/security" },
  { title: "System Logs", path: "/admin/dashboard/audit/system" },
];

export default function AuditTabs() {
  return (
    <div className="flex flex-wrap gap-3 rounded-xl border bg-white p-3 dark:bg-gray-900">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === "/admin/dashboard/audit"}
          className={({ isActive }) =>
            `rounded-lg px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`
          }
        >
          {tab.title}
        </NavLink>
      ))}
    </div>
  );
}
