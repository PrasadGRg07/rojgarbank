import { Globe } from "lucide-react";

import AnalyticsPageHeader from "./components/AnalyticsPageHeader";
import KPIStatCard from "./components/KPIStatCard";
import ChartContainer from "./components/ChartContainer";

import trafficAnalyticsData from "./data/trafficAnalyticsData";

import TrafficVisitorsChart from "./charts/TrafficVisitorsChart";
import TrafficDeviceChart from "./charts/TrafficDeviceChart";
import TrafficSourceChart from "./charts/TrafficSourceChart";

const topPages = [
  {
    page: "/jobs",
    visitors: "92,450",
    bounce: "31%",
  },
  {
    page: "/blogs",
    visitors: "74,210",
    bounce: "36%",
  },
  {
    page: "/training",
    visitors: "53,820",
    bounce: "28%",
  },
  {
    page: "/events",
    visitors: "41,260",
    bounce: "25%",
  },
  {
    page: "/",
    visitors: "128,540",
    bounce: "22%",
  },
];

export default function TrafficAnalytics() {
  return (
    <div className="space-y-6">
      <AnalyticsPageHeader
        title="Traffic Analytics"
        description="Analyze website visitors, traffic sources, device usage and page performance."
        icon={Globe}
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {trafficAnalyticsData.map((item) => (
          <KPIStatCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartContainer
          title="Visitor Growth"
          subtitle="Monthly visitor trend"
        >
          <TrafficVisitorsChart />
        </ChartContainer>

        <ChartContainer
          title="Device Usage"
          subtitle="Desktop vs Mobile"
        >
          <TrafficDeviceChart />
        </ChartContainer>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <ChartContainer
          title="Traffic Sources"
          subtitle="Where users come from"
          height="h-96"
        >
          <TrafficSourceChart />
        </ChartContainer>

        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-lg font-semibold">
              Top Pages
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Most visited pages on the platform.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Visitors
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Bounce Rate
                  </th>
                </tr>
              </thead>

              <tbody>
                {topPages.map((page) => (
                  <tr
                    key={page.page}
                    className="border-t"
                  >
                    <td className="px-6 py-4 font-medium">
                      {page.page}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {page.visitors}
                    </td>

                    <td className="px-6 py-4 text-red-500 font-semibold">
                      {page.bounce}
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