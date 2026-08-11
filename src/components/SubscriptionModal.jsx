import { X, Crown, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SubscriptionModal({ onClose }) {
  const navigate = useNavigate();

  const handleViewPlans = () => {
    onClose();
    navigate("/employee/dashboard/subscription");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-yellow-100 p-5">
            <Crown className="text-yellow-600" size={40} />
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold">
          Subscription Required
        </h2>

        <p className="mt-3 text-center text-gray-500">
          Upgrade your plan to start posting jobs and manage applicants.
        </p>

        <div className="mt-8 space-y-4 rounded-2xl bg-slate-50 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" />
            Unlimited Job Posts
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" />
            Unlimited Applicants
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" />
            Resume Search
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" />
            ATS Included
          </div>
        </div>

        <button
          onClick={handleViewPlans}
          className="mt-8 w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700"
        >
          View Subscription Plans
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full rounded-xl border py-3 hover:bg-gray-50"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}
