import {
  Users,
  Building2,
  Briefcase,
  FileText,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Download,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const reports = [
  {
    title: "User Reports",
    icon: Users,
    path: "/admin/dashboard/reports/users",
    color: "bg-blue-500",
  },
  {
    title: "Employer Reports",
    icon: Building2,
    path: "/admin/dashboard/reports/employers",
    color: "bg-violet-500",
  },
  {
    title: "Job Reports",
    icon: Briefcase,
    path: "/admin/dashboard/reports/jobs",
    color: "bg-emerald-500",
  },
  {
    title: "Application Reports",
    icon: FileText,
    path: "/admin/dashboard/reports/applications",
    color: "bg-orange-500",
  },
  {
    title: "Blog Reports",
    icon: BookOpen,
    path: "/admin/dashboard/reports/blogs",
    color: "bg-pink-500",
  },
  {
    title: "Event Reports",
    icon: CalendarDays,
    path: "/admin/dashboard/reports/events",
    color: "bg-cyan-500",
  },
  {
    title: "Training Reports",
    icon: GraduationCap,
    path: "/admin/dashboard/reports/training",
    color: "bg-indigo-500",
  },
  {
    title: "Export Reports",
    icon: Download,
    path: "/admin/dashboard/reports/export",
    color: "bg-slate-700",
  },
];

export default function ReportList() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Report Center
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Select a report to view analytics or export data.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <NavLink
              key={report.title}
              to={report.path}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${report.color}`}
              >
                <Icon className="h-7 w-7 text-white" />
              </div>

              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {report.title}
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                View detailed report
              </p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
