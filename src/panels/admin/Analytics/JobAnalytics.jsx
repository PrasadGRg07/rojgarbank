import { Briefcase } from "lucide-react";

import AnalyticsPageHeader from "./components/AnalyticsPageHeader";
import KPIStatCard from "./components/KPIStatCard";
import ChartContainer from "./components/ChartContainer";

import jobAnalyticsData from "./data/jobAnalyticsData";

import JobTrendChart from "./charts/JobTrendChart";
import JobCategoryChart from "./charts/JobCategoryChart";
import JobStatusChart from "./charts/JobStatusChart";

const topCategories = [
  {
    category: "Information Technology",
    jobs: 1240,
    applications: 8650,
  },
  {
    category: "Finance",
    jobs: 845,
    applications: 5210,
  },
  {
    category: "Marketing",
    jobs: 642,
    applications: 4135,
  },
  {
    category: "Human Resources",
    jobs: 438,
    applications: 2860,
  },
  {
    category: "Design",
    jobs: 325,
    applications: 1780,
  },
];

export default function JobAnalytics() {
  return (
    <div className="space-y-6">
      <AnalyticsPageHeader
        title="Job Analytics"
        description="Track job postings, categories, approval status and platform hiring trends."
        icon={Briefcase}
      />

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {jobAnalyticsData.map((item) => (
          <KPIStatCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartContainer
          title="Monthly Job Trend"
          subtitle="Jobs posted during the last six months"
        >
          <JobTrendChart />
        </ChartContainer>

        <ChartContainer
          title="Job Categories"
          subtitle="Most active hiring categories"
        >
          <JobCategoryChart />
        </ChartContainer>
      </div>

      {/* Bottom */}
      <div className="grid gap-6 xl:grid-cols-3">
        <ChartContainer
          title="Job Status"
          subtitle="Current status distribution"
          height="h-96"
        >
          <JobStatusChart />
        </ChartContainer>

        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-lg font-semibold">
              Top Job Categories
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Highest performing categories by jobs and applications.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Category
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Jobs
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Applications
                  </th>
                </tr>
              </thead>

              <tbody>
                {topCategories.map((item) => (
                  <tr
                    key={item.category}
                    className="border-t"
                  >
                    <td className="px-6 py-4">
                      {item.category}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {item.jobs}
                    </td>

                    <td className="px-6 py-4 text-blue-600 font-semibold">
                      {item.applications}
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