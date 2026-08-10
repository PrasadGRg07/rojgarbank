import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotificationTable({ columns, data }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((notification) => (
                <tr
                  key={notification.id}
                  className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300"
                    >
                      {column.key === "status" ? (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            notification.status === "Unread"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {notification.status}
                        </span>
                      ) : column.key === "actions" ? (
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/dashboard/notifications/${notification.id}`,
                            )
                          }
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-100"
                        >
                          <Eye size={18} />
                        </button>
                      ) : (
                        notification[column.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-slate-500"
                >
                  No notifications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
