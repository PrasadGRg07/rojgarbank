import { FileText } from "lucide-react";

import AnalyticsPageHeader from "./components/AnalyticsPageHeader";
import KPIStatCard from "./components/KPIStatCard";
import ChartContainer from "./components/ChartContainer";

import applicationAnalyticsData from "./data/applicationAnalyticsData";

import ApplicationTrendChart from "./charts/ApplicationTrendChart";
import ApplicationStatusChart from "./charts/ApplicationStatusChart";
import HiringFunnelChart from "./charts/HiringFunnelChart";

const topCompanies = [
  {
    company: "ABC Technologies",
    applications: 2450,
    hired: 185,
  },
  {
    company: "Rojgar Solutions",
    applications: 1980,
    hired: 152,
  },
  {
    company: "Tech Nepal",
    applications: 1755,
    hired: 134,
  },
  {
    company: "Future Soft",
    applications: 1420,
    hired: 118,
  },
  {
    company: "Global IT",
    applications: 1210,
    hired: 96,
  },
];

export default function ApplicationAnalytics() {
  return (
    <div className="space-y-6">
      <AnalyticsPageHeader
        title="Application Analytics"
        description="Monitor application volume, hiring funnel, acceptance rates and company hiring performance."
        icon={FileText}
      />

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {applicationAnalyticsData.map((item) => (
          <KPIStatCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartContainer
          title="Monthly Applications"
          subtitle="Applications received over the last six months"
        >
          <ApplicationTrendChart />
        </ChartContainer>

        <ChartContainer
          title="Application Status"
          subtitle="Accepted, Pending and Rejected"
        >
          <ApplicationStatusChart />
        </ChartContainer>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 xl:grid-cols-3">
        <ChartContainer
          title="Hiring Funnel"
          subtitle="Application conversion pipeline"
          height="h-96"
        >
          <HiringFunnelChart />
        </ChartContainer>

        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-lg font-semibold">
              Top Hiring Companies
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Companies with the highest hiring activity.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Company
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Applications
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Hired
                  </th>
                </tr>
              </thead>

              <tbody>
                {topCompanies.map((company) => (
                  <tr
                    key={company.company}
                    className="border-t"
                  >
                    <td className="px-6 py-4">
                      {company.company}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {company.applications}
                    </td>

                    <td className="px-6 py-4 font-semibold text-green-600">
                      {company.hired}
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