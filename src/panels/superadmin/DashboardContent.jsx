import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
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
import CircularProgress from "@mui/material/CircularProgress";

const DashboardContent = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalAdmins: 0,
    companies: 0,
    jobSeekers: 0,
    jobsPosted: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/superadmin/dashboard-stats/");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

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
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Admins"
            value={stats.totalAdmins}
            icon={<GroupsIcon />}
            color="bg-blue-600"
          />

          <StatCard
            title="Companies"
            value={stats.companies}
            icon={<BusinessIcon />}
            color="bg-green-600"
          />

          <StatCard
            title="Job Seekers"
            value={stats.jobSeekers}
            icon={<PersonIcon />}
            color="bg-orange-500"
          />

          <StatCard
            title="Jobs Posted"
            value={stats.jobsPosted}
            icon={<WorkIcon />}
            color="bg-purple-600"
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          <QuickActionCard
            title="Create Admin"
            description="Add a new administrator"
            icon={<PersonAddIcon />}
            color="bg-blue-600"
            onClick={() => navigate("/superadmin/dashboard/admins/create")}
          />

          <QuickActionCard
            title="Analytics"
            description="View reports"
            icon={<AnalyticsIcon />}
            color="bg-green-600"
            onClick={() => navigate("/superadmin/dashboard/analytics")}
          />

          <QuickActionCard
            title="Backup"
            description="Backup database"
            icon={<BackupIcon />}
            color="bg-red-600"
            onClick={() => navigate("/superadmin/dashboard/backup")}
          />

          <QuickActionCard
            title="Settings"
            description="Manage settings"
            icon={<SettingsIcon />}
            color="bg-purple-600"
            onClick={() => navigate("/superadmin/dashboard/settings")}
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