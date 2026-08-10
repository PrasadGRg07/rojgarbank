import { Bell, Search } from "lucide-react";
import NotificationCard from "../components/NotificationCard";

const notifications = [
  {
    id: 1,
    title: "Interview Scheduled",
    message: "Your interview with Fusemachines Nepal is tomorrow at 10:00 AM.",
    time: "2 hours ago",
    type: "interview",
    unread: true,
  },
  {
    id: 2,
    title: "Application Reviewed",
    message: "Your application has moved to the Interview stage.",
    time: "Yesterday",
    type: "application",
    unread: false,
  },
  {
    id: 3,
    title: "New Job Recommendation",
    message: "A new Frontend Developer job matches your profile.",
    time: "2 days ago",
    type: "job",
    unread: true,
  },
  {
    id: 4,
    title: "Resume Viewed",
    message: "ABC Technologies viewed your resume.",
    time: "3 days ago",
    type: "resume",
    unread: false,
  },
];

export default function NotificationList() {
      return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-100 p-3">
            <Bell size={28} className="text-cyan-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Notifications
            </h1>

            <p className="text-slate-500">
              Stay updated with your applications and job activities.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search notifications..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />

        </div>

      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">

        <button className="rounded-full bg-cyan-600 px-5 py-2 text-sm font-semibold text-white">
          All
        </button>

        <button className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm transition hover:bg-slate-100">
          Unread
        </button>

        <button className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm transition hover:bg-slate-100">
          Interviews
        </button>

        <button className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm transition hover:bg-slate-100">
          Applications
        </button>

      </div>

      {/* Notifications */}
      <div className="space-y-4">        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            title={notification.title}
            message={notification.message}
            time={notification.time}
            type={notification.type}
            unread={notification.unread}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5 text-center">
        <h3 className="text-lg font-semibold text-cyan-700">
          You're all caught up! 🎉
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          We'll notify you when employers review your applications,
          schedule interviews, or when new jobs match your profile.
        </p>
      </div>

    </div>
  );
}