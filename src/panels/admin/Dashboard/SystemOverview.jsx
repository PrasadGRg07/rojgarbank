import {
  Users,
  Building2,
  Briefcase,
  BookOpen,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

const overview = [
  {
    title: "Users",
    value: 1250,
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Employers",
    value: 86,
    icon: Building2,
    color: "text-emerald-600",
  },
  {
    title: "Jobs",
    value: 340,
    icon: Briefcase,
    color: "text-orange-500",
  },
  {
    title: "Blogs",
    value: 42,
    icon: BookOpen,
    color: "text-purple-600",
  },
  {
    title: "Events",
    value: 18,
    icon: CalendarDays,
    color: "text-pink-600",
  },
  {
    title: "Training",
    value: 12,
    icon: GraduationCap,
    color: "text-indigo-600",
  },
];

export default function SystemOverview() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          System Overview
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Overall platform summary.
        </p>
      </div>

      <div className="space-y-4">
        {overview.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className={`${item.color} bg-gray-100 p-2 rounded-lg`}>
                  <Icon size={20} />
                </div>

                <span className="font-medium text-gray-700">
                  {item.title}
                </span>
              </div>

              <span className="text-lg font-bold text-gray-800">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}