import { useMemo, useState } from "react";
import { Download, RefreshCcw } from "lucide-react";

import AuditStats from "./components/AuditStats";
import AuditFilters from "./components/AuditFilters";
import AuditTable from "./components/AuditTable";
import LogDetailsModal from "./components/LogDetailsModal";

import { loginColumns } from "./data/auditColumns";

import { loginHistory } from "./data/loginData";

export default function LoginHistory() {
  const [search, setSearch] = useState("");

  const [module, setModule] = useState("");

  const [status, setStatus] = useState("");

  const [selectedLog, setSelectedLog] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const filteredLoginHistory = useMemo(() => {
    return loginHistory.filter((login) => {
      const matchesSearch =
        login.user.toLowerCase().includes(search.toLowerCase()) ||
        login.location.toLowerCase().includes(search.toLowerCase()) ||
        login.ip.includes(search);

      const matchesStatus = status === "" || login.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

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
            Login History
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track user login attempts, devices and security activity.
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

      <AuditTable
        columns={loginColumns}
        data={filteredLoginHistory}
        onViewDetails={handleViewDetails}
      />

      {/* Modal */}

      <LogDetailsModal
        log={selectedLog}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
