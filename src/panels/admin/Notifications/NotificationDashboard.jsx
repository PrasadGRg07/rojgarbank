import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

import NotificationCard from "./components/NotificationCard";
import { notificationDashboardCards } from "./data/notificationDashboardData";

import NotificationPageHeader from "./components/NotificationPageHeader";
import { fetchNotifications } from "../../../lib/notificationApi";

export default function NotificationDashboard() {
  const [cards, setCards] = useState(notificationDashboardCards);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const notifications = await fetchNotifications();
        
        const allCount = notifications.length;
        const unreadCount = notifications.filter(n => !n.is_read).length;
        const systemCount = notifications.filter(n => n.notification_type === 'system').length;
        const userCount = notifications.filter(n => n.notification_type === 'user').length;
        const jobCount = notifications.filter(n => n.notification_type === 'job_created' || n.notification_type === 'job_approved' || n.notification_type === 'job_rejected').length;

        const updatedCards = notificationDashboardCards.map(card => {
          let value = "0";
          if (card.title === "All Notifications") value = allCount.toString();
          else if (card.title === "Unread Notifications") value = unreadCount.toString();
          else if (card.title === "System Alerts") value = systemCount.toString();
          else if (card.title === "User Notifications") value = userCount.toString();
          else if (card.title === "Job Notifications") value = jobCount.toString();
          return { ...card, value };
        });

        setCards(updatedCards);
      } catch (err) {
        console.error("Error fetching notification stats:", err);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      <NotificationPageHeader
        title="Notifications"
        description="Manage system alerts, user updates and platform notifications."
        icon={Bell}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <NotificationCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}

