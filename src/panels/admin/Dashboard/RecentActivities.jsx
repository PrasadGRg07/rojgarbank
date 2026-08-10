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
    color: "bg-blue-100 text-blue-600",
    title: "New user registered",
    description: "John Doe created an account",
    time: "5 min ago",
  },
  {
    id: 2,
    icon: Briefcase,
    color: "bg-orange-100 text-orange-600",
    title: "New job posted",
    description: "Frontend Developer at Tech Solutions",
    time: "20 min ago",
  },
  {
    id: 3,
    icon: FileText,
    color: "bg-purple-100 text-purple-600",
    title: "Application submitted",
    description: "Jane Smith applied for UI/UX Designer",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: Building2,
    color: "bg-green-100 text-green-600",
    title: "Employer approved",
    description: "Creative Studio has been verified",
    time: "2 hours ago",
  },
];

export default function RecentActivities() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Activities
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Latest activity across the platform.
        </p>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center ${activity.color}`}
              >
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {activity.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {activity.description}
                </p>
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}