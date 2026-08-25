import React, { useState, useEffect } from "react";
import { Search, Briefcase, Loader2, RefreshCw } from "lucide-react";

import PipelineColumn from "./components/PipelineColumn";
import api from "../../../lib/api";

// Map backend status to pipeline column keys
const STATUS_COLUMNS = ["applied", "shortlisted", "interview", "offered", "hired", "rejected"];

const Pipeline = () => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [allApplications, setAllApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all jobs first
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await api.get("/employee/jobs/");
        setJobs(res.data);
        if (res.data.length > 0) {
          setSelectedJob(String(res.data[0].id));
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadJobs();
  }, []);

  // Load applications when selected job changes
  useEffect(() => {
    if (!selectedJob) { setAllApplications([]); setLoading(false); return; }
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/employee/jobs/${selectedJob}/applications/`);
        setAllApplications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selectedJob]);

  // Group applications by status and search filter
  const grouped = STATUS_COLUMNS.reduce((acc, col) => {
    acc[col] = allApplications
      .filter((a) => (a.status || "applied") === col)
      .filter((a) =>
        (a.applicant_name || "").toLowerCase().includes(search.toLowerCase()) ||
        (a.applicant_email || "").toLowerCase().includes(search.toLowerCase())
      )
      .map((a) => ({
        id: a.id,
        name: a.applicant_name,
        email: a.applicant_email,
        job: a.job_title,
        appliedDate: new Date(a.applied_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      }));
    return acc;
  }, {});

  const refresh = () => { setSelectedJob((s) => s); };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">ATS Pipeline</h1>
          <p className="text-gray-500 mt-1">Manage candidates through every hiring stage.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Job Select */}
          <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            <select
              className="outline-none bg-transparent"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              {jobs.length === 0 && <option>No Jobs</option>}
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search candidate..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-transparent"
            />
          </div>

          {/* Refresh */}
          <button
            onClick={refresh}
            className="flex items-center justify-center gap-2 bg-white border hover:bg-gray-50 text-gray-600 px-4 py-3 rounded-xl"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pipeline Board */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="flex gap-5 overflow-x-auto pb-6">
          <PipelineColumn title="Applied" stage="applied" candidates={grouped.applied} />
          <PipelineColumn title="Shortlisted" stage="shortlisted" candidates={grouped.shortlisted} />
          <PipelineColumn title="Interview" stage="interview" candidates={grouped.interview} />
          <PipelineColumn title="Offered" stage="offered" candidates={grouped.offered} />
          <PipelineColumn title="Hired" stage="hired" candidates={grouped.hired} />
          <PipelineColumn title="Rejected" stage="rejected" candidates={grouped.rejected} />
        </div>
      )}
    </div>
  );
};

export default Pipeline;