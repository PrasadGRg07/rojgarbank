import React from "react";
import {
  User,
  Briefcase,
  Calendar,
  Clock,
  Video,
  UserCheck,
  Pencil,
  Trash2,
} from "lucide-react";

const statusColor = {
  Scheduled: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const InterviewCard = ({ interview }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            {interview.candidate}
          </h2>

          <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            {interview.job}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColor[interview.status]
          }`}
        >
          {interview.status}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {interview.date}
        </p>

        <p className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {interview.time}
        </p>

        <p className="flex items-center gap-2">
          <Video className="w-4 h-4" />
          {interview.mode}
        </p>

        <p className="flex items-center gap-2">
          <UserCheck className="w-4 h-4" />
          {interview.interviewer}
        </p>
      </div>

      <div className="flex gap-3 mt-5">
        <button className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100">
          <Pencil className="w-4 h-4" />
          Edit
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white rounded-lg py-2 hover:bg-red-600">
          <Trash2 className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InterviewCard;