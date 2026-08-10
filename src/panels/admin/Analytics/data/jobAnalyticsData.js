import {
  Briefcase,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const jobAnalyticsData = [
  {
    title: "Total Jobs",
    value: "8,540",
    change: "+14%",
    trend: "up",
    color: "bg-blue-500",
    icon: Briefcase,
  },
  {
    title: "Active Jobs",
    value: "6,280",
    change: "+9%",
    trend: "up",
    color: "bg-green-500",
    icon: CheckCircle2,
  },
  {
    title: "Pending Approval",
    value: "245",
    change: "+4%",
    trend: "up",
    color: "bg-yellow-500",
    icon: Clock3,
  },
  {
    title: "Expired Jobs",
    value: "320",
    change: "-6%",
    trend: "down",
    color: "bg-red-500",
    icon: XCircle,
  },
];

export default jobAnalyticsData;