import {
  X,
  User,
  Globe,
  Monitor,
  Clock,
  FileText,
  ShieldCheck,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

export default function LogDetailsModal({ log, open, onClose }) {
  if (!open || !log) return null;

  const details = [
    {
      label: "User",
      value: log.user,
      icon: User,
    },
    {
      label: "Module",
      value: log.module,
      icon: FileText,
    },
    {
      label: "IP Address",
      value: log.ip,
      icon: Globe,
    },
    {
      label: "Device",
      value: log.device,
      icon: Monitor,
    },
    {
      label: "Timestamp",
      value: log.time,
      icon: Clock,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Audit Log Details
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Complete information about this activity
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action */}
        <div className="mb-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">Action</p>

          <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">
            {log.action}
          </h3>
        </div>

        {/* Details */}
        <div className="space-y-4">
          {details.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>

                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>

                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Status */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
                Status
              </p>

              <StatusBadge status={log.status} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
