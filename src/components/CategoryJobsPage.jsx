import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Briefcase, Clock3, Search } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getPublicJobs } from "../lib/jobseekerApi";

// EXACT same category keyword map as LatestJobs (home page)
const CATEGORY_KEYWORDS = {
  "IT":          ["IT", "Tech", "Software", "Information Technology", "Technology"],
  "Banking":     ["Banking", "Finance", "Financial"],
  "Marketing":   ["Marketing", "Sales", "Advertising"],
  "Engineering": ["Engineering", "Civil", "Mechanical", "Electrical"],
  "Education":   ["Education", "Teaching", "Training"],
  "Business":    ["Business", "Management", "Administration"],
};

// Human-readable label for the page heading
const CATEGORY_LABELS = {
  "IT":          "IT & Technology",
  "Banking":     "Banking & Finance",
  "Marketing":   "Marketing & Sales",
  "Engineering": "Engineering",
  "Education":   "Education",
  "Business":    "Business & Management",
};

export default function CategoryJobsPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const categoryLabel = CATEGORY_LABELS[category] || category;
  const keywords = (CATEGORY_KEYWORDS[category] || [category]).map(k => k.toLowerCase());

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const all = await getPublicJobs();
        // Use the same logic as home page LatestJobs
        const filtered = all.filter((job) => {
          const cat = (job.mainCategory || job.main_category || "").toLowerCase();
          const sub = (job.subCategory || job.sub_category || "").toLowerCase();
          return keywords.some(k => cat.includes(k) || sub.includes(k));
        });
        setJobs(filtered);
      } catch (err) {
        console.error("Failed to load jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [category]);

  const filtered = jobs.filter((job) =>
    (job.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (job.employer_company_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-cyan-50 via-white to-cyan-100 border-b border-cyan-100 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-cyan-700 bg-cyan-100 rounded-full inline-flex items-center px-4 py-1.5 mb-4 uppercase tracking-widest">
            Job Category
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
            {categoryLabel} Jobs
          </h1>
          {/* Search */}
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or company..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-cyan-200 text-slate-800 text-sm outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-slate-500 text-lg">
            Loading jobs...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-3">
            <Briefcase size={48} strokeWidth={1.5} />
            <p className="text-lg font-medium">No jobs found in "{categoryLabel}"</p>
            <button
              onClick={() => navigate("/")}
              className="mt-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              Browse All Jobs
            </button>
          </div>
        ) : (
          <>
            <p className="text-slate-500 text-sm mb-6">
              Showing <span className="font-semibold text-slate-700">{filtered.length}</span> jobs in {categoryLabel}
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {filtered.map((job) => (
                <div
                  key={job.id}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="bg-white rounded-xl border border-slate-200 p-5 cursor-pointer hover:shadow-md hover:border-blue-200 transition group"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={job.employer_profile_picture || "/logo.png"}
                      alt="Company"
                      className="w-12 h-12 rounded-lg object-cover border border-slate-100 shrink-0"
                      onError={(e) => { e.target.src = "/logo.png"; }}
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition truncate">
                        {job.title}
                      </h2>
                      <p className="text-sm text-slate-500 truncate">
                        {job.employer_company_name || "Company"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {[job.district, job.municipality].filter(Boolean).join(", ") || "Nepal"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={12} />
                      {job.employmentType || "Full-time"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock3 size={12} />
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-700">
                      {job.hideSalary
                        ? "Negotiable"
                        : `${job.currency || "Rs."} ${job.salaryMin ?? ""} - ${job.salaryMax ?? ""}`}
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                      View Details →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
