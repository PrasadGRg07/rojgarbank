import {
  BookOpen,
  Eye,
  FileCheck,
  FileEdit,
} from "lucide-react";

const blogAnalyticsData = [
  {
    title: "Total Blogs",
    value: "328",
    change: "+12%",
    trend: "up",
    color: "bg-blue-500",
    icon: BookOpen,
  },
  {
    title: "Published",
    value: "286",
    change: "+8%",
    trend: "up",
    color: "bg-green-500",
    icon: FileCheck,
  },
  {
    title: "Drafts",
    value: "42",
    change: "+3%",
    trend: "up",
    color: "bg-yellow-500",
    icon: FileEdit,
  },
  {
    title: "Views",
    value: "98.4K",
    change: "+21%",
    trend: "up",
    color: "bg-purple-500",
    icon: Eye,
  },
];

export default blogAnalyticsData;