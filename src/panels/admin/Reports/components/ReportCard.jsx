import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReportCard({
  title,
  description,
  icon: Icon,
  color,
  path,
}) {
  const navigate = useNavigate();

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
      >
        <Icon className="h-7 w-7 text-white" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>

      <button
        onClick={() => navigate(path)}
        className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3"
      >
        View Report
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
