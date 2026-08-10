import { CheckCircle2, AlertTriangle, ShieldAlert, Clock3 } from "lucide-react";

import { recentTimeline } from "../data/auditData";

const statusConfig = {
  success: {
    icon: CheckCircle2,
    dot: "bg-emerald-500",
    text: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  warning: {
    icon: AlertTriangle,
    dot: "bg-amber-500",
    text: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  critical: {
    icon: ShieldAlert,
    dot: "bg-red-500",
    text: "text-red-600",
    bg: "bg-red-50 dark:bg-red-950/30",
  },
  info: {
    icon: Clock3,
    dot: "bg-sky-500",
    text: "text-sky-600",
    bg: "bg-sky-50 dark:bg-sky-950/30",
  },
};

export default function AuditTimeline() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Latest audit events across the platform
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-0 h-full w-px bg-slate-200 dark:bg-slate-700" />

        <div className="space-y-6">
          {recentTimeline.map((item) => {
            const config = statusConfig[item.status];
            const Icon = config.icon;

            return (
              <div key={item.id} className="relative flex gap-4">
                {/* Dot */}
                <div
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${config.bg}`}
                >
                  <Icon className={`h-4 w-4 ${config.text}`} />
                </div>

                {/* Content */}
                <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40 transition hover:shadow-sm">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">
                        {item.action}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-medium">{item.user}</span> •{" "}
                        {item.module}
                      </p>
                    </div>

                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
