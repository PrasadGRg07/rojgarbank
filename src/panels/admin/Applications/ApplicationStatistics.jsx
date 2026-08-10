import { FileText, Clock, CheckCircle, XCircle, Briefcase } from "lucide-react";

import { applicationData } from "./data/applicationData";

export default function ApplicationStatistics() {
  const total = applicationData.length;

  const pending = applicationData.filter(
    (item) => item.status === "Pending",
  ).length;

  const shortlisted = applicationData.filter(
    (item) => item.status === "Shortlisted",
  ).length;

  const hired = applicationData.filter(
    (item) => item.status === "Hired",
  ).length;

  const rejected = applicationData.filter(
    (item) => item.status === "Rejected",
  ).length;

  const stats = [
    {
      title: "Total Applications",
      value: total,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      color: "bg-amber-500",
    },
    {
      title: "Shortlisted",
      value: shortlisted,
      icon: CheckCircle,
      color: "bg-violet-500",
    },
    {
      title: "Hired",
      value: hired,
      icon: Briefcase,
      color: "bg-emerald-500",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Application Statistics
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Overview of application statuses.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div
                className={`${item.color} flex h-12 w-12 items-center justify-center rounded-xl`}
              >
                <Icon className="text-white" size={24} />
              </div>

              <h2 className="mt-5 text-sm text-slate-500">{item.title}</h2>

              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
