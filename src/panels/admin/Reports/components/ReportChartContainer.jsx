export default function ReportChartContainer({
  title,
  subtitle,
  children,
  height = "h-96",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className={height}>{children}</div>
    </div>
  );
}
