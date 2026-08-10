import { CalendarDays } from "lucide-react";

import AnalyticsPageHeader from "./components/AnalyticsPageHeader";
import KPIStatCard from "./components/KPIStatCard";
import ChartContainer from "./components/ChartContainer";

import eventAnalyticsData from "./data/eventAnalyticsData";

import EventTrendChart from "./charts/EventTrendChart";
import EventParticipationChart from "./charts/EventParticipationChart";
import EventTypeChart from "./charts/EventTypeChart";

const upcomingEvents = [
  {
    event: "Tech Career Fair 2026",
    date: "Aug 12",
    registered: 420,
  },
  {
    event: "React Workshop",
    date: "Aug 18",
    registered: 185,
  },
  {
    event: "Resume Writing Seminar",
    date: "Aug 24",
    registered: 132,
  },
  {
    event: "UI/UX Bootcamp",
    date: "Sep 02",
    registered: 276,
  },
  {
    event: "AI Career Summit",
    date: "Sep 14",
    registered: 508,
  },
];

export default function EventAnalytics() {
  return (
    <div className="space-y-6">
      <AnalyticsPageHeader
        title="Event Analytics"
        description="Track event growth, participation and event categories across the platform."
        icon={CalendarDays}
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {eventAnalyticsData.map((item) => (
          <KPIStatCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartContainer
          title="Monthly Events"
          subtitle="Events organized over time"
        >
          <EventTrendChart />
        </ChartContainer>

        <ChartContainer
          title="Monthly Participants"
          subtitle="Event attendance"
        >
          <EventParticipationChart />
        </ChartContainer>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <ChartContainer
          title="Event Types"
          subtitle="Distribution of event categories"
          height="h-96"
        >
          <EventTypeChart />
        </ChartContainer>

        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-lg font-semibold">
              Upcoming Events
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Events with the highest registrations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Registered
                  </th>
                </tr>
              </thead>

              <tbody>
                {upcomingEvents.map((event) => (
                  <tr key={event.event} className="border-t">
                    <td className="px-6 py-4 font-medium">
                      {event.event}
                    </td>

                    <td className="px-6 py-4">
                      {event.date}
                    </td>

                    <td className="px-6 py-4 font-semibold text-blue-600">
                      {event.registered}
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