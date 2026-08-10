import {
  Users,
  UserCheck,
  UserPlus,
  Activity,
} from "lucide-react";

import AnalyticsPageHeader from "./components/AnalyticsPageHeader";
import KPIStatCard from "./components/KPIStatCard";
import ChartContainer from "./components/ChartContainer";

import RegistrationChart from "./charts/RegistrationChart";
import ActiveUsersChart from "./charts/ActiveUsersChart";
import UserRoleChart from "./charts/UserRoleChart";
import GenderChart from "./charts/GenderChart";

import { latestUsers } from "./data/userAnalyticsData";

const kpis = [
  {
    title: "Total Users",
    value: "12,540",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "bg-blue-600",
  },
  {
    title: "Active Users",
    value: "9,420",
    change: "+8%",
    trend: "up",
    icon: Activity,
    color: "bg-green-600",
  },
  {
    title: "New This Month",
    value: "1,284",
    change: "+18%",
    trend: "up",
    icon: UserPlus,
    color: "bg-purple-600",
  },
  {
    title: "Verified Users",
    value: "8,950",
    change: "+6%",
    trend: "up",
    icon: UserCheck,
    color: "bg-orange-500",
  },
];

export default function UserAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <AnalyticsPageHeader
        title="User Analytics"
        description="Monitor registrations, active users, user demographics and platform growth."
        icon={Users}
      />

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <KPIStatCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartContainer
          title="Monthly User Registration"
          subtitle="New user registrations during the last six months"
        >
          <RegistrationChart />
        </ChartContainer>

        <ChartContainer
          title="Active Users"
          subtitle="Monthly active users"
        >
          <ActiveUsersChart />
        </ChartContainer>
      </div>

            {/* Bottom Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartContainer
          title="User Role Distribution"
          subtitle="Platform user categories"
        >
          <UserRoleChart />
        </ChartContainer>

        <ChartContainer
          title="Gender Distribution"
          subtitle="Registered users by gender"
        >
          <GenderChart />
        </ChartContainer>
      </div>

      {/* Latest Users */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Latest Registered Users
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recently joined users on the platform.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Joined
                </th>
              </tr>
            </thead>

            <tbody>
              {latestUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-100 transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role === "Employer"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {user.joined}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}