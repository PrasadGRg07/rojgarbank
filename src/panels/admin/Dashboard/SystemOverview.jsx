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
    tint: "bg-blue-50 text-blue-600",
    bar: "bg-blue-500",
  },
  {
    title: "Employers",
    value: 86,
    icon: Building2,
    tint: "bg-emerald-50 text-emerald-600",
    bar: "bg-emerald-500",
  },
  {
    title: "Jobs",
    value: 340,
    icon: Briefcase,
    tint: "bg-orange-50 text-orange-600",
    bar: "bg-orange-500",
  },
  {
    title: "Blogs",
    value: 42,
    icon: BookOpen,
    tint: "bg-purple-50 text-purple-600",
    bar: "bg-purple-500",
  },
  {
    title: "Events",
    value: 18,
    icon: CalendarDays,
    tint: "bg-pink-50 text-pink-600",
    bar: "bg-pink-500",
  },
  {
    title: "Training",
    value: 12,
    icon: GraduationCap,
    tint: "bg-indigo-50 text-indigo-600",
    bar: "bg-indigo-500",
  },
];

export default function SystemOverview() {
  const max = Math.max(...overview.map((item) => item.value));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-800">
          System Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overall platform summary.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-1">
        {overview.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.title} className="min-w-0">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.tint}`}
                >
                  <Icon size={18} />
                </div>

                <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">
                  {item.title}
                </span>

                <span className="shrink-0 text-base font-bold tabular-nums text-slate-800">
                  {item.value.toLocaleString()}
                </span>
              </div>

              <div className="mt-2 pl-12">
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${item.bar}`}
                    style={{ width: `${(item.value / max) * 100}%` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
