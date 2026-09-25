export default function ListCard({
  title,
  items,
  icon: Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
  primaryKey,
  secondaryKey,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon className={iconColor} size={16} />
        </div>

        <h2 className="text-base font-semibold text-slate-800">
          {title}
        </h2>
      </div>

      <ul>
        {items.map((item, index) => (
          <li
            key={item.id || index}
            className={`flex items-center gap-3 py-3 ${
              index === items.length - 1 ? "" : "border-b border-slate-100"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
            >
              <Icon className={iconColor} size={16} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800">
                {item[primaryKey]}
              </p>

              {secondaryKey && (
                <p className="truncate text-sm text-slate-500">
                  {item[secondaryKey]}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
