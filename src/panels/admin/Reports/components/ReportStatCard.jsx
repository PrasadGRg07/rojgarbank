export default function ReportStatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h2>

          <span className="mt-2 inline-block text-sm font-medium text-emerald-600">
            {change}
          </span>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
    </div>
  );
}
