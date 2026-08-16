import { useEffect, useMemo, useState } from "react";
import { Download, RefreshCcw } from "lucide-react";

import NotificationTable from "./components/NotificationTable";

import { notificationColumns } from "./data/notificationColumns";
import { fetchNotifications } from "../../../lib/notificationApi";

export default function SystemNotifications() {
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await fetchNotifications();
      const mapped = data.map((n) => {
        const dateObj = new Date(n.created_at);
        return {
          id: n.id,
          title: n.title,
          message: n.message,
          type: n.notification_type,
          user: "System",
          status: n.is_read ? "Read" : "Unread",
          date: dateObj.toISOString().split("T")[0],
          time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      });
      setNotifications(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const systemNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const isSystem = item.type.toLowerCase() === "system";

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase());

      return isSystem && matchesSearch;
    });
  }, [search, notifications]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            System Notifications
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Monitor security alerts and system events.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
            <Download size={18} />
            Export
          </button>

          <button onClick={loadNotifications} className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-white hover:bg-slate-700 dark:bg-slate-700">
            <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Search */}

      <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <input
          type="text"
          placeholder="Search system notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>

      {/* Table */}

      <NotificationTable
        columns={notificationColumns}
        data={systemNotifications}
      />
    </div>
  );
}
