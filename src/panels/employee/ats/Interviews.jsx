import React, { useState, useEffect, useCallback } from "react";
import { CalendarPlus, Search, Loader2, RefreshCw } from "lucide-react";

import InterviewCard from "./components/InterviewCard";
import ScheduleInterviewModal from "./components/ScheduleInterviewModal";
import api from "../../../lib/api";

const Interviews = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInterviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/employee/interviews/");
      setInterviews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInterviews();
  }, [loadInterviews]);

  const filteredInterviews = interviews.filter(
    (item) =>
      (item.candidate_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.job_title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Interviews</h1>
          <p className="text-gray-500 mt-1">Schedule and manage candidate interviews.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by candidate or job..."
              className="outline-none bg-transparent w-48"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Refresh */}
          <button
            onClick={loadInterviews}
            className="flex items-center justify-center gap-2 bg-white border hover:bg-gray-50 text-gray-600 px-4 py-3 rounded-xl"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Schedule Button */}
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            <CalendarPlus className="w-5 h-5" />
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : filteredInterviews.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={{
                ...interview,
                candidate: interview.candidate_name,
                job: interview.job_title,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            {search ? "No Interviews Found" : "No Interviews Scheduled Yet"}
          </h3>
          <p className="text-gray-500 mt-2">
            {search
              ? "Try changing your search query."
              : "Click 'Schedule Interview' to add one."}
          </p>
        </div>
      )}

      {/* Modal */}
      <ScheduleInterviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={loadInterviews}
      />
    </div>
  );
};

export default Interviews;