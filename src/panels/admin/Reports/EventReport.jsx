import { CalendarDays, Download } from "lucide-react";

import ReportsPageHeader from "./components/ReportsPageHeader";
import ReportStatCard from "./components/ReportStatCard";
import ReportChartContainer from "./components/ReportChartContainer";
import ReportTable from "./components/ReportTable";

import UserReportChart from "./charts/UserReportChart";

const stats = [
  {
    title: "Total Events",
    value: "86",
    change: "+14%",
    icon: CalendarDays,
    color: "bg-cyan-500",
  },
  {
    title: "Upcoming",
    value: "18",
    change: "+6%",
    icon: CalendarDays,
    color: "bg-blue-500",
  },
  {
    title: "Completed",
    value: "68",
    change: "+11%",
    icon: CalendarDays,
    color: "bg-emerald-500",
  },
  {
    title: "Participants",
    value: "4,280",
    change: "+21%",
    icon: CalendarDays,
    color: "bg-violet-500",
  },
];

const columns = [
  { key: "event", label: "Event" },
  { key: "date", label: "Date" },
  { key: "participants", label: "Participants" },
  { key: "status", label: "Status" },
];

const data = [
  {
    event: "Career Expo 2026",
    date: "15 Aug 2026",
    participants: 850,
    status: "Upcoming",
  },
  {
    event: "Tech Job Fair",
    date: "05 Jul 2026",
    participants: 620,
    status: "Completed",
  },
  {
    event: "CV Writing Workshop",
    date: "20 Aug 2026",
    participants: 210,
    status: "Upcoming",
  },
];

export default function EventReport() {
  return (
    <div className="space-y-6">
      <ReportsPageHeader
        title="Event Reports"
        description="Monitor events, registrations and participant engagement."
        icon={CalendarDays}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <ReportStatCard key={item.title} {...item} />
        ))}
      </div>

      <ReportChartContainer
        title="Event Performance"
        subtitle="Monthly event activity"
      >
        <UserReportChart />
      </ReportChartContainer>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Event Report
        </h2>

        <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 dark:bg-slate-700">
          <Download size={18} />
          Export
        </button>
      </div>

      <ReportTable columns={columns} data={data} />
    </div>
  );
}
