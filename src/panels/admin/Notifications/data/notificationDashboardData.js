import {
  Bell,
  MailOpen,
  ShieldAlert,
  Users,
  Briefcase,
} from "lucide-react";

export const notificationDashboardCards = [
  {
    id: 1,
    title: "All Notifications",
    description: "View all platform notifications.",
    value: "1,250",
    icon: Bell,
    color: "bg-blue-500",
    path: "/admin/dashboard/notifications/all",
  },

  {
    id: 2,
    title: "Unread Notifications",
    description: "Notifications waiting for review.",
    value: "86",
    icon: MailOpen,
    color: "bg-amber-500",
    path: "/admin/dashboard/notifications/unread",
  },

  {
    id: 3,
    title: "System Alerts",
    description: "Security and system related alerts.",
    value: "24",
    icon: ShieldAlert,
    color: "bg-red-500",
    path: "/admin/dashboard/notifications/system",
  },

  {
    id: 4,
    title: "User Notifications",
    description: "User activities and account updates.",
    value: "540",
    icon: Users,
    color: "bg-violet-500",
    path: "/admin/dashboard/notifications/users",
  },

  {
    id: 5,
    title: "Job Notifications",
    description: "Job postings and application updates.",
    value: "600",
    icon: Briefcase,
    color: "bg-emerald-500",
    path: "/admin/dashboard/notifications/jobs",
  },
];