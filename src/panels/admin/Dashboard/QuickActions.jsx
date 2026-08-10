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
    color: "bg-blue-600",
    path: "/admin/dashboard/jobs/create",
  },
  {
    title: "Create Blog",
    description: "Write and publish a blog.",
    icon: BookOpen,
    color: "bg-emerald-600",
    path: "/admin/dashboard/blogs/create",
  },
  {
    title: "Create Event",
    description: "Schedule a new event.",
    icon: CalendarDays,
    color: "bg-orange-500",
    path: "/admin/dashboard/events/create",
  },
  {
    title: "Add Training",
    description: "Create a training program.",
    icon: GraduationCap,
    color: "bg-purple-600",
    path: "/admin/dashboard/training/create",
  },
];

export default function QuickActions() {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Quick Actions
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Frequently used admin shortcuts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {actions.map((action) => (
          <ActionCard
            key={action.title}
            title={action.title}
            description={action.description}
            icon={action.icon}
            color={action.color}
            path={action.path}
          />
        ))}
      </div>
    </section>
  );
}