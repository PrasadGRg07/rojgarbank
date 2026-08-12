import { useState, useEffect, useRef } from "react";
import api from "../../../lib/api";
import {
  CheckCircle2,
  Crown,
  Upload,
  X,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { PLANS } from "./plans";

const STATUS_BADGE = {
  pending: { label: "Pending Review", icon: Clock, cls: "bg-yellow-100 text-yellow-700" },
  forwarded: { label: "Forwarded to Superadmin", icon: ArrowRight, cls: "bg-blue-100 text-blue-700" },
  active: { label: "Active", icon: CheckCircle, cls: "bg-green-100 text-green-700" },
  expired: { label: "Expired", icon: XCircle, cls: "bg-gray-100 text-gray-600" },
  rejected: { label: "Rejected", icon: XCircle, cls: "bg-red-100 text-red-700" },
};

export default function Subscription() {
  const [mySubscription, setMySubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // plan object
  const [slip, setSlip] = useState(null);
  const [slipPreview, setSlipPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const fileRef = useRef(null);

  const fetchMySub = async () => {
    try {
      const { data } = await api.get("/employee/subscriptions/");
      // Get latest active or most recent
      const active = data.find((s) => s.status === "active");
      setMySubscription(active || data[0] || null);
    } catch {
      setMySubscription(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMySub(); }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSlip(file);
    setSlipPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!modal) return;
    if (!slip && modal.name !== "free") {
      setMsg({ text: "Please upload a payment slip.", type: "error" });
      return;
    }
    setSubmitting(true);
    setMsg({ text: "", type: "" });
    try {
      const form = new FormData();
      form.append("plan", modal.name);
      form.append("amount", modal.amount);
      if (slip) form.append("payment_slip", slip);
      await api.post("/employee/subscriptions/", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg({ text: "Subscription request submitted! Waiting for admin review.", type: "success" });
      setTimeout(() => {
        setModal(null);
        setSlip(null);
        setSlipPreview(null);
        fetchMySub();
      }, 1500);
    } catch {
      setMsg({ text: "Failed to submit. Please try again.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const currentPlanName = mySubscription?.status === "active" ? mySubscription.plan : "free";

  return (
    <div className="relative min-h-screen overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 sm:p-8">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Pricing Plans
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900">
            Choose Your Subscription
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Select the plan that best suits your hiring needs.
          </p>
        </div>

        {/* Current subscription status banner */}
        {!loading && mySubscription && (
          <div className={`rounded-2xl border p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 ${
            mySubscription.status === "active" ? "bg-green-50 border-green-200" :
            mySubscription.status === "rejected" ? "bg-red-50 border-red-200" :
            "bg-yellow-50 border-yellow-200"
          }`}>
            {(() => {
              const badge = STATUS_BADGE[mySubscription.status] || STATUS_BADGE.pending;
              const Icon = badge.icon;
              return (
                <>
                  <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${badge.cls}`}>
                    <Icon className="h-4 w-4" />
                    {badge.label}
                  </span>
                  <span className="text-slate-700 text-sm flex-1">
                    Your <strong className="capitalize">{mySubscription.plan}</strong> plan —
                    submitted {mySubscription.created_at}
                    {mySubscription.status === "active" && mySubscription.expires_at && (
                      <span className="ml-2">
                        · Expires <strong>{mySubscription.expires_at}</strong>
                        {mySubscription.days_remaining !== null && (
                          <span className={`ml-1 font-semibold ${mySubscription.days_remaining <= 7 ? "text-orange-600" : "text-green-700"}`}>
                            ({mySubscription.days_remaining} day{mySubscription.days_remaining !== 1 ? "s" : ""} left)
                          </span>
                        )}
                      </span>
                    )}
                    {mySubscription.status === "active" && !mySubscription.expires_at && (
                      <span className="ml-2 text-green-600 font-medium">· Never expires</span>
                    )}
                    {mySubscription.status === "expired" && (
                      <span className="ml-2 text-gray-500">· Expired on {mySubscription.expires_at} — please renew</span>
                    )}
                    {mySubscription.status === "rejected" && mySubscription.rejection_reason && (
                      <span className="text-red-600 ml-2">· Reason: {mySubscription.rejection_reason}</span>
                    )}
                  </span>
                  <button onClick={fetchMySub} className="ml-auto text-slate-400 hover:text-slate-600">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </>
              );
            })()}
          </div>
        )}

        {/* Plan Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan) => {
            const isActive = currentPlanName === plan.name && mySubscription?.status === "active";
            const isPending = mySubscription && mySubscription.plan === plan.name && mySubscription.status !== "active";
            return (
              <div
                key={plan.name}
                className={`relative overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  isActive
                    ? "border-green-400 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl"
                    : plan.popular
                    ? "border-blue-500 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl"
                    : "border-slate-200 bg-white shadow-lg"
                }`}
              >
                {plan.popular && !isActive && (
                  <div className="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-600">
                    Most Popular
                  </div>
                )}
                {isActive && (
                  <div className="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-bold text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Active
                  </div>
                )}

                <div className="p-7">
                  <h2 className="text-2xl font-bold">{plan.label}</h2>
                  <p className={`mt-2 text-sm ${isActive || plan.popular ? "text-white/70" : "text-slate-500"}`}>
                    {plan.description}
                  </p>
                  <div className="mt-6">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    {plan.price !== "Custom" && plan.price !== "NPR 0" && (
                      <span className={`ml-2 text-sm ${isActive || plan.popular ? "text-white/60" : "text-slate-400"}`}>/month</span>
                    )}
                  </div>

                  <div className={`my-6 h-px ${isActive || plan.popular ? "bg-white/20" : "bg-slate-200"}`} />

                  <div className="space-y-3">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 ${isActive ? "text-green-200" : plan.popular ? "text-green-300" : "text-green-500"}`} />
                        <span className={isActive || plan.popular ? "text-white/90" : "text-slate-700"}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    disabled={isActive || isPending}
                    onClick={() => { setModal(plan); setMsg({ text: "", type: "" }); setSlip(null); setSlipPreview(null); }}
                    className={`mt-8 w-full rounded-xl py-3 font-semibold transition-all ${
                      isActive
                        ? "bg-white/20 text-white cursor-default"
                        : isPending
                        ? "bg-white/20 text-white/70 cursor-not-allowed"
                        : plan.popular
                        ? "bg-white text-blue-700 hover:bg-blue-50"
                        : "border border-slate-300 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    }`}
                  >
                    {isActive ? "✓ Current Plan" : isPending ? "⏳ Pending Review" : plan.name === "enterprise" ? "Contact Sales" : "Choose Plan"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl"><Crown className="h-5 w-5" /></div>
                <div>
                  <h2 className="text-lg font-bold">{modal.label} Plan</h2>
                  <p className="text-blue-100 text-sm">{modal.price}{modal.price !== "Custom" && "/month"}</p>
                </div>
              </div>
              <button onClick={() => setModal(null)} className="hover:bg-white/20 rounded-lg p-2 transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">

              {/* Bank Details */}
              <div className="bg-slate-50 rounded-xl p-4 text-sm">
                <p className="font-semibold text-slate-700 mb-2">Payment Details</p>
                <div className="space-y-1 text-slate-600">
                  <p>Bank: <strong>Himalayan Bank</strong></p>
                  <p>Account Name: <strong>Rojgar Bank Pvt. Ltd.</strong></p>
                  <p>Account No: <strong>01234567890123</strong></p>
                  <p>Amount: <strong className="text-blue-600">{modal.price}</strong></p>
                </div>
              </div>

              {/* Payment Slip Upload */}
              {modal.name !== "free" && (
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">Upload Payment Slip *</p>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:border-blue-400 transition"
                  >
                    {slipPreview ? (
                      <img src={slipPreview} alt="slip" className="max-h-40 mx-auto rounded-lg object-contain" />
                    ) : (
                      <div className="space-y-1 text-slate-400">
                        <Upload className="h-8 w-8 mx-auto" />
                        <p className="text-sm">Click to upload payment slip</p>
                        <p className="text-xs">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
              )}

              {msg.text && (
                <p className={`text-sm font-medium ${msg.type === "success" ? "text-green-600" : "text-red-500"}`}>
                  {msg.text}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setModal(null)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 transition text-sm"
                >
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}