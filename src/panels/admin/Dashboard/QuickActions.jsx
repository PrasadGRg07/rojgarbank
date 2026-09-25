import {
  Briefcase,
  BookOpen,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

import ActionCard from "../components/ActionCard";

const actions = [
  {
    title: "Add Job",
    description: "Create and publish a new job.",
    icon: Briefcase,
    tint: "bg-blue-50 text-blue-600",
    path: "/admin/dashboard/jobs/create",
  },
  {
    title: "Create Blog",
    description: "Write and publish a blog.",
    icon: BookOpen,
    tint: "bg-emerald-50 text-emerald-600",
    path: "/admin/dashboard/blogs/create",
  },
  {
    title: "Create Event",
    description: "Schedule a new event.",
    icon: CalendarDays,
    tint: "bg-orange-50 text-orange-600",
    path: "/admin/dashboard/events/create",
  },
  {
    title: "Add Training",
    description: "Create a training program.",
    icon: GraduationCap,
    tint: "bg-purple-50 text-purple-600",
    path: "/admin/dashboard/training/create",
  },
];

export default function QuickActions() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-800">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used admin shortcuts.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <ActionCard
            key={action.title}
            title={action.title}
            description={action.description}
            icon={action.icon}
            tint={action.tint}
            path={action.path}
          />
        ))}
      </div>
    </section>
  );
}
