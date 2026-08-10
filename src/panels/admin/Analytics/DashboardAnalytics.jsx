import {
  Users,
  Building2,
  Briefcase,
  FileText,
  TrendingUp,
} from "lucide-react";

import AnalyticsPageHeader from "./components/AnalyticsPageHeader";
import KPIStatCard from "./components/KPIStatCard";
import ChartContainer from "./components/ChartContainer";

import UserGrowthChart from "./charts/UserGrowthChart";
import JobTrendChart from "./charts/JobTrendChart";
import ApplicationPieChart from "./charts/ApplicationPieChart";
import TrafficChart from "./charts/TrafficChart";

import { recentActivities } from "./data/dashboardData";

const stats = [
  {
    title: "Total Users",
    value: "12,540",
    change: "+12%",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Employers",
    value: "1,245",
    change: "+8%",
    icon: Building2,
    color: "bg-violet-500",
  },
  {
    title: "Active Jobs",
    value: "3,560",
    change: "+15%",
    icon: Briefcase,
    color: "bg-emerald-500",
  },
  {
    title: "Applications",
    value: "18,920",
    change: "+20%",
    icon: FileText,
    color: "bg-orange-500",
  },
];

export default function DashboardAnalytics() {
  return (
    <div className="space-y-6">

      <AnalyticsPageHeader
        title="Dashboard Analytics"
        description="Monitor overall platform performance, user growth, jobs, applications and platform traffic."
        icon={TrendingUp}
      />

      {/* KPI Cards */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <KPIStatCard
            key={item.title}
            title={item.title}
            value={item.value}
            change={item.change}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      {/* Top Charts */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ChartContainer
          title="User Growth"
          subtitle="Monthly registered users"
        >
          <UserGrowthChart />
        </ChartContainer>

        <ChartContainer
          title="Jobs Posted"
          subtitle="Monthly job posting trend"
        >
          <JobTrendChart />
        </ChartContainer>

      </div>

      {/* Bottom Charts */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ChartContainer
          title="Application Status"
          subtitle="Current application distribution"
        >
          <ApplicationPieChart />
        </ChartContainer>

        <ChartContainer
          title="Traffic Sources"
          subtitle="Platform visitors by source"
        >
          <TrafficChart />
        </ChartContainer>

      </div>

      {/* Recent Activities */}

      <ChartContainer
        title="Recent Activities"
        subtitle="Latest platform activities"
        height="h-auto"
      >
        <div className="w-full space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col gap-2 border-b border-gray-100 pb-4 last:border-none last:pb-0 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-medium text-gray-900">
                  {activity.title}
                </h3>
              </div>

              <span className="text-sm text-gray-500">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </ChartContainer>

    </div>
  );
}