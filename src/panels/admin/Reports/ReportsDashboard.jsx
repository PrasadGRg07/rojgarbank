import { FileBarChart2 } from "lucide-react";

import ReportsPageHeader from "./components/ReportsPageHeader";
import ReportCard from "./components/ReportCard";

import { reports } from "./data/reportsData";

export default function ReportsDashboard() {
  return (
    <div className="space-y-6">
      <ReportsPageHeader
        title="Reports Dashboard"
        description="Generate, review and export reports across the platform."
        icon={FileBarChart2}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {reports.map((report) => (
          <ReportCard key={report.id} {...report} />
        ))}
      </div>
    </div>
  );
}
