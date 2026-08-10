import { Eye } from "lucide-react";

import StatusBadge from "./StatusBadge";

export default function AuditTable({ columns = [], data = [], onViewDetails }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-left">
          {/* Header */}
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                >
                  {column.label}
                </th>
              ))}

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Action
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.length > 0 ? (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  {columns.map((column) => {
                    const value = row[column.key];

                    return (
                      <td
                        key={column.key}
                        className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300"
                      >
                        {column.type === "status" ? (
                          <StatusBadge status={value} />
                        ) : column.type === "avatar" ? (
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                              {value
                                ?.split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>

                            <span>{value}</span>
                          </div>
                        ) : (
                          value || "-"
                        )}
                      </td>
                    );
                  })}

                  <td className="px-6 py-4">
                    <button
                      onClick={() => onViewDetails?.(row)}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
