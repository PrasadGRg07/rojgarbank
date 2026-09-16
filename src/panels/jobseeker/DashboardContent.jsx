import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Bookmark,
  CalendarDays,
  Award,

  TrendingUp,
  Activity,
  ChevronRight,
  Search,
  Rocket
} from "lucide-react";

import StatCard from "./components/StatCard";
import { getMyApplications } from "../../lib/jobseekerApi";

export default function DashboardContent() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Try to get user from local storage for the welcome banner
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch (e) {
      console.error(e);
    }

    async function loadApplications() {
      try {
        const data = await getMyApplications();
        setApplications(data || []);
      } catch (err) {
        console.error("Failed to load dashboard applications:", err);
      } finally {
        setLoading(false);
      }
    }
    loadApplications();
  }, []);

  const interviewCount = applications.filter(
    (x) => x.status?.toLowerCase() === "interview" || x.status?.toLowerCase() === "shortlisted"
  ).length;

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const firstName = user?.first_name || "Jobseeker";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-8 text-white shadow-lg">
        <div className="relative z-10 md:w-2/3">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              Dashboard Overview
            </span>
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="mb-6 text-blue-100">
            Here's what is happening with your job applications and career progress today. Keep up the great work!
          </p>
          <button
            onClick={() => navigate("/jobseeker/dashboard/jobs/search")}
            className="group flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition-all hover:bg-blue-50 hover:shadow-md"
          >
            <Search className="h-4 w-4" />
            Explore New Jobs
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Applied Jobs"
          value={String(applications.length)}
          icon={Briefcase}
          color="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Saved Jobs"
          value="0"
          icon={Bookmark}
          color="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        <StatCard
          title="Interviews"
          value={String(interviewCount)}
          icon={CalendarDays}
          color="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Profile Views"
          value="12"
          icon={Activity}
          color="bg-pink-50"
          iconColor="text-pink-600"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Activity & Applications (Takes up 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Recent Activity
            </h2>
            <button
              onClick={() => navigate("/jobseeker/dashboard/applications")}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              View all applications
            </button>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            {applications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Rocket className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-800">No applications yet</h3>
                <p className="mb-6 max-w-sm text-sm text-gray-500">
                  You haven't applied to any jobs yet. Start exploring opportunities that match your skills.
                </p>
                <button
                  onClick={() => navigate("/jobseeker/dashboard/jobs/search")}
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 shadow-sm"
                >
                  Browse Jobs
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {applications.slice(0, 4).map((app) => (
                  <div key={app.id} className="group flex items-center justify-between p-5 transition-colors hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/jobseeker/dashboard/applications/${app.id}`)}>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                        {app.logo ? (
                          <img src={app.logo} alt={app.company} className="h-full w-full object-cover" />
                        ) : (
                          <Briefcase className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{app.job_title}</h4>
                        <p className="text-sm text-gray-500">{app.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${app.status?.toLowerCase() === 'interview' ? 'bg-purple-100 text-purple-700' :
                          app.status?.toLowerCase() === 'shortlisted' ? 'bg-green-100 text-green-700' :
                            app.status?.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'}`}
                      >
                        {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Pending"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(app.applied_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Insights (Takes up 1 col) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">

            Market Insights
          </h2>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-gray-800 uppercase tracking-wider">Top Skills in Demand</h3>
            <div className="flex flex-wrap gap-2">
              {['React.js', 'Python', 'Node.js', 'AWS', 'UI/UX Design', 'SQL'].map(skill => (
                <span key={skill} className="rounded-lg bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-100 cursor-default transition-colors">
                  {skill}
                </span>
              ))}
            </div>

            <div className="my-6 h-px w-full bg-gray-100"></div>

            <h3 className="mb-4 text-sm font-bold text-gray-800 uppercase tracking-wider">Suggested For You</h3>
            <div className="space-y-4">
              {[
                { title: "Senior React Developer", company: "TechNova", salary: "NPR 120k+" },
                { title: "Frontend Engineer", company: "NextGen Solutions", salary: "NPR 80k+" }
              ].map((job, i) => (
                <div key={i} className="group cursor-pointer rounded-xl border border-gray-100 p-4 transition-all hover:border-blue-200 hover:shadow-md bg-gradient-to-br from-white to-gray-50/50">
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                  <p className="text-sm text-gray-500">{job.company}</p>
                  <p className="mt-2 text-xs font-medium text-green-600">{job.salary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}