export default function DataTable({
  columns = [],
  data = [],
  actions,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
              >
                {column.label}
              </th>
            ))}

            {actions && (
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-6 py-10 text-center text-gray-500"
              >
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row.id || index}
                className="border-t hover:bg-slate-50 transition"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-sm text-gray-700"
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.key]}
                  </td>
                ))}

                {actions && (
                  <td className="px-6 py-4 text-center">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}