import React from "react";
import {
  User,
  Mail,
  Briefcase,
  Calendar,
  Eye,
  ChevronDown,
} from "lucide-react";

const CandidateCard = ({ candidate }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all duration-200">
      {/* Name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="w-5 h-5 text-blue-600" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">
            {candidate.name}
          </h3>
          <p className="text-xs text-gray-500">
            #{candidate.id}
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Mail className="w-4 h-4 text-gray-400" />
        <span>{candidate.email}</span>
      </div>

      {/* Job */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Briefcase className="w-4 h-4 text-gray-400" />
        <span>{candidate.job}</span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Calendar className="w-4 h-4 text-gray-400" />
        <span>Applied {candidate.appliedDate}</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-100 transition">
          <Eye className="w-4 h-4" />
          View
        </button>

        <button className="flex items-center gap-1 bg-blue-600 text-white rounded-lg px-3 py-2 hover:bg-blue-700 transition">
          Move
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;