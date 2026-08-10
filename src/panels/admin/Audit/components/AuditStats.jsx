import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { auditStats } from "../data/auditData";

const iconMap = {
  "Total Logs": Activity,
  "Successful Actions": CheckCircle2,
  Warnings: AlertTriangle,
  "Critical Events": ShieldAlert,
};

const colorMap = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    icon: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    icon: "text-amber-600 dark:text-amber-400",
  },
  red: {
    bg: "bg-red-100 dark:bg-red-900/30",
    icon: "text-red-600 dark:text-red-400",
  },
};

export default function AuditStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {auditStats.map((item) => {
        const Icon = iconMap[item.title];
        const colors = colorMap[item.color];
        const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown;

        return (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}
              >
                <Icon className={`h-6 w-6 ${colors.icon}`} />
              </div>

              <div
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                  item.trend === "up"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                <TrendIcon className="h-3.5 w-3.5" />
                {item.change}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.title}
              </p>

              <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {item.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
