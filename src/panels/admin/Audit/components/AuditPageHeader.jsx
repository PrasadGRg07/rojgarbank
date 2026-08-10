import { ArrowUpRight } from "lucide-react";

export default function AuditPageHeader({ title, description, icon: Icon }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
          {Icon && <Icon className="h-6 w-6" />}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>

          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm text-white">
        View Reports
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}
