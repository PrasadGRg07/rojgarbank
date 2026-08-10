import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsCard({
  title,
  description,
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
          <Icon size={24} className="text-white" />
        </div>

        <ChevronRight
          size={20}
          className="text-slate-400 transition group-hover:translate-x-1"
        />
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </button>
  );
}
