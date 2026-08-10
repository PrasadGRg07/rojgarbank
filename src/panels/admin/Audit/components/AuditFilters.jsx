import { Search, Filter, RotateCcw } from "lucide-react";

export default function AuditFilters({
  search,
  onSearchChange,

  module,
  onModuleChange,

  status,
  onStatusChange,

  onReset,

  moduleOptions = [],
  statusOptions = ["Success", "Pending", "Warning", "Critical", "Failed"],
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {/* Header */}

      <div className="mb-5 flex items-center gap-2">
        <Filter className="h-5 w-5 text-blue-600" />

        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Filters
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Search */}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Module */}

        <select
          value={module}
          onChange={(e) => onModuleChange(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          <option value="">All Modules</option>

          {moduleOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          <option value="">All Status</option>

          {statusOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Reset */}

        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
