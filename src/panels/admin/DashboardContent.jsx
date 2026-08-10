import DashboardStats from "./Dashboard/DashboardStats";
import DashboardCharts from "./Dashboard/DashboardCharts";
import QuickActions from "./Dashboard/QuickActions";
import SystemOverview from "./Dashboard/SystemOverview";
import LatestJobs from "./Dashboard/LatestJobs";
import LatestEmployers from "./Dashboard/LatestEmployers";
import LatestApplications from "./Dashboard/LatestApplications";
import RecentActivities from "./Dashboard/RecentActivities";

import JobStatistics from "./Jobs/JobStatistics";
export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <DashboardStats />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <DashboardCharts />
        </div>

        <SystemOverview />
      </div>

      <QuickActions />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LatestJobs />
        <LatestEmployers />
        <LatestApplications />
        <RecentActivities />
        <JobStatistics />
      </div>
    </div>
  );
}