export default function DataTable({
  columns = [],
  data = [],
  actions,
  emptyMessage = "No data available.",
}) {
  const visibleOnMobile = columns.filter(
    (column) => !column.hideOnMobile
  );

  const getCell = (column, row) =>
    column.render ? column.render(row) : row[column.key];

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center text-sm text-gray-500 shadow-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      {/* Tablet and up: real table, horizontally scrollable when crowded */}
      <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-700 lg:px-6 lg:py-4"
                >
                  {column.label}
                </th>
              ))}

              {actions && (
                <th className="whitespace-nowrap px-4 py-3 text-center text-sm font-semibold text-gray-700 lg:px-6 lg:py-4">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id || index}
                className="border-t transition hover:bg-slate-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-3 text-sm text-gray-700 lg:px-6 lg:py-4"
                  >
                    {getCell(column, row)}
                  </td>
                ))}

                {actions && (
                  <td className="px-4 py-3 text-center lg:px-6 lg:py-4">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: one card per row so nothing is cut off or side-scrolled */}
      <ul className="space-y-3 md:hidden">
        {data.map((row, index) => {
          const [primary, ...secondary] = visibleOnMobile;

          return (
            <li
              key={row.id || index}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              {primary && (
                <div className="text-sm font-semibold break-words text-gray-800">
                  {getCell(primary, row)}
                </div>
              )}

              {secondary.length > 0 && (
                <dl className="mt-3 space-y-2">
                  {secondary.map((column) => (
                    <div
                      key={column.key}
                      className="flex items-start justify-between gap-3"
                    >
                      <dt className="shrink-0 text-xs font-medium tracking-wide text-gray-400 uppercase">
                        {column.label}
                      </dt>

                      <dd className="min-w-0 text-right text-sm break-words text-gray-700">
                        {getCell(column, row)}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {actions && (
                <div className="mt-4 flex items-center justify-center gap-3 border-t border-gray-100 pt-3 [&_a]:flex [&_button]:flex [&_a]:h-10 [&_button]:h-10 [&_a]:w-10 [&_button]:w-10 [&_a]:items-center [&_button]:items-center [&_a]:justify-center [&_button]:justify-center [&_a]:rounded-lg [&_button]:rounded-lg [&_a]:transition-colors [&_button]:transition-colors [&_a:hover]:bg-slate-100 [&_button:hover]:bg-slate-100">
                  {actions(row)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
