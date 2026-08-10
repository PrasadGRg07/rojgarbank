import { TrendingUp, TrendingDown } from "lucide-react";

export default function KPIStatCard({
  title,
  value,
  icon: Icon,
  change,
  trend = "up",
  color = "bg-blue-500",
}) {
  const isPositive = trend === "up";

  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            text-white
            ${color}
          `}
        >
          {Icon && <Icon size={28} />}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        {isPositive ? (
          <TrendingUp
            size={18}
            className="text-green-600"
          />
        ) : (
          <TrendingDown
            size={18}
            className="text-red-600"
          />
        )}

        <span
          className={`text-sm font-semibold ${
            isPositive
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {change}
        </span>

        <span className="text-sm text-gray-500">
          vs last month
        </span>
      </div>
    </div>
  );
}