export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-100",
  iconColor = "text-blue-600",
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xs text-gray-500 sm:text-sm">{title}</p>

          <h2 className="mt-1 text-2xl font-bold text-gray-800 sm:mt-2 sm:text-3xl">
            {value}
          </h2>
        </div>

        {Icon && (
          <div className={`flex-shrink-0 rounded-full p-2.5 sm:p-3 ${color}`}>
            <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColor}`} />
          </div>
        )}
      </div>
    </div>
  );
}