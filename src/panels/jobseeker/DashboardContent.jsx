import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Bookmark,
  CalendarDays,
  Award,
} from "lucide-react";

import StatCard from "./components/StatCard";
import ProfileCompletion from "./components/ProfileCompletion";
import JobCard from "./components/JobCard";
import ApplicationCard from "./components/ApplicationCard";
import NotificationCard from "./components/NotificationCard";
import { getMyApplications } from "../../lib/jobseekerApi";

export default function DashboardContent() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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

  // Filter out any other custom states for count if needed, or count shortlisted/interview status
  const interviewCount = applications.filter(
    (x) => x.status?.toLowerCase() === "interview" || x.status?.toLowerCase() === "shortlisted"
  ).length;

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Applied Jobs"
          value={String(applications.length)}
          icon={Briefcase}
          color="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Saved Jobs"
          value="0"
          icon={Bookmark}
          color="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Interviews / Shortlisted"
          value={String(interviewCount)}
          icon={CalendarDays}
          color="bg-orange-100"
          iconColor="text-orange-600"
        />

        <StatCard
          title="Profile Score"
          value="100%"
          icon={Award}
          color="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Profile + Recommended Jobs */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left */}
        <div>
          <ProfileCompletion />
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-5">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Recommended Jobs
            </h2>

            <button className="text-blue-600 hover:underline">
              View All
            </button>
          </div>

          <JobCard
            title="Frontend Developer"
            company="Rojgar Bank Pvt. Ltd."
            location="Kathmandu"
            salary="NPR 60,000/month"
            type="Full-Time"
            posted="2 days ago"
            logo="https://via.placeholder.com/80"
          />

          <JobCard
            title="Backend Developer"
            company="ABC Technologies"
            location="Lalitpur"
            salary="NPR 75,000/month"
            type="Remote"
            posted="Today"
            logo="https://via.placeholder.com/80"
          />

        </div>
      </div>

      {/* Applications + Notifications */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Applications */}
        <div className="space-y-5">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Recent Applications
            </h2>

            <button 
              onClick={() => navigate("/jobseeker/dashboard/applications")}
              className="text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>

          {applications.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500 shadow-sm">
              No applications yet.
            </div>
          ) : (
            applications.slice(0, 3).map((app) => (
              <ApplicationCard
                key={app.id}
                title={app.job_title}
                company={app.company}
                logo={app.logo}
                appliedDate={new Date(app.applied_at).toLocaleDateString()}
                status={app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Pending"}
                onView={() => navigate(`/jobseeker/dashboard/applications/${app.id}`)}
              />
            ))
          )}

        </div>

        {/* Notifications */}
        <div className="space-y-5">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Recent Notifications
            </h2>

            <button className="text-blue-600 hover:underline">
              View All
            </button>
          </div>

          <NotificationCard
            title="Application Updated"
            message="Check the applied jobs tab to see your current application status updates."
            time="Just now"
            type="application"
            unread
          />

          <NotificationCard
            title="Welcome to Rojgar Bank"
            message="Your account setup is complete. Start applying for jobs today!"
            time="Recently"
            type="info"
          />

        </div>

      </div>

    </div>
  );
}