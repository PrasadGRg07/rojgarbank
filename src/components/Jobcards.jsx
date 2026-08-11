import React from "react";
import { Badge } from "./ui/badge";
import {
  MapPin,
  Building2,
  Clock3,
  Briefcase,
  Banknote,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Jobcards = ({ job }) => {
  const navigate = useNavigate();

  // Guard: don't render if job data is missing
  if (!job) return null;

  // Format salary display — real API fields: salaryMin, salaryMax, hideSalary, negotiable
  const formatSalary = () => {
    if (job.hideSalary) return "Confidential";
    if (job.negotiable && !job.salaryMin && !job.salaryMax) return "Negotiable";
    const min = job.salaryMin;
    const max = job.salaryMax;
    if (min && max)
      return `NPR ${Number(min).toLocaleString()} – ${Number(max).toLocaleString()}`;
    if (min) return `NPR ${Number(min).toLocaleString()}+`;
    return "Negotiable";
  };

  // Time since posting
  const timeAgo = (dateStr) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} week${days >= 14 ? "s" : ""} ago`;
    return `${Math.floor(days / 30)} month${days >= 60 ? "s" : ""} ago`;
  };

  // Real field names from the API response
  const company     = job.company || job.employee_name || "Company";
  const location    = job.district ? `${job.district}, Nepal` : "Nepal";
  const title       = job.title || "Job Opening";
  const empType     = job.employmentType || "";
  const workMode    = job.workMode || job.workplace || "";
  const jobLevel    = job.jobLevel || "";
  const openings    = job.openings;
  const experience  = job.experience || "";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-4 sm:p-6">

      {/* Company header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-600" />
          </div>

          <div>
            <h2 className="font-bold text-base sm:text-lg text-gray-800">
              {company}
            </h2>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
          </div>
        </div>

        <Badge className="bg-green-100 text-green-700 rounded-full px-3 py-1 self-start sm:self-auto">
          New
        </Badge>
      </div>

      {/* Job title */}
      <div className="mt-5 sm:mt-6">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">
          {title}
        </h1>
        {job.shortDescription && (
          <p className="text-gray-500 text-sm mt-3 leading-relaxed line-clamp-2">
            {job.shortDescription}
          </p>
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-5">
        {empType && (
          <Badge variant="outline" className="rounded-full text-xs">
            {empType}
          </Badge>
        )}
        {workMode && (
          <Badge variant="outline" className="rounded-full text-xs">
            {workMode}
          </Badge>
        )}
        {openings && (
          <Badge variant="outline" className="rounded-full text-xs">
            {openings} {Number(openings) === 1 ? "Opening" : "Openings"}
          </Badge>
        )}
        {jobLevel && (
          <Badge variant="outline" className="rounded-full text-xs">
            {jobLevel}
          </Badge>
        )}
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-6 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Banknote className="w-4 h-4 text-cyan-600 shrink-0" />
          <span className="truncate">{formatSalary()}</span>
        </div>

        {experience && (
          <div className="flex items-center gap-2 text-gray-600">
            <Briefcase className="w-4 h-4 text-cyan-600 shrink-0" />
            <span className="truncate">{experience}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-600">
          <Clock3 className="w-4 h-4 text-cyan-600 shrink-0" />
          <span>Posted {timeAgo(job.created_at)}</span>
        </div>

        {job.applicationDeadline && (
          <div className="flex items-center gap-2 text-gray-600 text-xs">
            <span className="text-red-500 font-medium">
              Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-7">
        <button
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="w-full sm:flex-1 border border-cyan-500 text-cyan-600 py-2.5 rounded-xl font-semibold hover:bg-cyan-50 transition"
        >
          View Details
        </button>

        <button
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="w-full sm:flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2.5 rounded-xl font-semibold transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Jobcards;