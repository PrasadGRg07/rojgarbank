import {
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const applicationAnalyticsData = [
  {
    title: "Total Applications",
    value: "18,920",
    change: "+18%",
    trend: "up",
    color: "bg-blue-500",
    icon: FileText,
  },
  {
    title: "Accepted",
    value: "4,120",
    change: "+10%",
    trend: "up",
    color: "bg-green-500",
    icon: CheckCircle2,
  },
  {
    title: "Pending Review",
    value: "2,340",
    change: "+6%",
    trend: "up",
    color: "bg-yellow-500",
    icon: Clock3,
  },
  {
    title: "Rejected",
    value: "1,870",
    change: "-3%",
    trend: "down",
    color: "bg-red-500",
    icon: XCircle,
  },
];

export default applicationAnalyticsData;