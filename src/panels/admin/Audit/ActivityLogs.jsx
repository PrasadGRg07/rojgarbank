import { useMemo, useState } from "react";
import { RefreshCcw, Download } from "lucide-react";

import AuditStats from "./components/AuditStats";
import AuditChart from "./components/AuditChart";
import AuditTimeline from "./components/AuditTimeline";
import AuditFilters from "./components/AuditFilters";
import AuditTable from "./components/AuditTable";
import LogDetailsModal from "./components/LogDetailsModal";

import { activityLogs } from "./data/auditData";

export default function ActivityLogs() {
  const [search, setSearch] = useState("");
  const [module, setModule] = useState("");
  const [status, setStatus] = useState("");

  const [selectedLog, setSelectedLog] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const filteredLogs = useMemo(() => {
    return activityLogs.filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase());

      const matchesModule = module === "" || log.module === module;

      const matchesStatus = status === "" || log.status === status;

      return matchesSearch && matchesModule && matchesStatus;
    });
  }, [search, module, status]);

  const resetFilters = () => {
    setSearch("");
    setModule("");
    setStatus("");
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setOpenModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Activity Logs
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Monitor all system activities and user actions.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            <Download className="h-4 w-4" />
            Export
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600">
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <AuditStats />

      {/* Chart + Timeline */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AuditChart />
        </div>

        <AuditTimeline />
      </div>

      {/* Filters */}
      <AuditFilters
        search={search}
        onSearchChange={setSearch}
        module={module}
        onModuleChange={setModule}
        status={status}
        onStatusChange={setStatus}
        onReset={resetFilters}
      />

      {/* Table */}
      <AuditTable logs={filteredLogs} onViewDetails={handleViewDetails} />

      {/* Modal */}
      <LogDetailsModal
        log={selectedLog}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
