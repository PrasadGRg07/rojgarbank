import React from "react";
import { Badge } from "./ui/badge";
import {
  MapPin,
  Building2,
  Clock3,
  Briefcase,
  Banknote,
} from "lucide-react";

const Jobcards = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-4 sm:p-6">
      {/* Company */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-600" />
          </div>

          <div>
            <h2 className="font-bold text-base sm:text-lg text-gray-800">
              Himalayan Bank Ltd.
            </h2>

            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <MapPin className="w-4 h-4" />
              Kathmandu, Nepal
            </div>
          </div>
        </div>

        <Badge className="bg-green-100 text-green-700 rounded-full px-3 py-1 self-start sm:self-auto">
          New
        </Badge>
      </div>

      {/* Job Title */}
      <div className="mt-5 sm:mt-6">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">
          Frontend React Developer
        </h1>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-5">
        <Badge variant="outline" className="rounded-full">
          Full Time
        </Badge>

        <Badge variant="outline" className="rounded-full">
          Remote
        </Badge>

        <Badge variant="outline" className="rounded-full">
          3 Vacancies
        </Badge>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-6 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Banknote className="w-4 h-4 text-cyan-600 shrink-0" />
          NPR 80K - 120K
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Briefcase className="w-4 h-4 text-cyan-600 shrink-0" />
          2+ Years
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Clock3 className="w-4 h-4 text-cyan-600 shrink-0" />
          Posted 2 days ago
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Building2 className="w-4 h-4 text-cyan-600 shrink-0" />
          On-site
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-7">
        <button className="w-full sm:flex-1 border border-cyan-500 text-cyan-600 py-2.5 rounded-xl font-semibold hover:bg-cyan-50 transition">
          View Details
        </button>

        <button className="w-full sm:flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2.5 rounded-xl font-semibold transition">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Jobcards;