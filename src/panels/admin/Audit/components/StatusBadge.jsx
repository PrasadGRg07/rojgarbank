import {
  CheckCircle2,
  Clock3,
  AlertTriangle,
  ShieldAlert,
  XCircle,
} from "lucide-react";

const STATUS_CONFIG = {
  Success: {
    icon: CheckCircle2,
    className:
      "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  },

  Pending: {
    icon: Clock3,
    className:
      "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  },

  Warning: {
    icon: AlertTriangle,
    className:
      "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  },

  Critical: {
    icon: ShieldAlert,
    className:
      "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
  },

  Failed: {
    icon: XCircle,
    className:
      "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status];

  if (!config) {
    return (
      <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
        {status}
      </span>
    );
  }

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />

      {status}
    </span>
  );
}
