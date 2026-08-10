import {
  BarChart3,
  Users,
  Building2,
  Briefcase,
  FileText,
  BookOpen,
  CalendarDays,
  Globe,
} from "lucide-react";


const analyticsData = [
  {
    id: 1,
    title: "Dashboard Analytics",
    description:
      "View overall platform performance, growth trends, and system statistics.",
    icon: BarChart3,
    path: "/admin/dashboard/analytics/dashboard",
    gradient:
      "bg-gradient-to-r from-blue-500 to-indigo-600",
  },

  {
    id: 2,
    title: "User Analytics",
    description:
      "Analyze user growth, registrations, activity, and user behavior.",
    icon: Users,
    path: "/admin/dashboard/analytics/users",
    gradient:
      "bg-gradient-to-r from-green-500 to-emerald-600",
  },

  {
    id: 3,
    title: "Employer Analytics",
    description:
      "Track employer registrations, verification, and hiring activities.",
    icon: Building2,
    path: "/admin/dashboard/analytics/employers",
    gradient:
      "bg-gradient-to-r from-purple-500 to-violet-600",
  },

  {
    id: 4,
    title: "Job Analytics",
    description:
      "Monitor posted jobs, approvals, categories, and job trends.",
    icon: Briefcase,
    path: "/admin/dashboard/analytics/jobs",
    gradient:
      "bg-gradient-to-r from-orange-500 to-red-600",
  },

  {
    id: 5,
    title: "Application Analytics",
    description:
      "Analyze applications, hiring progress, and candidate activity.",
    icon: FileText,
    path: "/admin/dashboard/analytics/applications",
    gradient:
      "bg-gradient-to-r from-cyan-500 to-blue-600",
  },

  {
    id: 6,
    title: "Blog Analytics",
    description:
      "Track blog performance, views, and popular content.",
    icon: BookOpen,
    path: "/admin/dashboard/analytics/blogs",
    gradient:
      "bg-gradient-to-r from-pink-500 to-rose-600",
  },

  {
    id: 7,
    title: "Event Analytics",
    description:
      "Monitor events, participants, and engagement statistics.",
    icon: CalendarDays,
    path: "/admin/dashboard/analytics/events",
    gradient:
      "bg-gradient-to-r from-yellow-500 to-orange-600",
  },

  {
    id: 8,
    title: "Traffic Analytics",
    description:
      "Analyze visitors, traffic sources, devices, and website activity.",
    icon: Globe,
    path: "/admin/dashboard/analytics/traffic",
    gradient:
      "bg-gradient-to-r from-indigo-500 to-purple-700",
  },
];


export default analyticsData;