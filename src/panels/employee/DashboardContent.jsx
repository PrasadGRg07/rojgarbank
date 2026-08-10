import React from "react";
import { useOutletContext } from "react-router-dom";

import StatCard from "./components/StatCard";
import RecentApplications from "./components/RecentApplications";

export default function DashboardContent() {
  const { dashboardData, user } = useOutletContext();

  const statCards = [
    {
      label: "Total Jobs",
      value: dashboardData?.total_jobs ?? 0,
      tint: "bg-orange-50",
    },
    {
      label: "Active Jobs",
      value: dashboardData?.active_jobs ?? 0,
      tint: "bg-fuchsia-50",
    },
    {
      label: "Total Applicants",
      value: dashboardData?.total_applicants ?? 0,
      tint: "bg-slate-100",
    },
    {
      label: "Shortlisted",
      value: dashboardData?.shortlisted_applicants ?? 0,
      tint: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, { user?.name}
        </h1>

        <p className="mt-1 text-slate-500">
          Here's your recruitment overview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <RecentApplications
        applications={dashboardData?.recent_applications || []}
      />
    </div>
  );
}