import { ClipboardList } from "lucide-react";

import ApplicationPageHeader from "./components/ApplicationPageHeader";
import ApplicationCard from "./components/ApplicationCard";

import { applicationDashboardCards } from "./data/applicationDashboardData";

export default function ApplicationDashboard() {
  return (
    <div className="space-y-6">
      <ApplicationPageHeader
        title="Applications"
        description="Manage all job applications from one place."
        icon={ClipboardList}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {applicationDashboardCards.map((card) => (
          <ApplicationCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
