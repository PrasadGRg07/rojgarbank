import { FileText, Download } from "lucide-react";

import ReportsPageHeader from "./components/ReportsPageHeader";
import ReportStatCard from "./components/ReportStatCard";
import ReportChartContainer from "./components/ReportChartContainer";
import ReportTable from "./components/ReportTable";

import ApplicationReportChart from "./charts/ApplicationReportChart";

const stats = [
  {
    title: "Total Applications",
    value: "18,920",
    change: "+20%",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    title: "Pending",
    value: "2,134",
    change: "+6%",
    icon: FileText,
    color: "bg-orange-500",
  },
  {
    title: "Reviewed",
    value: "14,380",
    change: "+12%",
    icon: FileText,
    color: "bg-emerald-500",
  },
  {
    title: "Hired",
    value: "2,406",
    change: "+8%",
    icon: FileText,
    color: "bg-violet-500",
  },
];

const columns = [
  { key: "applicant", label: "Applicant" },
  { key: "job", label: "Job Title" },
  { key: "company", label: "Company" },
  { key: "status", label: "Status" },
];

const data = [
  {
    applicant: "John Doe",
    job: "Frontend Developer",
    company: "ABC Pvt Ltd",
    status: "Reviewed",
  },
  {
    applicant: "Sarah Smith",
    job: "Backend Developer",
    company: "Tech Nepal",
    status: "Pending",
  },
  {
    applicant: "Alex Johnson",
    job: "UI/UX Designer",
    company: "Creative Hub",
    status: "Hired",
  },
];

export default function ApplicationReport() {
  return (
    <div className="space-y-6">
      <ReportsPageHeader
        title="Application Reports"
        description="Monitor job applications and hiring progress."
        icon={FileText}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <ReportStatCard key={item.title} {...item} />
        ))}
      </div>

      <ReportChartContainer
        title="Application Status"
        subtitle="Overall application distribution"
      >
        <ApplicationReportChart />
      </ReportChartContainer>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Application Report
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
