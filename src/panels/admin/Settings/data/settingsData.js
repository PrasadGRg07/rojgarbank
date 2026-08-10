import {
  Settings,
  Shield,
  Monitor,
  Database,
  Mail,
  Server,
  Share2,
} from "lucide-react";


export const settingsCards = [

  {
    id: 1,
    title: "General Settings",
    description: "Manage basic website and platform configurations.",
    icon: Settings,
    color: "bg-blue-500",
    path: "/admin/dashboard/settings/general",
  },


  {
    id: 2,
    title: "Security Settings",
    description: "Manage password, authentication and security options.",
    icon: Shield,
    color: "bg-red-500",
    path: "/admin/dashboard/settings/security",
  },


  {
    id: 3,
    title: "System Settings",
    description: "Configure system behavior and platform preferences.",
    icon: Monitor,
    color: "bg-violet-500",
    path: "/admin/dashboard/settings/system",
  },


  {
    id: 4,
    title: "Backup Settings",
    description: "Manage database backup and restore options.",
    icon: Database,
    color: "bg-emerald-500",
    path: "/admin/dashboard/settings/backup",
  },


  {
    id: 5,
    title: "Email Settings",
    description: "Configure email services and notifications.",
    icon: Mail,
    color: "bg-amber-500",
    path: "/admin/dashboard/settings/email",
  },


  {
    id: 6,
    title: "SMTP Settings",
    description: "Manage SMTP server configuration.",
    icon: Server,
    color: "bg-cyan-500",
    path: "/admin/dashboard/settings/smtp",
  },


  {
    id: 7,
    title: "Social Settings",
    description: "Manage social media links and integrations.",
    icon: Share2,
    color: "bg-pink-500",
    path: "/admin/dashboard/settings/social",
  },

];