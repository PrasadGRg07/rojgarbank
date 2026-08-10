import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotificationCard({
  title,
  description,
  value,
  icon: Icon,
  color,
  path,
}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="group w-full rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex items-start justify-between">
        <div className={`${color} rounded-xl p-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1" />
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>

        <p className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </button>
  );
}
