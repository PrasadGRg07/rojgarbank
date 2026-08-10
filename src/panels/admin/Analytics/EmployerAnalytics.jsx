import {
  Building2,
  BadgeCheck,
  Clock3,
  Briefcase,
} from "lucide-react";

import AnalyticsPageHeader from "./components/AnalyticsPageHeader";
import KPIStatCard from "./components/KPIStatCard";
import ChartContainer from "./components/ChartContainer";

import EmployerGrowthChart from "./charts/EmployerGrowthChart";
import EmployerVerificationChart from "./charts/EmployerVerificationChart";
import IndustryChart from "./charts/IndustryChart";

import { topEmployers } from "./data/employerAnalyticsData";

const kpis = [
  {
    title: "Total Employers",
    value: "1,248",
    change: "+12%",
    trend: "up",
    icon: Building2,
    color: "bg-blue-600",
  },
  {
    title: "Verified",
    value: "1,026",
    change: "+8%",
    trend: "up",
    icon: BadgeCheck,
    color: "bg-green-600",
  },
  {
    title: "Pending Review",
    value: "152",
    change: "-2%",
    trend: "down",
    icon: Clock3,
    color: "bg-amber-500",
  },
  {
    title: "Active Job Posts",
    value: "3,562",
    change: "+15%",
    trend: "up",
    icon: Briefcase,
    color: "bg-purple-600",
  },
];

export default function EmployerAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <AnalyticsPageHeader
        title="Employer Analytics"
        description="Track employer registrations, verification status, hiring activity, and industry distribution."
        icon={Building2}
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
          title="Employer Growth"
          subtitle="Monthly employer registrations"
        >
          <EmployerGrowthChart />
        </ChartContainer>

        <ChartContainer
          title="Verification Status"
          subtitle="Verified, pending and rejected employers"
        >
          <EmployerVerificationChart />
        </ChartContainer>
      </div>

           {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Industry Chart */}
        <div className="xl:col-span-1">
          <ChartContainer
            title="Industry Distribution"
            subtitle="Employers by business sector"
          >
            <IndustryChart />
          </ChartContainer>
        </div>

        {/* Top Employers */}
        <div className="xl:col-span-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Top Employers
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Companies with the highest hiring activity.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Company
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Jobs
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Hires
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {topEmployers.map((company) => (
                  <tr
                    key={company.id}
                    className="border-t border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {company.company}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {company.jobs}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {company.hires}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          company.status === "Verified"
                            ? "bg-green-100 text-green-700"
                            : company.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {company.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}