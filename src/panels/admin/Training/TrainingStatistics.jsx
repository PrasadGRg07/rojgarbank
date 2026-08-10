import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle,
  XCircle,
  CalendarClock,
} from "lucide-react";

import StatCard from "../components/StatCard";
import { getTrainings } from "../../../lib/trainingApi";

export default function TrainingStatistics() {
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
      const trainings = await getTrainings();
      const now = new Date();

      setStats({
        total: trainings.length,
        active: trainings.filter((t) => t.is_active).length,
        inactive: trainings.filter((t) => !t.is_active).length,
        upcoming: trainings.filter(
          (t) =>
            t.is_active &&
            new Date(t.start_time) > now
        ).length,
      });
    } catch (err) {
      console.error("Failed to load statistics", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Total Trainings"
        value={stats.total}
        icon={BookOpen}
      />

      <StatCard
        title="Active Trainings"
        value={stats.active}
        icon={CheckCircle}
      />

      <StatCard
        title="Upcoming Trainings"
        value={stats.upcoming}
        icon={CalendarClock}
      />

      <StatCard
        title="Inactive Trainings"
        value={stats.inactive}
        icon={XCircle}
      />

    </div>
  );
}