import { NavLink } from "react-router-dom";

const auditMenu = [
  {
    title: "Audit Dashboard",
    path: "/admin/dashboard/audit",
  },
  {
    title: "Activity Logs",
    path: "/admin/dashboard/audit/activity",
  },
  {
    title: "Login History",
    path: "/admin/dashboard/audit/login-history",
  },
  {
    title: "Security Logs",
    path: "/admin/dashboard/audit/security",
  },
  {
    title: "System Logs",
    path: "/admin/dashboard/audit/system",
  },
];

export default function AuditNavigation() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {auditMenu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `rounded-xl border p-4 text-center text-sm font-medium transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-white"
            }`
          }
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
}
