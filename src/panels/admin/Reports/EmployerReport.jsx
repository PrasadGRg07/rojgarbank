import { Building2, Download } from "lucide-react";

import ReportsPageHeader from "./components/ReportsPageHeader";
import ReportStatCard from "./components/ReportStatCard";
import ReportChartContainer from "./components/ReportChartContainer";
import ReportTable from "./components/ReportTable";

import EmployerReportChart from "./charts/EmployerReportChart";

const stats = [
  {
    title: "Total Employers",
    value: "1,245",
    change: "+8%",
    icon: Building2,
    color: "bg-violet-500",
  },
  {
    title: "Verified",
    value: "1,180",
    change: "+5%",
    icon: Building2,
    color: "bg-emerald-500",
  },
  {
    title: "Pending",
    value: "42",
    change: "-3%",
    icon: Building2,
    color: "bg-orange-500",
  },
  {
    title: "Suspended",
    value: "23",
    change: "+2%",
    icon: Building2,
    color: "bg-red-500",
  },
];

const columns = [
  { key: "company", label: "Company" },
  { key: "industry", label: "Industry" },
  { key: "jobs", label: "Jobs" },
  { key: "status", label: "Status" },
];

const data = [
  {
    company: "ABC Pvt Ltd",
    industry: "IT",
    jobs: 25,
    status: "Verified",
  },
  {
    company: "Tech Nepal",
    industry: "Software",
    jobs: 18,
    status: "Verified",
  },
  {
    company: "Global HR",
    industry: "Recruitment",
    jobs: 12,
    status: "Pending",
  },
];

export default function EmployerReport() {
  return (
    <div className="space-y-6">
      <ReportsPageHeader
        title="Employer Reports"
        description="Monitor employer registrations, verification and hiring activity."
        icon={Building2}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <ReportStatCard key={item.title} {...item} />
        ))}
      </div>

      <ReportChartContainer
        title="Employer Growth"
        subtitle="Monthly employer registrations"
      >
        <EmployerReportChart />
      </ReportChartContainer>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Employer Report
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
