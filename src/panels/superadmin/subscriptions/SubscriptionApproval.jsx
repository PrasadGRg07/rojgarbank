import { useState, useEffect } from "react";
import api from "../../../lib/api";
import {
  CheckCircle, XCircle, Clock, ArrowRight, RefreshCw,
  Eye, X, Shield, CreditCard, Edit2, Save,
} from "lucide-react";

const STATUS_BADGE = {
  pending: { label: "Pending", cls: "bg-yellow-100 text-yellow-700" },
  forwarded: { label: "Awaiting Approval", cls: "bg-blue-100 text-blue-700" },
  active: { label: "Active", cls: "bg-green-100 text-green-700" },
  expired: { label: "Expired", cls: "bg-gray-100 text-gray-500" },
  rejected: { label: "Rejected", cls: "bg-red-100 text-red-700" },
};

const PLAN_COLORS = {
  free: "bg-slate-100 text-slate-700",
  basic: "bg-blue-100 text-blue-700",
  professional: "bg-indigo-100 text-indigo-700",
  enterprise: "bg-purple-100 text-purple-700",
};

const ALL_STATUSES = ["pending", "forwarded", "active", "expired", "rejected"];

export default function SubscriptionApproval() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState(null); // "activate" | "reject"
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [slipModal, setSlipModal] = useState(null);

  // Inline edit state
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editExpiry, setEditExpiry] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [editMsg, setEditMsg] = useState("");

  const fetchSubs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/superadmin/subscriptions/");
      setSubs(data);
    } catch {
      setSubs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubs(); }, []);

  const filtered = subs.filter((s) => filter === "all" || s.status === filter);

  // Start inline edit
  const startEdit = (s) => {
    setEditingId(s.id);
    setEditStatus(s.status);
    setEditExpiry(s.expires_at || "");
    setEditMsg("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditStatus("");
    setEditExpiry("");
    setEditMsg("");
  };

  const saveEdit = async (id) => {
    setEditSaving(true);
    try {
      const payload = { status: editStatus };
      if (editExpiry) payload.expires_at = editExpiry;
      await api.patch(`/superadmin/subscriptions/${id}/update/`, payload);
      setEditMsg("Saved!");
      fetchSubs();
      setTimeout(() => { cancelEdit(); }, 900);
    } catch {
      setEditMsg("Failed to save.");
    } finally {
      setEditSaving(false);
    }
  };

  const handleActivate = async () => {
    setSaving(true);
    try {
      await api.patch(`/superadmin/subscriptions/${selected.id}/activate/`);
      setMsg("Plan activated successfully!");
      fetchSubs();
      setTimeout(() => { setSelected(null); setAction(null); setMsg(""); }, 1500);
    } catch {
      setMsg("Failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    setSaving(true);
    try {
      await api.patch(`/superadmin/subscriptions/${selected.id}/reject/`, { reason });
      setMsg("Subscription rejected.");
      fetchSubs();
      setTimeout(() => { setSelected(null); setAction(null); setReason(""); setMsg(""); }, 1500);
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
    expired: subs.filter((s) => s.status === "expired").length,
    rejected: subs.filter((s) => s.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-purple-600" /> Subscription Approvals
          </h1>
          <p className="text-gray-500 mt-1">Activate, reject, or modify employee subscription plans.</p>
        </div>
        <button
          onClick={fetchSubs}
          className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm hover:bg-slate-50 transition"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {[
          { key: "all", label: "Total", color: "text-gray-600" },
          { key: "pending", label: "Pending", color: "text-yellow-600" },
          { key: "forwarded", label: "Awaiting", color: "text-blue-600" },
          { key: "active", label: "Active", color: "text-green-600" },
          { key: "expired", label: "Expired", color: "text-gray-500" },
          { key: "rejected", label: "Rejected", color: "text-red-600" },
        ].map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`bg-white rounded-xl border p-3 text-center shadow-sm hover:shadow-md transition ${filter === key ? "ring-2 ring-purple-500" : ""}`}
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
            <p>Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <CreditCard className="h-10 w-10 mx-auto mb-3 text-gray-200" />
            <p>No subscriptions in this category.</p>
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
                  <th className="px-4 py-3 text-left">Admin Note</th>
                  <th className="px-4 py-3 text-left">Submitted</th>
                  <th className="px-4 py-3 text-left">Slip</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Expires</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, idx) => {
                  const badge = STATUS_BADGE[s.status] || STATUS_BADGE.forwarded;
                  const isEditing = editingId === s.id;
                  return (
                    <tr key={s.id} className={`border-t transition-colors ${isEditing ? "bg-purple-50" : "hover:bg-slate-50"}`}>
                      <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{s.employee}</div>
                        <div className="text-xs text-gray-400">{s.email}</div>
                        {s.reviewed_by && (
                          <div className="text-xs text-blue-500 mt-0.5">via: {s.reviewed_by}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${PLAN_COLORS[s.plan] || "bg-gray-100"}`}>
                          {s.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {s.amount === "0.00" ? "Free" : `NPR ${parseInt(s.amount).toLocaleString()}`}
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-[150px]">
                        <p className="text-xs line-clamp-2">{s.admin_note || <span className="text-gray-300 italic">—</span>}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{s.created_at}</td>
                      <td className="px-4 py-3">
                        {s.payment_slip ? (
                          <button onClick={() => setSlipModal(s.payment_slip)} className="flex items-center gap-1 text-blue-600 hover:underline text-xs">
                            <Eye className="h-3.5 w-3.5" /> View
                          </button>
                        ) : (
                          <span className="text-gray-300 text-xs">None</span>
                        )}
                      </td>

                      {/* Status — inline editable */}
                      <td className="px-4 py-3 text-center">
                        {isEditing ? (
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="border rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-purple-400"
                          >
                            {ALL_STATUSES.map((st) => (
                              <option key={st} value={st}>{STATUS_BADGE[st]?.label || st}</option>
                            ))}
                          </select>
                        ) : (
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badge.cls}`}>
                            {badge.label}
                          </span>
                        )}
                      </td>

                      {/* Expires — inline editable */}
                      <td className="px-4 py-3 text-center">
                        {isEditing ? (
                          <input
                            type="date"
                            value={editExpiry}
                            onChange={(e) => setEditExpiry(e.target.value)}
                            className="border rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-purple-400"
                          />
                        ) : (
                          <div className="text-xs">
                            {s.expires_at ? (
                              <>
                                <p className="font-medium text-gray-700">{s.expires_at}</p>
                                {s.days_remaining !== null && s.status === "active" && (
                                  <p className={`mt-0.5 font-semibold ${s.days_remaining <= 7 ? "text-orange-500" : "text-green-600"}`}>
                                    {s.days_remaining}d left
                                  </p>
                                )}
                              </>
                            ) : (
                              <span className="text-gray-400 italic">
                                {s.status === "active" ? "Never" : "—"}
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="flex flex-col gap-1.5 items-center">
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => saveEdit(s.id)}
                                disabled={editSaving}
                                className="flex items-center gap-1 bg-purple-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-purple-700 disabled:opacity-60 transition"
                              >
                                <Save className="h-3 w-3" /> {editSaving ? "..." : "Save"}
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="flex items-center gap-1 border border-slate-300 px-2.5 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition"
                              >
                                <X className="h-3 w-3" /> Cancel
                              </button>
                            </div>
                            {editMsg && (
                              <p className={`text-xs font-medium ${editMsg === "Saved!" ? "text-green-600" : "text-red-500"}`}>{editMsg}</p>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1.5 items-center">
                            {s.status === "forwarded" && (
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => { setSelected(s); setAction("activate"); setMsg(""); }}
                                  className="flex items-center gap-1 bg-green-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-700 transition"
                                >
                                  <CheckCircle className="h-3.5 w-3.5" /> Activate
                                </button>
                                <button
                                  onClick={() => { setSelected(s); setAction("reject"); setMsg(""); setReason(""); }}
                                  className="flex items-center gap-1 bg-red-500 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-600 transition"
                                >
                                  <XCircle className="h-3.5 w-3.5" /> Reject
                                </button>
                              </div>
                            )}
                            <button
                              onClick={() => startEdit(s)}
                              className="flex items-center gap-1 border border-purple-300 text-purple-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-purple-50 transition"
                            >
                              <Edit2 className="h-3 w-3" /> Edit
                            </button>
                          </div>
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

      {/* Slip Modal */}
      {slipModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSlipModal(null)}>
          <div className="relative max-h-[85vh] max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSlipModal(null)} className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-lg z-10">
              <X className="h-5 w-5" />
            </button>
            <img src={slipModal} alt="Payment Slip" className="w-full rounded-2xl shadow-2xl object-contain" />
          </div>
        </div>
      )}

      {/* Activate / Reject Confirmation Modal */}
      {selected && action && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {action === "activate" ? "Activate Subscription" : "Reject Subscription"}
              </h2>
              <button onClick={() => { setSelected(null); setAction(null); }}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-1.5 text-sm">
              <p><span className="text-gray-500">Employee:</span> <strong>{selected.employee}</strong></p>
              <p><span className="text-gray-500">Plan:</span> <strong className="capitalize">{selected.plan}</strong></p>
              <p><span className="text-gray-500">Amount:</span> <strong>NPR {selected.amount}</strong></p>
              {selected.admin_note && (
                <p><span className="text-gray-500">Admin Note:</span> <em className="text-gray-700">{selected.admin_note}</em></p>
              )}
            </div>

            {action === "activate" && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-800">
                This will grant the employee full <strong className="capitalize">{selected.plan}</strong> plan access.
                {selected.plan !== "free" && <span> Plan expires in <strong>30 days</strong>.</span>}
              </div>
            )}

            {action === "reject" && (
              <div>
                <label className="block text-sm font-semibold mb-1.5">Rejection Reason</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide reason for rejection..."
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}

            {msg && (
              <p className={`text-sm font-medium ${msg.includes("Failed") ? "text-red-500" : "text-green-600"}`}>{msg}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setSelected(null); setAction(null); }}
                className="flex-1 py-2.5 rounded-xl border text-slate-600 hover:bg-slate-50 text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                onClick={action === "activate" ? handleActivate : handleReject}
                className={`flex-1 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-60 transition ${
                  action === "activate" ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {saving ? "..." : action === "activate" ? "Activate Plan" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
