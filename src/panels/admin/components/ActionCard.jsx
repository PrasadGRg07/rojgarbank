import { ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ActionCard({
  title,
  description,
  icon: Icon,
  tint = "bg-blue-50 text-blue-600",
  path,
}) {
  return (
    <NavLink
      to={path}
      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tint}`}
      >
        <Icon size={22} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-slate-800 transition group-hover:text-blue-600">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <ArrowUpRight
        size={18}
        className="shrink-0 text-slate-300 transition group-hover:text-blue-600"
      />
    </NavLink>
  );
}
