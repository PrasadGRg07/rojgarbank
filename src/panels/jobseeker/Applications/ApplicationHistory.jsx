import React, { useMemo, useState, useEffect } from "react";
import {
  Search,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
  CalendarDays,
  Building2,
  MapPin,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getMyApplications } from "../../../lib/jobseekerApi";

export default function ApplicationHistory() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getMyApplications();
        setHistory(data || []);
      } catch (err) {
        console.error("Failed to load application history:", err);
      } finally {
        setLoading(false);
      }
    }
    loadApplications();
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        (item.job_title || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.company || "").toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || item.status?.toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [history, search, filter]);

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    reviewing: "bg-orange-100 text-orange-700",
    shortlisted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    hired: "bg-blue-100 text-blue-700",
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Loading history...</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Application History
        </h1>

        <p className="mt-2 text-gray-500">
          View all your previous job applications.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow">
          <Briefcase className="mb-3 text-cyan-600" size={30}/>
          <h2 className="text-3xl font-bold">{history.length}</h2>
          <p className="text-gray-500">Applications</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <Clock className="mb-3 text-orange-500" size={30}/>
          <h2 className="text-3xl font-bold">
            {history.filter(x=>x.status?.toLowerCase()==="pending").length}
          </h2>
          <p className="text-gray-500">Pending</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <CheckCircle className="mb-3 text-green-600" size={30}/>
          <h2 className="text-3xl font-bold">
            {history.filter(x=>x.status?.toLowerCase()==="shortlisted").length}
          </h2>
          <p className="text-gray-500">Shortlisted</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <XCircle className="mb-3 text-red-600" size={30}/>
          <h2 className="text-3xl font-bold">
            {history.filter(x=>x.status?.toLowerCase()==="rejected").length}
          </h2>
          <p className="text-gray-500">Rejected</p>
        </div>

      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 md:flex-row">

        <div className="relative flex-1">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search applications..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-cyan-500"
          />

        </div>

        <select
          value={filter}
          onChange={(e)=>setFilter(e.target.value)}
          className="rounded-xl border px-5 py-3 outline-none focus:border-cyan-500"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Reviewing">Reviewing</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
          <option value="Hired">Hired</option>
        </select>

      </div>

      {/* History List */}
      <div className="space-y-5">

        {filteredHistory.map((item)=>(
          <div
            key={item.id}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h2 className="text-xl font-bold text-gray-800">
                  {item.job_title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-5 text-gray-500">

                  <span className="flex items-center gap-2">
                    <Building2 size={16}/>
                    {item.company}
                  </span>

                  {item.location && (
                    <span className="flex items-center gap-2">
                      <MapPin size={16}/>
                      {item.location}
                    </span>
                  )}

                  <span className="flex items-center gap-2">
                    <CalendarDays size={16}/>
                    {new Date(item.applied_at).toLocaleDateString()}
                  </span>

                </div>

              </div>

              <div className="flex flex-col items-start gap-4 lg:items-end">

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${statusColor[item.status?.toLowerCase()] || "bg-gray-100 text-gray-700"}`}
                >
                  {item.status}
                </span>

                <Link
                  to={`/jobseeker/dashboard/applications/${item.id}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2 text-white transition hover:bg-cyan-700"
                >
                  <Eye size={18}/>
                  View Details
                </Link>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Empty State */}
      {filteredHistory.length===0 &&(
        <div className="rounded-2xl bg-white p-12 text-center shadow">
          <Briefcase
            className="mx-auto mb-4 text-gray-300"
            size={60}
          />

          <h2 className="text-xl font-semibold text-gray-700">
            No Applications Found
          </h2>

          <p className="mt-2 text-gray-500">
            Try changing your search or filter.
          </p>
        </div>
      )}

    </div>
  );
}