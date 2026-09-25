import { Users, Building2, Briefcase, FileText } from "lucide-react";

import MetricCard from "./MetricCard";

const stats = [
  {
    title: "Total Users",
    value: "1,250",
    subtitle: "Registered job seekers",
    trend: "+12.4%",
    icon: Users,
    accent: "bg-blue-600",
    tint: "bg-blue-50 text-blue-600",
  },
  {
    title: "Employers",
    value: "86",
    subtitle: "Verified companies",
    trend: "+3.1%",
    icon: Building2,
    accent: "bg-emerald-600",
    tint: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Active Jobs",
    value: "340",
    subtitle: "Currently published",
    trend: "+8.7%",
    icon: Briefcase,
    accent: "bg-orange-500",
    tint: "bg-orange-50 text-orange-600",
  },
  {
    title: "Applications",
    value: "1,842",
    subtitle: "Applications received",
    trend: "-2.3%",
    icon: FileText,
    accent: "bg-purple-600",
    tint: "bg-purple-50 text-purple-600",
  },
];

export default function DashboardStats() {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <MetricCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          trend={stat.trend}
          icon={stat.icon}
          accent={stat.accent}
          tint={stat.tint}
        />
      ))}
    </section>
  );
}
