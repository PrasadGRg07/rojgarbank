import { useMemo, useState } from "react";
import { Download, RefreshCcw } from "lucide-react";

import NotificationTable from "./components/NotificationTable";

import { notificationColumns } from "./data/notificationColumns";
import { notificationData } from "./data/notificationData";

export default function JobNotifications() {
  const [search, setSearch] = useState("");

  const jobNotifications = useMemo(() => {
    return notificationData.filter((item) => {
      const isJob = item.type === "Job";

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase()) ||
        item.user.toLowerCase().includes(search.toLowerCase());

      return isJob && matchesSearch;
    });
  }, [search]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Job Notifications
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Monitor job postings and application related updates.
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

      {/* Search */}

      <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <input
          type="text"
          placeholder="Search job notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>

      {/* Table */}

      <NotificationTable
        columns={notificationColumns}
        data={jobNotifications}
      />
    </div>
  );
}
