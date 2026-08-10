import { useState, useEffect } from "react";
import api from "../../../lib/api";
import {
  Clock, CheckCircle, XCircle, ArrowRight, RefreshCw,
  CreditCard, Eye, Send, X,
} from "lucide-react";

const STATUS_BADGE = {
  pending: { label: "Pending", cls: "bg-yellow-100 text-yellow-700" },
  forwarded: { label: "Forwarded", cls: "bg-blue-100 text-blue-700" },
  active: { label: "Active", cls: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected", cls: "bg-red-100 text-red-700" },
};

const PLAN_COLORS = {
  free: "bg-slate-100 text-slate-700",
  basic: "bg-blue-100 text-blue-700",
  professional: "bg-indigo-100 text-indigo-700",
  enterprise: "bg-purple-100 text-purple-700",
};

export default function AdminSubscriptionList() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [action, setAction] = useState(null); // "forward" | "reject"
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [slipModal, setSlipModal] = useState(null);

  const fetchSubs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/subscriptions/");
      setSubs(data);
    } catch {
      setSubs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubs(); }, []);

  const filtered = subs.filter((s) => filter === "all" || s.status === filter);

  const handleForward = async () => {
    setSaving(true);
    try {
      await api.patch(`/admin/subscriptions/${selected.id}/forward/`, { admin_note: note });
      setMsg("Forwarded to Superadmin successfully.");
      fetchSubs();
      setTimeout(() => { setSelected(null); setAction(null); setNote(""); setMsg(""); }, 1500);
    } catch {
      setMsg("Failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    setSaving(true);
    try {
      await api.patch(`/admin/subscriptions/${selected.id}/reject/`, { reason: rejectReason });
      setMsg("Subscription rejected.");
      fetchSubs();
      setTimeout(() => { setSelected(null); setAction(null); setRejectReason(""); setMsg(""); }, 1500);
    } catch {
      setMsg("Failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const counts = {
    all: subs.length,
    pending: subs.filter((s) => s.status === "pending").length,
    forwarded: subs.filter((s) => s.status === "forwarded").length,
    active: subs.filter((s) => s.status === "active").length,
    rejected: subs.filter((s) => s.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscription Requests</h1>
          <p className="text-gray-500 mt-1">Review employee subscriptions and forward to Superadmin.</p>
        </div>
        <button
          onClick={fetchSubs}
          className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm hover:bg-slate-50 transition"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { key: "all", label: "Total", color: "text-gray-600" },
          { key: "pending", label: "Pending", color: "text-yellow-600" },
          { key: "forwarded", label: "Forwarded", color: "text-blue-600" },
          { key: "active", label: "Active", color: "text-green-600" },
          { key: "rejected", label: "Rejected", color: "text-red-600" },
        ].map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`bg-white rounded-xl border p-3 text-center shadow-sm hover:shadow-md transition ${filter === key ? "ring-2 ring-blue-500" : ""}`}
          >
            <p className={`text-2xl font-bold ${color}`}>{counts[key]}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow">
        {loading ? (
          <div className="py-16 text-center text-gray-400">
            <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-3 text-gray-300" />
            <p>Loading subscriptions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <CreditCard className="h-10 w-10 mx-auto mb-3 text-gray-200" />
            <p>No subscriptions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-gray-500 uppercase text-xs tracking-wide border-b">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Employee</th>
                  <th className="px-4 py-3 text-left">Plan</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Slip</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, idx) => {
                  const badge = STATUS_BADGE[s.status] || STATUS_BADGE.pending;
                  return (
                    <tr key={s.id} className="border-t hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{s.employee}</div>
                        <div className="text-xs text-gray-400">{s.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${PLAN_COLORS[s.plan] || "bg-gray-100 text-gray-600"}`}>
                          {s.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {s.amount === "0.00" ? "Free" : `NPR ${parseInt(s.amount).toLocaleString()}`}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{s.created_at}</td>
                      <td className="px-4 py-3">
                        {s.payment_slip ? (
                          <button
                            onClick={() => setSlipModal(s.payment_slip)}
                            className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
                          >
                            <Eye className="h-3.5 w-3.5" /> View
                          </button>
                        ) : (
                          <span className="text-gray-300 text-xs">No slip</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {s.status === "pending" ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => { setSelected(s); setAction("forward"); setMsg(""); setNote(s.admin_note || ""); }}
                              className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-700 transition"
                            >
                              <Send className="h-3.5 w-3.5" /> Forward
                            </button>
                            <button
                              onClick={() => { setSelected(s); setAction("reject"); setMsg(""); setRejectReason(""); }}
                              className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-600 transition"
                            >
                              <XCircle className="h-3.5 w-3.5" /> Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs block text-center">{s.status_display}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slip Preview Modal */}
      {slipModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSlipModal(null)}>
          <div className="relative max-h-[85vh] max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSlipModal(null)} className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-lg z-10">
              <X className="h-4 w-4" />
            </button>
            <img src={slipModal} alt="Payment Slip" className="w-full rounded-2xl shadow-2xl object-contain" />
          </div>
        </div>
      )}

      {/* Forward / Reject Action Modal */}
      {selected && action && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {action === "forward" ? "Forward to Superadmin" : "Reject Subscription"}
              </h2>
              <button onClick={() => { setSelected(null); setAction(null); }} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-1.5">
              <p><span className="text-gray-500">Employee:</span> <strong>{selected.employee}</strong></p>
              <p><span className="text-gray-500">Plan:</span> <strong className="capitalize">{selected.plan}</strong></p>
              <p><span className="text-gray-500">Amount:</span> <strong>NPR {selected.amount}</strong></p>
            </div>

            {action === "forward" && (
              <div>
                <label className="block text-sm font-semibold mb-1.5">Note to Superadmin (optional)</label>
                <textarea
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add any context for the superadmin..."
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}

            {action === "reject" && (
              <div>
                <label className="block text-sm font-semibold mb-1.5">Rejection Reason</label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Why is this being rejected?"
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}

            {msg && (
              <p className={`text-sm font-medium ${msg.includes("Failed") ? "text-red-500" : "text-green-600"}`}>
                {msg}
              </p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => { setSelected(null); setAction(null); }}
                className="flex-1 py-2.5 rounded-xl border text-slate-600 hover:bg-slate-50 text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                onClick={action === "forward" ? handleForward : handleReject}
                className={`flex-1 py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-60 transition ${
                  action === "forward" ? "bg-blue-600 hover:bg-blue-700" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {saving ? "Saving..." : action === "forward" ? "Forward to Superadmin" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
