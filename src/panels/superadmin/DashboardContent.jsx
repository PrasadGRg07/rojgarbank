import React from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import RecentActivity from "./components/RecentActivity";
import QuickActionCard from "./components/QuickActionCard";

import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BackupIcon from "@mui/icons-material/Backup";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const DashboardContent = () => {
  const activities = [
    {
      id: 1,
      title: "New Admin Created",
      description: "John Doe was added as an Admin.",
      time: "5 min ago",
    },
    {
      id: 2,
      title: "Database Backup",
      description: "Backup completed successfully.",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Role Updated",
      description: "Employee permissions updated.",
      time: "2 hours ago",
    },
  ];

  return (
    <>
      <Header />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Admins"
          value="12"
          icon={<GroupsIcon />}
          color="bg-blue-600"
        />

        <StatCard
          title="Companies"
          value="46"
          icon={<BusinessIcon />}
          color="bg-green-600"
        />

        <StatCard
          title="Job Seekers"
          value="2,456"
          icon={<PersonIcon />}
          color="bg-orange-500"
        />

        <StatCard
          title="Jobs Posted"
          value="684"
          icon={<WorkIcon />}
          color="bg-purple-600"
        />

      </div>

      {/* Quick Actions */}
      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

          <QuickActionCard
            title="Create Admin"
            description="Add a new administrator"
            icon={<PersonAddIcon />}
            color="bg-blue-600"
          />

          <QuickActionCard
            title="Analytics"
            description="View reports"
            icon={<AnalyticsIcon />}
            color="bg-green-600"
          />

          <QuickActionCard
            title="Backup"
            description="Backup database"
            icon={<BackupIcon />}
            color="bg-red-600"
          />

          <QuickActionCard
            title="Settings"
            description="Manage settings"
            icon={<SettingsIcon />}
            color="bg-purple-600"
          />

        </div>

      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <RecentActivity activities={activities} />
      </div>
    </>
  );
};

export default DashboardContent;