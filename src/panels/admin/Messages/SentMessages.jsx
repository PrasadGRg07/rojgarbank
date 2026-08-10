import { useMemo, useState } from "react";
import { Download, RefreshCcw } from "lucide-react";

import MessageTable from "./components/MessageTable";

import { messageColumns } from "./data/messageColumns";
import { messageData } from "./data/messageData";

export default function SentMessages() {
  const [search, setSearch] = useState("");

  const sentMessages = useMemo(() => {
    return messageData.filter((message) => {
      const isSent = message.folder === "Sent";

      const matchesSearch =
        message.receiver.toLowerCase().includes(search.toLowerCase()) ||
        message.subject.toLowerCase().includes(search.toLowerCase()) ||
        message.message.toLowerCase().includes(search.toLowerCase());

      return isSent && matchesSearch;
    });
  }, [search]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Sent Messages
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View messages sent by administrators.
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
          placeholder="Search sent messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>

      {/* Table */}

      <MessageTable columns={messageColumns} data={sentMessages} />
    </div>
  );
}
