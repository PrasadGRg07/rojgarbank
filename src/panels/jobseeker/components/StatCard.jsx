export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-100",
  iconColor = "text-blue-600",
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h2>
        </div>

        {Icon && (
          <div className={`rounded-full p-3 ${color}`}>
            <Icon className={iconColor} size={24} />
          </div>
        )}
      </div>
    </div>
  );
}