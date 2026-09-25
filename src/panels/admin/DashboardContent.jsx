import DashboardHeader from "./Dashboard/DashboardHeader";
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
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <DashboardHeader />

      <DashboardStats />

      <DashboardCharts />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SystemOverview />
        <RecentActivities />
      </div>

      <QuickActions />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <LatestJobs />
        <LatestEmployers />
        <LatestApplications />
      </div>

      <JobStatistics />
    </div>
  );
}
