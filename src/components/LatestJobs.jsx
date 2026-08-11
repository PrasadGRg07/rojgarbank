import React, { useEffect, useState } from "react";
import Jobcards from "./Jobcards";
import { getPublicJobs } from "../lib/jobseekerApi";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getPublicJobs();
        // API returns a plain array of approved jobs
        const jobList = Array.isArray(data) ? data : (data.results || []);
        setJobs(jobList);
      } catch (err) {
        console.error("Failed to load jobs:", err);
        setError("Unable to load jobs at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 my-10 sm:my-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-left">
        <span className="text-[#6A38C2]">Latest &amp; Trending </span>Job Openings
      </h2>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-2/3 mb-4" />
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-100 rounded-full w-20" />
                <div className="h-6 bg-gray-100 rounded-full w-16" />
              </div>
              <div className="h-10 bg-gray-200 rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-gray-500 py-10">{error}</div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No job openings available at the moment. Check back soon!
        </div>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
          {jobs.map((job) => (
            <Jobcards key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;