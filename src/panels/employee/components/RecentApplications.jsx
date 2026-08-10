import React from "react";

function RecentApplications({ applications = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Recent Applications
        </h2>

        <button
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Candidate
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Position
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Applied On
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-slate-500"
                >
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((application) => (
                <tr
                  key={application.id}
                  className="border-b last:border-0 hover:bg-slate-50"
                >
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {application.name}
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    {application.position}
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    {application.date}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        application.status?.toLowerCase() === "shortlisted"
                          ? "bg-green-100 text-green-700"
                          : application.status?.toLowerCase() === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default React.memo(RecentApplications);