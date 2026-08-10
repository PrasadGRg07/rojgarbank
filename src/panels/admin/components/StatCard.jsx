export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`h-14 w-14 rounded-xl ${color} flex items-center justify-center text-white`}
        >
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
}