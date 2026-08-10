import {
  Users,
  Building2,
  Briefcase,
  FileText,
} from "lucide-react";

import StatCard from "../components/StatCard";

const stats = [
  {
    title: "Total Users",
    value: "1,250",
    subtitle: "Registered job seekers",
    icon: Users,
    color: "bg-blue-600",
  },
  {
    title: "Employers",
    value: "86",
    subtitle: "Verified companies",
    icon: Building2,
    color: "bg-emerald-600",
  },
  {
    title: "Active Jobs",
    value: "340",
    subtitle: "Currently published",
    icon: Briefcase,
    color: "bg-orange-500",
  },
  {
    title: "Applications",
    value: "1,842",
    subtitle: "Applications received",
    icon: FileText,
    color: "bg-purple-600",
  },
];

export default function DashboardStats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </section>
  );
}