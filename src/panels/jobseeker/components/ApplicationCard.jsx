import React from "react";
import {
  CalendarDays,
  Building2,
  MapPin,
  Briefcase,
  Banknote,
  ArrowRight,
  Trash2,
} from "lucide-react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Applied: "bg-blue-100 text-blue-700",
  "Under Review": "bg-orange-100 text-orange-700",
  Reviewed: "bg-cyan-100 text-cyan-700",
  Interview: "bg-purple-100 text-purple-700",
  Hired: "bg-green-100 text-green-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Withdrawn: "bg-gray-200 text-gray-700",
};

export default function ApplicationCard({
  title,
  company,
  logo,
  location,
  type,
  salary,
  appliedDate,
  status = "Pending",
  onView,
  onWithdraw,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Top */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

        {/* Company */}
        <div className="flex gap-4">

          <img
            src={
              logo ||
              "https://via.placeholder.com/70x70?text=Logo"
            }
            alt={company}
            className="h-16 w-16 rounded-xl border object-cover"
          />

          <div>

            <h3 className="text-xl font-bold text-gray-800">
              {title}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-gray-600">
              <Building2 size={17} />
              <span>{company}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">

              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {location}
              </span>

              <span className="flex items-center gap-1">
                <Briefcase size={16} />
                {type}
              </span>

              <span className="flex items-center gap-1">
                <Banknote size={16} />
                {salary}
              </span>

            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays size={16} />
              Applied on {appliedDate}
            </div>

          </div>

        </div>

        {/* Status */}
        <div className="flex lg:justify-end">
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              statusColors[status] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {status}
          </span>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">

        <button
          onClick={onView}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-medium text-white transition hover:bg-cyan-700"
        >
          <ArrowRight size={18} />
          View Application
        </button>

        {onWithdraw && (
          <button
            onClick={onWithdraw}
            className="flex items-center justify-center gap-2 rounded-xl border border-red-500 px-5 py-3 font-medium text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={18} />
            Withdraw
          </button>
        )}

      </div>

    </div>
  );
}