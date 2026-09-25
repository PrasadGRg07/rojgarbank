import { TrendingDown, TrendingUp } from "lucide-react";

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = "bg-blue-600",
  tint = "bg-blue-50 text-blue-600",
  trend,
}) {
  const isDown = typeof trend === "string" && trend.startsWith("-");
  const TrendIcon = isDown ? TrendingDown : TrendingUp;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div
        className={`absolute inset-x-0 top-0 h-1 ${accent}`}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tabular-nums text-slate-800 sm:text-3xl">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tint}`}
        >
          <Icon size={22} />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {trend && (
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
              isDown
                ? "bg-rose-50 text-rose-700"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            <TrendIcon size={12} />
            {trend.replace("-", "")}
          </span>
        )}

        {subtitle && (
          <p className="truncate text-xs text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
