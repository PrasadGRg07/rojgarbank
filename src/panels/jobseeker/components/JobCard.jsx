import {
  MapPin,
  Briefcase,
  Clock3,
  Bookmark,
} from "lucide-react";

export default function JobCard({
  title,
  company,
  location,
  salary,
  type,
  posted,
  logo,
  onViewDetails,
  onSave,
  isSaved = false,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt={company}
            className="h-14 w-14 rounded-lg border object-cover"
          />

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {title}
            </h3>

            <p className="text-sm text-gray-500">
              {company}
            </p>
          </div>
        </div>

        <button
          onClick={onSave}
          className={`rounded-lg p-2 transition ${isSaved ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "hover:bg-gray-100 text-gray-500"}`}
        >
          <Bookmark size={20} className={isSaved ? "fill-blue-600" : ""} />
        </button>
      </div>

      {/* Details */}
      <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {location}
        </div>

        <div className="flex items-center gap-2">
          <Briefcase size={16} />
          {type}
        </div>

        <div className="flex items-center gap-2">
          <Clock3 size={16} />
          {posted}
        </div>
      </div>

      {/* Salary */}
      <div className="mt-4">
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          {salary}
        </span>
      </div>

      {/* Button */}
      <div className="mt-6">
        <button
          onClick={onViewDetails}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
}