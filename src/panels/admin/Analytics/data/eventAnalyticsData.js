import {
  CalendarDays,
  Users,
  CheckCircle,
  Clock3,
} from "lucide-react";

const eventAnalyticsData = [
  {
    title: "Total Events",
    value: "84",
    change: "+14%",
    trend: "up",
    color: "bg-blue-500",
    icon: CalendarDays,
  },
  {
    title: "Participants",
    value: "4,520",
    change: "+21%",
    trend: "up",
    color: "bg-green-500",
    icon: Users,
  },
  {
    title: "Completed",
    value: "61",
    change: "+8%",
    trend: "up",
    color: "bg-purple-500",
    icon: CheckCircle,
  },
  {
    title: "Upcoming",
    value: "23",
    change: "+5%",
    trend: "up",
    color: "bg-orange-500",
    icon: Clock3,
  },
];

export default eventAnalyticsData;