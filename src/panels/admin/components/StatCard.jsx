export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white sm:h-14 sm:w-14 ${color}`}
        >
          <Icon size={24} className="sm:hidden" />
          <Icon size={28} className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
