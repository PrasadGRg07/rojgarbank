import React from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import {
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  Star,
  ChevronRight,
  Plus,
  Sparkles,
} from "lucide-react";

function StatCard({ label, value, icon: Icon, gradient, trend }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg ${gradient}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{label}</p>
          <h3 className="mt-1 text-4xl font-bold tracking-tight">{value}</h3>
          {trend && (
            <p className="mt-2 flex items-center gap-1 text-xs text-white/70">
              <TrendingUp size={12} />
              {trend}
            </p>
          )}
        </div>
        <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    shortlisted: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    rejected: "bg-red-100 text-red-700",
    interview: "bg-purple-100 text-purple-700",
  };
  const key = status?.toLowerCase() || "pending";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[key] || "bg-slate-100 text-slate-700"}`}>
      {status || "Pending"}
    </span>
  );
}

export default function DashboardContent() {
  const { dashboardData, user } = useOutletContext();
  const navigate = useNavigate();

  const firstName = user?.first_name || user?.name || user?.username || "there";

  const stats = [
    {
      label: "Total Jobs Posted",
      value: dashboardData?.total_jobs ?? 0,
      icon: Briefcase,
      gradient: "bg-blue-900",
      trend: "All your active job listings",
    },
    {
      label: "Active Jobs",
      value: dashboardData?.active_jobs ?? 0,
      icon: Star,
      gradient: "bg-sky-600",
      trend: "Currently accepting applications",
    },
    {
      label: "Total Applicants",
      value: dashboardData?.total_applicants ?? 0,
      icon: Users,
      gradient: "bg-blue-700",
      trend: "Across all your jobs",
    },
    {
      label: "Shortlisted",
      value: dashboardData?.shortlisted_applicants ?? 0,
      icon: CheckCircle,
      gradient: "bg-sky-500",
      trend: "Candidates shortlisted",
    },
  ];

  const recentApps = dashboardData?.recent_applications || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-blue-900 p-8 text-white shadow-xl">
        <div className="relative z-10">
          <div className="mb-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              Employer Dashboard
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="mt-2 max-w-lg text-slate-400">
            Here's your recruitment overview for today. Manage your job postings, review candidates, and track your hiring pipeline.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/employee/dashboard/jobs/create")}
              className="group flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 shadow"
            >
              <Plus size={16} />
              Post a New Job
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate("/employee/dashboard/search-candidates")}
              className="group flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Users size={16} />
              Search Candidates
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent Applications */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <Clock size={18} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Recent Applications</h2>
          </div>
          <button
            onClick={() => navigate("/employee/dashboard/jobs")}
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            View All Jobs
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Position</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Applied On</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentApps.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="rounded-full bg-slate-100 p-4">
                        <Users size={28} className="text-slate-400" />
                      </div>
                      <p className="font-semibold text-slate-600">No applications yet</p>
                      <p className="text-sm text-slate-400">Post a job to start receiving applications.</p>
                      <button
                        onClick={() => navigate("/employee/dashboard/jobs/create")}
                        className="mt-1 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                      >
                        Post Your First Job
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                recentApps.map((app) => (
                  <tr key={app.id} className="group transition-colors hover:bg-blue-50/40">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-bold text-white shrink-0">
                          {(app.name || "A").charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-slate-800 group-hover:text-blue-700 transition">{app.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{app.position}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{app.date}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={app.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Manage Jobs", desc: "Edit, pause or close your listings", icon: Briefcase, path: "/employee/dashboard/jobs", color: "blue" },
          { label: "Search Candidates", desc: "Browse jobseeker profiles", icon: Users, path: "/employee/dashboard/search-candidates", color: "violet" },
          { label: "ATS Pipeline", desc: "Track your hiring funnel", icon: TrendingUp, path: "/employee/dashboard/ats/pipeline", color: "emerald" },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <div className={`rounded-xl p-3 transition group-hover:scale-110 ${
              action.color === "blue" ? "bg-blue-50 text-blue-600" :
              action.color === "violet" ? "bg-violet-50 text-violet-600" :
              "bg-emerald-50 text-emerald-600"
            }`}>
              <action.icon size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800">{action.label}</p>
              <p className="truncate text-sm text-slate-500">{action.desc}</p>
            </div>
            <ChevronRight size={18} className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500" />
          </button>
        ))}
      </div>
    </div>
  );
}