import { Users } from "lucide-react";
import { Download } from "lucide-react";

import ReportsPageHeader from "./components/ReportsPageHeader";
import ReportStatCard from "./components/ReportStatCard";
import ReportChartContainer from "./components/ReportChartContainer";
import UserReportChart from "./charts/UserReportChart";

const stats = [
  {
    title: "Total Users",
    value: "12,540",
    change: "+12%",
    icon: Users,
    color: "bg-blue-600",
  },
  {
    title: "Active Users",
    value: "10,284",
    change: "+8%",
    icon: Users,
    color: "bg-emerald-600",
  },
  {
    title: "New This Month",
    value: "428",
    change: "+16%",
    icon: Users,
    color: "bg-violet-600",
  },
  {
    title: "Verified Users",
    value: "11,980",
    change: "+5%",
    icon: Users,
    color: "bg-orange-500",
  },
];

export default function UserReport() {
  return (
    <div className="space-y-6">
      <ReportsPageHeader
        title="User Reports"
        description="View user statistics, growth and export reports."
        icon={Users}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <ReportStatCard key={item.title} {...item} />
        ))}
      </div>

      <ReportChartContainer
        title="User Growth"
        subtitle="Monthly registered users"
      >
        <UserReportChart />
      </ReportChartContainer>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            User Report Table
          </h2>

          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <Download size={18} />
            Export
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="py-3 text-left">Name</th>
                <th className="py-3 text-left">Email</th>
                <th className="py-3 text-left">Role</th>
                <th className="py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">John Doe</td>
                <td className="py-3">john@example.com</td>
                <td className="py-3">Job Seeker</td>
                <td className="py-3 text-emerald-600">Active</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Jane Smith</td>
                <td className="py-3">jane@example.com</td>
                <td className="py-3">Employer</td>
                <td className="py-3 text-emerald-600">Active</td>
              </tr>

              <tr>
                <td className="py-3">Alex Johnson</td>
                <td className="py-3">alex@example.com</td>
                <td className="py-3">Admin</td>
                <td className="py-3 text-orange-500">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
