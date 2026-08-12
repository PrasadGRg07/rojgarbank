import React, { useState } from "react";
import {
  X,
  Crown,
  Zap,
  Briefcase,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PLANS = [
  {
    key: "free",
    label: "Free",
    price: "Rs. 0",
    period: "Forever",
    badgeColor: "bg-slate-100 text-slate-700",
    Icon: Briefcase,
    perks: [
      "3 Job Postings",
      "Basic Applicant Management",
      "Email Support",
    ],
    popular: false,
  },
  {
    key: "basic",
    label: "Basic",
    price: "Rs. 999",
    period: "/ month",
    badgeColor: "bg-blue-100 text-blue-700",
    Icon: Zap,
    perks: [
      "10 Job Postings / month",
      "Applicant Tracking",
      "Resume Search (Limited)",
      "Priority Email Support",
    ],
    popular: false,
  },
  {
    key: "professional",
    label: "Professional",
    price: "Rs. 2,499",
    period: "/ month",
    badgeColor: "bg-indigo-100 text-indigo-700",
    Icon: Crown,
    perks: [
      "Unlimited Job Postings",
      "Full Resume Search",
      "Candidate Shortlisting",
      "Featured Listings",
      "Priority Support",
    ],
    popular: true,
  },
  {
    key: "enterprise",
    label: "Enterprise",
    price: "Rs. 9,999",
    period: "/ year",
    badgeColor: "bg-amber-100 text-amber-700",
    Icon: Building2,
    perks: [
      "Everything in Professional",
      "Dedicated Account Manager",
      "Custom Branding",
      "Advanced Analytics",
      "365 Days Access",
    ],
    popular: false,
  },
];

const WelcomeSubscriptionPopup = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("professional");

  if (!open) return null;

  const handleGetStarted = () => {
    onClose();
    navigate("/employee/dashboard/subscription");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[95vh]">

        <div className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 text-white px-8 py-7 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-white/20 rounded-xl p-2 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Welcome to Rojgar Bank!</h2>
              <p className="text-blue-100 text-sm mt-1">
                Choose a plan that fits your hiring needs to get started.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PLANS.map((plan) => {
            const Icon = plan.Icon;
            const isSelected = selected === plan.key;
            return (
              <button
                key={plan.key}
                onClick={() => setSelected(plan.key)}
                className={"relative text-left rounded-2xl border-2 p-5 transition-all duration-200 focus:outline-none " + (isSelected ? "border-indigo-500 shadow-lg shadow-indigo-100 bg-indigo-50" : "border-gray-200 hover:border-indigo-200 hover:bg-gray-50")}
              >
                {plan.popular && (
                  <span className="absolute top-3 right-3 text-xs font-semibold bg-indigo-600 text-white px-2.5 py-0.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className={"inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-3 " + plan.badgeColor}>
                  <Icon className="w-4 h-4" />
                  {plan.label}
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-1.5">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-indigo-200 text-indigo-600 text-sm font-semibold flex items-center gap-1">
                    Selected <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="border-t bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            You can upgrade or change your plan any time from your dashboard.
          </p>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition text-sm font-medium"
            >
              Skip for Now
            </button>
            <button
              onClick={handleGetStarted}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 transition text-sm font-semibold shadow"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WelcomeSubscriptionPopup;
