import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  LayoutGrid,
} from "lucide-react";

import {
  getPendingJobs,
  getApprovedJobs,
  getRejectedJobs,
} from "../../../lib/adminApi";

const TABS = [
  { key: "all",      label: "All Jobs",   icon: LayoutGrid,   style: "bg-gray-100 text-gray-700" },
  { key: "pending",  label: "Pending",    icon: Clock,        style: "bg-yellow-100 text-yellow-700" },
  { key: "approved", label: "Approved",   icon: CheckCircle,  style: "bg-green-100 text-green-700" },
  { key: "rejected", label: "Rejected",   icon: XCircle,      style: "bg-red-100 text-red-700" },
];

const STATUS_MAP = {
  pending:  { label: "Pending Review", style: "bg-yellow-100 text-yellow-700", icon: Clock },
  approved: { label: "Approved",       style: "bg-green-100 text-green-700",   icon: CheckCircle },
  rejected: { label: "Rejected",       style: "bg-red-100 text-red-700",       icon: XCircle },
};

export default function JobList() {
  const navigate = useNavigate();

  const [allJobs, setAllJobs]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [activeTab, setActiveTab]   = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const [pending, approved, rejected] = await Promise.all([
          getPendingJobs(),
          getApprovedJobs(),
          getRejectedJobs(),
        ]);
        setAllJobs([...pending, ...approved, ...rejected]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const filtered = allJobs.filter((job) => {
    const matchesTab = activeTab === "all" || job.status === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      job.title?.toLowerCase().includes(q) ||
      job.company?.toLowerCase().includes(q) ||
      job.employee_name?.toLowerCase().includes(q) ||
      job.district?.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const counts = {
    all:      allJobs.length,
    pending:  allJobs.filter((j) => j.status === "pending").length,
    approved: allJobs.filter((j) => j.status === "approved").length,
    rejected: allJobs.filter((j) => j.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
            <p className="mt-1 text-gray-500">Review, approve, or reject employee job posts.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-xl p-5 text-left shadow-sm transition border-2 ${
                  activeTab === tab.key
                    ? "border-blue-500 bg-white"
                    : "border-transparent bg-white hover:border-gray-200"
                }`}
              >
                <div className={`inline-flex rounded-full p-2 ${tab.style}`}>
                  <Icon size={18} />
                </div>
                <p className="mt-3 text-2xl font-bold">{counts[tab.key]}</p>
                <p className="text-sm text-gray-500">{tab.label}</p>
              </button>
            );
          })}
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border flex-wrap">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                    activeTab === tab.key
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    activeTab === tab.key ? "bg-white text-blue-600" : "bg-gray-200 text-gray-600"
                  }`}>
                    {counts[tab.key]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, company, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border bg-white pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Job List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
            <LayoutGrid size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-xl font-semibold text-gray-500">No jobs found</p>
            <p className="mt-1 text-gray-400 text-sm">Try changing the filter or search query.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((job) => {
              const statusInfo = STATUS_MAP[job.status] || STATUS_MAP.pending;
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={job.id}
                  className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition border border-transparent hover:border-blue-100"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    
                    {/* Left Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-gray-900 truncate">{job.title}</h2>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.style}`}>
                          <StatusIcon size={13} />
                          {statusInfo.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Building2 size={14} className="text-blue-400" />
                          {job.company || job.employee_name || "N/A"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-red-400" />
                          {[job.district, job.province].filter(Boolean).join(", ") || "N/A"}
                        </span>
                        {job.employmentType && (
                          <span className="flex items-center gap-1.5">
                            <Briefcase size={14} className="text-green-400" />
                            {job.employmentType}
                          </span>
                        )}
                        {job.applicationDeadline && (
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-orange-400" />
                            Deadline: {job.applicationDeadline}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {job.mainCategory && (
                          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                            {job.mainCategory}
                          </span>
                        )}
                        {job.jobLevel && (
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                            {job.jobLevel}
                          </span>
                        )}
                        {job.openings && (
                          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                            {job.openings} Opening{job.openings !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>

                      {job.status === "rejected" && job.rejection_reason && (
                        <div className="mt-3 rounded-lg bg-red-50 border border-red-100 px-3 py-2">
                          <p className="text-xs text-red-600">
                            <span className="font-semibold">Rejection Reason:</span> {job.rejection_reason}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() =>
                          navigate(`/admin/dashboard/jobs/review/${job.id}`, { state: { job } })
                        }
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
                      >
                        <Eye size={16} />
                        {job.status === "pending" ? "Review" : "View Details"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}