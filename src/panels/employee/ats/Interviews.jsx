import React, { useState } from "react";
import { CalendarPlus, Search } from "lucide-react";

import InterviewCard from "./components/InterviewCard";
import ScheduleInterviewModal from "./components/ScheduleInterviewModal";
import { interviewData } from "./data";

const Interviews = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const filteredInterviews = interviewData.filter(
    (item) =>
      item.candidate.toLowerCase().includes(search.toLowerCase()) ||
      item.job.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Interviews
          </h1>

          <p className="text-gray-500 mt-1">
            Schedule and manage candidate interviews.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search */}
          <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2">
            <Search className="w-5 h-5 text-gray-500" />

            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            <CalendarPlus className="w-5 h-5" />
            Schedule Interview
          </button>

        </div>

      </div>

      {/* Interview Cards */}
      {filteredInterviews.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            No Interviews Found
          </h3>

          <p className="text-gray-500 mt-2">
            Try changing your search or schedule a new interview.
          </p>
        </div>
      )}

      {/* Modal */}
      <ScheduleInterviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

    </div>
  );
};

export default Interviews;