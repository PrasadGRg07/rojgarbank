import { useState, useRef } from "react";
import {
  X,
  Crown,
  CheckCircle2,
  CheckCircle,
  Upload,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../lib/api";
import { PLANS } from "./plans";

const WelcomeSubscriptionPopup = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected]       = useState("professional");
  const [step, setStep]               = useState("plans"); // "plans" | "payment"
  const [slip, setSlip]               = useState(null);
  const [slipPreview, setSlipPreview] = useState(null);
  const [submitting, setSubmitting]   = useState(false);
  const [msg, setMsg]                 = useState({ text: "", type: "" });
  const fileRef = useRef(null);

  // Never render on the subscription page
  const isOnSubPage = location.pathname.includes("/subscription");
  if (!open || isOnSubPage) return null;

  const selectedPlan = PLANS.find((p) => p.name === selected);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSlip(file);
    setSlipPreview(URL.createObjectURL(file));
  };

  const handleChoosePlan = () => {
    if (selected === "enterprise") {
      handleClose();
      navigate("/employee/dashboard/subscription");
      return;
    }
    setStep("payment");
    setMsg({ text: "", type: "" });
    setSlip(null);
    setSlipPreview(null);
  };

  const handleSubmit = async () => {
    if (!selectedPlan) return;
    if (!slip && selectedPlan.name !== "free") {
      setMsg({ text: "Please upload a payment slip.", type: "error" });
      return;
    }
    setSubmitting(true);
    setMsg({ text: "", type: "" });
    try {
      const form = new FormData();
      form.append("plan", selectedPlan.name);
      form.append("amount", selectedPlan.amount);
      if (slip) form.append("payment_slip", slip);
      await api.post("/employee/subscriptions/", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg({ text: "Request submitted! Awaiting admin review.", type: "success" });
      setTimeout(() => {
        handleClose();
      }, 1800);
    } catch {
      setMsg({ text: "Failed to submit. Please try again.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("plans");
    setMsg({ text: "", type: "" });
    setSlip(null);
    setSlipPreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[95vh]">

        {/* ── Header ── */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 text-white px-8 py-6 flex-shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 hover:bg-white/20 rounded-xl p-2 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {step === "plans"
                  ? "Choose Your Subscription Plan"
                  : `Subscribe — ${selectedPlan?.label} Plan`}
              </h2>
              <p className="text-blue-100 text-sm mt-0.5">
                {step === "plans"
                  ? "Unlock the hiring features that match your needs."
                  : `${selectedPlan?.price}${selectedPlan?.price !== "Custom" ? " / month" : ""}`}
              </p>
            </div>
          </div>
        </div>

        {/* ── STEP 1: Plan Selection ── */}
        {step === "plans" && (
          <>
            <div className="overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PLANS.map((plan) => {
                const isSelected = selected === plan.name;
                return (
                  <button
                    key={plan.name}
                    onClick={() => setSelected(plan.name)}
                    className={
                      "relative text-left rounded-2xl border-2 p-5 transition-all duration-200 focus:outline-none " +
                      (isSelected
                        ? "border-indigo-500 shadow-lg shadow-indigo-100 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-200 hover:bg-gray-50")
                    }
                  >
                    {plan.popular && (
                      <span className="absolute top-3 right-3 text-xs font-semibold bg-indigo-600 text-white px-2.5 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    )}

                    <p className="text-lg font-bold text-gray-900 mb-0.5">{plan.label}</p>
                    <p className="text-xs text-gray-500 mb-3">{plan.description}</p>

                    <div className="mb-4">
                      <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== "Custom" && plan.price !== "NPR 0" && (
                        <span className="text-gray-400 text-sm ml-1">/ month</span>
                      )}
                    </div>

                    <ul className="space-y-1.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {isSelected && (
                      <div className="mt-4 pt-3 border-t border-indigo-200 text-indigo-600 text-sm font-semibold flex items-center gap-1">
                        Selected <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="border-t bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
              <p className="text-sm text-gray-500">
                You can manage or upgrade your plan anytime from Settings.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition text-sm font-medium"
                >
                  Skip for Now
                </button>
                <button
                  onClick={handleChoosePlan}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 transition text-sm font-semibold shadow"
                >
                  {selected === "enterprise" ? "Contact Sales" : "Choose Plan"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── STEP 2: Payment ── */}
        {step === "payment" && selectedPlan && (
          <div className="overflow-y-auto p-6 space-y-5">

            {/* Bank Details */}
            <div className="bg-slate-50 rounded-2xl p-5 text-sm">
              <p className="font-semibold text-slate-700 mb-3">Payment Details</p>
              <div className="space-y-1.5 text-slate-600">
                <p>Bank: <strong>Himalayan Bank</strong></p>
                <p>Account Name: <strong>Rojgar Bank Pvt. Ltd.</strong></p>
                <p>Account No: <strong>01234567890123</strong></p>
                <p>Amount: <strong className="text-blue-600">{selectedPlan.price}</strong></p>
              </div>
            </div>

            {/* Slip Upload */}
            {selectedPlan.name !== "free" && (
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Upload Payment Slip *</p>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-5 text-center cursor-pointer hover:border-blue-400 transition"
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

            {selectedPlan.name === "free" && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-sm text-green-700">
                No payment required for the Free plan. Click "Submit" to activate.
              </div>
            )}

            {msg.text && (
              <p className={"text-sm font-medium " + (msg.type === "success" ? "text-green-600" : "text-red-500")}>
                {msg.text}
              </p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setStep("plans")}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition text-sm font-medium"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60 transition text-sm"
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default WelcomeSubscriptionPopup;
