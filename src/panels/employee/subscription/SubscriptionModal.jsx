import React from "react";
import {
  X,
  Crown,
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubscriptionModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  if (!open) return null;

  const handleViewPlans = () => {
    onClose();
    navigate("/employee/dashboard/subscription");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-white/20 rounded-lg p-2 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl">
              <Crown className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Job Posting Limit Reached
              </h2>

              <p className="text-blue-100 text-sm mt-1">
                Upgrade your subscription to continue posting jobs.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">

          {/* Current Plan */}
          <div className="bg-gray-50 border rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">
              Current Plan
            </p>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">
                  Free Plan
                </h3>

                <p className="text-sm text-gray-500">
                  3 Job Posts Included
                </p>
              </div>

              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          {/* Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              You have reached the maximum number of job postings
              available on your current subscription.
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              Upgrade and get:
            </h4>

            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Unlimited Job Postings</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Featured Job Listings</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Priority Support</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Advanced Applicant Management</span>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t p-5 flex flex-col sm:flex-row gap-3 justify-end">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border hover:bg-gray-100 transition"
          >
            Maybe Later
          </button>

          <button
            onClick={handleViewPlans}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition"
          >
            View Subscription Plans
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};

export default SubscriptionModal;