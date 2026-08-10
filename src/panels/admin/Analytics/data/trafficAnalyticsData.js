import {
  Globe,
  MousePointerClick,
  Smartphone,
  Monitor,
} from "lucide-react";

const trafficAnalyticsData = [
  {
    title: "Total Visitors",
    value: "245K",
    change: "+18%",
    trend: "up",
    color: "bg-blue-500",
    icon: Globe,
  },
  {
    title: "Page Views",
    value: "1.2M",
    change: "+24%",
    trend: "up",
    color: "bg-green-500",
    icon: MousePointerClick,
  },
  {
    title: "Mobile Users",
    value: "68%",
    change: "+7%",
    trend: "up",
    color: "bg-purple-500",
    icon: Smartphone,
  },
  {
    title: "Desktop Users",
    value: "32%",
    change: "-4%",
    trend: "down",
    color: "bg-orange-500",
    icon: Monitor,
  },
];

export default trafficAnalyticsData;