export default function ChartContainer({
  title,
  subtitle,
  action,
  children,
  height = "h-80",
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-100 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`
          ${height}
          w-full p-6
        `}
      >
        {children}
      </div>
    </div>
  );
}