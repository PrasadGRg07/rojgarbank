import { Bell } from "lucide-react";

import NotificationCard from "./components/NotificationCard";
import { notificationDashboardCards } from "./data/notificationDashboardData";

import NotificationPageHeader from "./components/NotificationPageHeader";

export default function NotificationDashboard() {
  return (
    <div className="space-y-6">
      <NotificationPageHeader
        title="Notifications"
        description="Manage system alerts, user updates and platform notifications."
        icon={Bell}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {notificationDashboardCards.map((card) => (
          <NotificationCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
