import {
  UserPlus,
  Briefcase,
  FileText,
  Building2,
} from "lucide-react";

const activities = [
  {
    id: 1,
    icon: UserPlus,
    tint: "bg-blue-50 text-blue-600",
    title: "New user registered",
    description: "John Doe created an account",
    time: "5 min ago",
  },
  {
    id: 2,
    icon: Briefcase,
    tint: "bg-orange-50 text-orange-600",
    title: "New job posted",
    description: "Frontend Developer at Tech Solutions",
    time: "20 min ago",
  },
  {
    id: 3,
    icon: FileText,
    tint: "bg-purple-50 text-purple-600",
    title: "Application submitted",
    description: "Jane Smith applied for UI/UX Designer",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: Building2,
    tint: "bg-emerald-50 text-emerald-600",
    title: "Employer approved",
    description: "Creative Studio has been verified",
    time: "2 hours ago",
  },
];

export default function RecentActivities() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-800">
          Recent Activities
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest activity across the platform.
        </p>
      </div>

      <ul className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <li key={activity.id} className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activity.tint}`}
              >
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {activity.title}
                  </h3>

                  <span className="shrink-0 text-xs whitespace-nowrap text-slate-400">
                    {activity.time}
                  </span>
                </div>

                <p className="text-sm break-words text-slate-500">
                  {activity.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
