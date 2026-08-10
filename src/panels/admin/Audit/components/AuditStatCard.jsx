export default function AuditStatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h2>

          <p className="mt-1 text-sm text-emerald-500">{change}</p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${color}`}
        >
          {Icon && <Icon className="h-6 w-6" />}
        </div>
      </div>
    </div>
  );
}
