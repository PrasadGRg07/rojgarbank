import { useMemo, useState } from "react";
import { Download, RefreshCcw } from "lucide-react";

import ApplicationTable from "./ApplicationTable";

import { applicationColumns } from "../data/applicationColumns";
import { applicationData } from "../data/applicationData";

export default function ApplicationListView({ title, description, status }) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return applicationData.filter((item) => {
      const matchesStatus = item.status === status;

      const matchesSearch =
        item.applicant.toLowerCase().includes(search.toLowerCase()) ||
        item.job.toLowerCase().includes(search.toLowerCase()) ||
        item.company.toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [search, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
            <Download size={18} />
            Export
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-white hover:bg-slate-700 dark:bg-slate-700">
            <RefreshCcw size={18} />
            Refresh
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <input
          type="text"
          placeholder="Search applications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>

      <ApplicationTable columns={applicationColumns} data={filteredData} />
    </div>
  );
}
