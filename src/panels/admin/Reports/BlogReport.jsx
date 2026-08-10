import { BookOpen, Download } from "lucide-react";

import ReportsPageHeader from "./components/ReportsPageHeader";
import ReportStatCard from "./components/ReportStatCard";
import ReportChartContainer from "./components/ReportChartContainer";
import ReportTable from "./components/ReportTable";

import UserReportChart from "./charts/UserReportChart";

const stats = [
  {
    title: "Published Blogs",
    value: "248",
    change: "+12%",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    title: "Draft Blogs",
    value: "36",
    change: "+5%",
    icon: BookOpen,
    color: "bg-orange-500",
  },
  {
    title: "Total Views",
    value: "98.4K",
    change: "+18%",
    icon: BookOpen,
    color: "bg-emerald-500",
  },
  {
    title: "Comments",
    value: "3,245",
    change: "+9%",
    icon: BookOpen,
    color: "bg-violet-500",
  },
];

const columns = [
  { key: "title", label: "Title" },
  { key: "author", label: "Author" },
  { key: "views", label: "Views" },
  { key: "status", label: "Status" },
];

const data = [
  {
    title: "Top IT Jobs in Nepal 2026",
    author: "Admin",
    views: "12,430",
    status: "Published",
  },
  {
    title: "Interview Preparation Guide",
    author: "Sarah",
    views: "9,850",
    status: "Published",
  },
  {
    title: "Resume Writing Tips",
    author: "John",
    views: "7,210",
    status: "Draft",
  },
];

export default function BlogReport() {
  return (
    <div className="space-y-6">
      <ReportsPageHeader
        title="Blog Reports"
        description="Monitor blog publishing performance, readership and engagement."
        icon={BookOpen}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <ReportStatCard key={item.title} {...item} />
        ))}
      </div>

      <ReportChartContainer
        title="Blog Performance"
        subtitle="Monthly blog engagement"
      >
        <UserReportChart />
      </ReportChartContainer>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Blog Report
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
