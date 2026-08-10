export default function ListCard({
  title,
  items,
  icon: Icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
  primaryKey,
  secondaryKey,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-5">
        {title}
      </h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="flex items-center gap-3 border-b last:border-0 pb-3"
          >
            <div className={`${iconBg} p-2 rounded-lg`}>
              <Icon className={iconColor} size={18} />
            </div>

            <div>
              <p className="font-medium">
                {item[primaryKey]}
              </p>

              {secondaryKey && (
                <p className="text-sm text-gray-500">
                  {item[secondaryKey]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}