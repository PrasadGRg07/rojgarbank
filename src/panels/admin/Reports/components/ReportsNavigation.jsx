import { NavLink } from "react-router-dom";

const tabs = [
  { title: "Dashboard", path: "/admin/dashboard/reports" },
  { title: "Users", path: "/admin/dashboard/reports/users" },
  { title: "Employers", path: "/admin/dashboard/reports/employers" },
  { title: "Jobs", path: "/admin/dashboard/reports/jobs" },
  { title: "Applications", path: "/admin/dashboard/reports/applications" },
  { title: "Blogs", path: "/admin/dashboard/reports/blogs" },
  { title: "Events", path: "/admin/dashboard/reports/events" },
  { title: "Training", path: "/admin/dashboard/reports/training" },
  { title: "Export", path: "/admin/dashboard/reports/export" },
];

export default function ReportsNavigation() {
  return (
    <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === "/admin/dashboard/reports"}
          className={({ isActive }) =>
            `rounded-lg px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`
          }
        >
          {tab.title}
        </NavLink>
      ))}
    </div>
  );
}
