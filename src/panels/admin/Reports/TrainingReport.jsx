import { GraduationCap, Download } from "lucide-react";

import ReportsPageHeader from "./components/ReportsPageHeader";
import ReportStatCard from "./components/ReportStatCard";
import ReportChartContainer from "./components/ReportChartContainer";
import ReportTable from "./components/ReportTable";

import UserReportChart from "./charts/UserReportChart";

const stats = [
  {
    title: "Training Courses",
    value: "42",
    change: "+10%",
    icon: GraduationCap,
    color: "bg-indigo-500",
  },
  {
    title: "Enrollments",
    value: "2,845",
    change: "+18%",
    icon: GraduationCap,
    color: "bg-blue-500",
  },
  {
    title: "Completed",
    value: "1,932",
    change: "+12%",
    icon: GraduationCap,
    color: "bg-emerald-500",
  },
  {
    title: "Certificates Issued",
    value: "1,487",
    change: "+9%",
    icon: GraduationCap,
    color: "bg-orange-500",
  },
];

const columns = [
  { key: "course", label: "Course" },
  { key: "trainer", label: "Trainer" },
  { key: "enrolled", label: "Enrolled" },
  { key: "status", label: "Status" },
];

const data = [
  {
    course: "React Development",
    trainer: "John Smith",
    enrolled: 180,
    status: "Ongoing",
  },
  {
    course: "Python for Beginners",
    trainer: "Sarah Lee",
    enrolled: 240,
    status: "Completed",
  },
  {
    course: "UI/UX Design",
    trainer: "David Brown",
    enrolled: 95,
    status: "Upcoming",
  },
];

export default function TrainingReport() {
  return (
    <div className="space-y-6">
      <ReportsPageHeader
        title="Training Reports"
        description="Monitor courses, enrollments, completions and certification statistics."
        icon={GraduationCap}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <ReportStatCard key={item.title} {...item} />
        ))}
      </div>

      <ReportChartContainer
        title="Training Performance"
        subtitle="Monthly enrollments and completions"
      >
        <UserReportChart />
      </ReportChartContainer>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Training Report
        </h2>

        <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600">
          <Download size={18} />
          Export
        </button>
      </div>

      <ReportTable columns={columns} data={data} />
    </div>
  );
}
