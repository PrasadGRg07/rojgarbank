import { useEffect, useState } from "react";
import { CalendarDays, CalendarCheck, CalendarClock, CalendarX } from "lucide-react";

import StatCard from "../components/StatCard";
import { getEvents } from "../../../lib/eventApi";

export default function EventStatistics() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    upcoming: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const events = await getEvents();

      const now = new Date();

      setStats({
        total: events.length,
        active: events.filter((e) => e.is_active).length,
        inactive: events.filter((e) => !e.is_active).length,
        upcoming: events.filter(
          (e) => new Date(e.date) > now && e.is_active
        ).length,
      });
    } catch (err) {
      console.error("Failed to load event statistics", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard
        title="Total Events"
        value={stats.total}
        icon={CalendarDays}
      />

      <StatCard
        title="Active Events"
        value={stats.active}
        icon={CalendarCheck}
      />

      <StatCard
        title="Upcoming Events"
        value={stats.upcoming}
        icon={CalendarClock}
      />

      <StatCard
        title="Inactive Events"
        value={stats.inactive}
        icon={CalendarX}
      />
    </div>
  );
}