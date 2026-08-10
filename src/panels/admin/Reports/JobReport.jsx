import { Briefcase, Download } from "lucide-react";

import ReportsPageHeader from "./components/ReportsPageHeader";
import ReportStatCard from "./components/ReportStatCard";
import ReportChartContainer from "./components/ReportChartContainer";
import ReportTable from "./components/ReportTable";

import JobReportChart from "./charts/JobReportChart";

const stats = [
  {
    title: "Total Jobs",
    value: "3,560",
    change: "+15%",
    icon: Briefcase,
    color: "bg-emerald-500",
  },
  {
    title: "Active Jobs",
    value: "2,870",
    change: "+12%",
    icon: Briefcase,
    color: "bg-blue-500",
  },
  {
    title: "Pending Review",
    value: "145",
    change: "+4%",
    icon: Briefcase,
    color: "bg-orange-500",
  },
  {
    title: "Closed Jobs",
    value: "545",
    change: "-2%",
    icon: Briefcase,
    color: "bg-red-500",
  },
];

const columns = [
  { key: "title", label: "Job Title" },
  { key: "company", label: "Company" },
  { key: "applications", label: "Applications" },
  { key: "status", label: "Status" },
];

const data = [
  {
    title: "Frontend Developer",
    company: "ABC Pvt Ltd",
    applications: 84,
    status: "Active",
  },
  {
    title: "Backend Developer",
    company: "Tech Nepal",
    applications: 63,
    status: "Active",
  },
  {
    title: "UI/UX Designer",
    company: "Creative Hub",
    applications: 41,
    status: "Pending",
  },
];

export default function JobReport() {
  return (
    <div className="space-y-6">
      <ReportsPageHeader
        title="Job Reports"
        description="Monitor job postings, approvals and application trends."
        icon={Briefcase}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <ReportStatCard key={item.title} {...item} />
        ))}
      </div>

      <ReportChartContainer
        title="Job Posting Trend"
        subtitle="Monthly jobs created"
      >
        <JobReportChart />
      </ReportChartContainer>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Job Report
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
