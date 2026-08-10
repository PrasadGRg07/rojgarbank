export default function AuditChartContainer({
  title,
  subtitle,
  children,
  height = "h-80",
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>

        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className={`${height} w-full`}>{children}</div>
    </div>
  );
}
