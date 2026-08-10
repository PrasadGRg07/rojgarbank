import { Activity, ShieldAlert, LogIn, Server } from "lucide-react";

import AuditPageHeader from "./components/AuditPageHeader";
import AuditStatCard from "./components/AuditStatCard";
import AuditChartContainer from "./components/AuditChartContainer";

import AuditActivityChart from "./charts/AuditActivityChart";
import LoginTrendChart from "./charts/LoginTrendChart";
import SecurityRiskChart from "./charts/SecurityRiskChart";
import SystemHealthChart from "./charts/SystemHealthChart";

import { recentAuditActivities } from "./data/auditDashboardData";

const stats = [
  {
    title: "Total Activities",
    value: "25,430",
    change: "+18%",
    icon: Activity,
    color: "bg-blue-500",
  },
  {
    title: "Login Attempts",
    value: "8,920",
    change: "+10%",
    icon: LogIn,
    color: "bg-violet-500",
  },
  {
    title: "Security Alerts",
    value: "34",
    change: "-5%",
    icon: ShieldAlert,
    color: "bg-red-500",
  },
  {
    title: "System Events",
    value: "1,240",
    change: "+12%",
    icon: Server,
    color: "bg-emerald-500",
  },
];

export default function AuditLogs() {
  return (
    <div className="space-y-6">
      <AuditPageHeader
        title="Audit Dashboard"
        description="Monitor user activities, security events, login history and system operations."
        icon={ShieldAlert}
      />

      {/* KPI */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <AuditStatCard key={item.title} {...item} />
        ))}
      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AuditChartContainer
          title="Activity Overview"
          subtitle="Daily platform activities"
        >
          <AuditActivityChart />
        </AuditChartContainer>

        <AuditChartContainer
          title="Login Trends"
          subtitle="Successful and failed login attempts"
        >
          <LoginTrendChart />
        </AuditChartContainer>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AuditChartContainer
          title="Security Risk"
          subtitle="Security events by severity"
        >
          <SecurityRiskChart />
        </AuditChartContainer>

        <AuditChartContainer
          title="System Health"
          subtitle="System event monitoring"
        >
          <SystemHealthChart />
        </AuditChartContainer>
      </div>

      {/* Recent Activities */}

      <AuditChartContainer
        title="Recent Audit Activities"
        subtitle="Latest platform actions"
        height="h-auto"
      >
        <div className="space-y-4">
          {recentAuditActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col gap-2 border-b pb-4 last:border-none md:flex-row md:items-center md:justify-between"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                {activity.title}
              </h3>

              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </AuditChartContainer>
    </div>
  );
}
