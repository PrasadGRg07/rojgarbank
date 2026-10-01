import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  Trash2,
  RefreshCcw,
  Search,
  Mail,
  Phone,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import {
  getContactMessages,
  updateContactMessage,
  deleteContactMessage,
} from "../../../lib/contactApi";

const STATUS_OPTIONS = ["all", "new", "read", "replied", "archived"];

const statusStyles = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-gray-100 text-gray-700",
  replied: "bg-green-100 text-green-700",
  archived: "bg-slate-100 text-slate-700",
};

function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [active, setActive] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (err) {
      console.error("Failed to load contact messages:", err);
      setError("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getContactMessages();
        setMessages(data);
      } catch (err) {
        console.error("Failed to load contact messages:", err);
        setError("Failed to load messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();

    return messages.filter((message) => {
      const matchesStatus =
        statusFilter === "all" || message.status === statusFilter;

      const matchesSearch =
        !term ||
        message.full_name.toLowerCase().includes(term) ||
        message.email.toLowerCase().includes(term) ||
        (message.phone_number || "").toLowerCase().includes(term) ||
        (message.subject || "").toLowerCase().includes(term) ||
        message.message.toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [messages, search, statusFilter]);

  const unreadCount = messages.filter((m) => m.status === "new").length;

  const changeStatus = async (id, status) => {
    try {
      const updated = await updateContactMessage(id, { status });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
      );
      setActive((prev) => (prev && prev.id === id ? { ...prev, ...updated } : prev));
    } catch (err) {
      console.error("Failed to update message status:", err);
      setError("Failed to update the message. Please try again.");
    }
  };

  const openMessage = async (message) => {
    setActive(message);

    if (message.status === "new") {
      await changeStatus(message.id, "read");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message? This cannot be undone.")) {
      return;
    }

    try {
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setActive((prev) => (prev && prev.id === id ? null : prev));
    } catch (err) {
      console.error("Failed to delete message:", err);
      setError("Failed to delete the message. Please try again.");
    }
  };

  const columns = [
    {
      key: "full_name",
      label: "Full Name",
    },
    {
      key: "email",
      label: "Email",
      hideOnMobile: true,
    },
    {
      key: "phone_number",
      label: "Phone",
      render: (item) => item.phone_number || "—",
      hideOnMobile: true,
    },
    {
      key: "message",
      label: "Message",
      render: (item) => (
        <span className="line-clamp-2 max-w-md">
          {item.subject ? `${item.subject} — ` : ""}
          {item.message}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item) => <StatusPill status={item.status} />,
    },
    {
      key: "created_at",
      label: "Received",
      render: (item) => new Date(item.created_at).toLocaleString(),
      hideOnMobile: true,
    },
  ];

  if (loading) {
    return <div className="p-6 text-center">Loading messages...</div>;
  }

  if (error && messages.length === 0) {
    return (
      <div className="space-y-4 p-6">
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>

        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm hover:bg-slate-100"
        >
          <RefreshCcw size={16} />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Messages"
        subtitle={
          unreadCount > 0
            ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""} from the Talk to Us page`
            : "Messages submitted through the public contact form"
        }
      />

      {/* Filters */}

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone or message..."
            className="w-full rounded-xl border border-slate-300 py-3 pr-4 pl-10 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All statuses" : option}
              </option>
            ))}
          </select>

          <button
            onClick={fetchMessages}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm hover:bg-slate-100"
          >
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* Table */}

      <DataTable
        columns={columns}
        data={filtered}
        emptyMessage="No contact messages found."
        actions={(row) => (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => openMessage(row)}
              title="View message"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            >
              <Eye size={16} />
            </button>

            <button
              onClick={() => handleDelete(row.id)}
              title="Delete message"
              className="rounded-lg p-2 text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      />

      {/* Detail */}

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setActive(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {active.subject || "Message"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {new Date(active.created_at).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setActive(null)}
                className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <dl className="mb-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Mail size={16} className="text-slate-400" />
                <dt className="sr-only">Email</dt>
                <dd>
                  <a
                    href={`mailto:${active.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {active.email}
                  </a>
                </dd>
              </div>

              {active.phone_number && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone size={16} className="text-slate-400" />
                  <dt className="sr-only">Phone</dt>
                  <dd>{active.phone_number}</dd>
                </div>
              )}
            </dl>

            <div className="mb-6 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
              {active.message}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">
                  Status:
                </span>

                <select
                  value={active.status}
                  onChange={(e) => changeStatus(active.id, e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                >
                  {STATUS_OPTIONS.filter((s) => s !== "all").map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${active.email}?subject=${encodeURIComponent(
                    `Re: ${active.subject || "Your message"}`
                  )}`}
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Reply by email
                </a>

                <button
                  onClick={() => handleDelete(active.id)}
                  className="rounded-xl border border-red-200 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
