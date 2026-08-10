import {
  Inbox,
  Send,
  Archive,
  PenSquare,
} from "lucide-react";


export const messageDashboardCards = [

  {
    id: 1,
    title: "Inbox",
    description: "View received messages from users and employers.",
    value: "320",
    icon: Inbox,
    color: "bg-blue-500",
    path: "/admin/dashboard/messages/inbox",
  },


  {
    id: 2,
    title: "Sent Messages",
    description: "View messages sent by administrators.",
    value: "145",
    icon: Send,
    color: "bg-emerald-500",
    path: "/admin/dashboard/messages/sent",
  },


  {
    id: 3,
    title: "Archived Messages",
    description: "View stored and archived conversations.",
    value: "86",
    icon: Archive,
    color: "bg-violet-500",
    path: "/admin/dashboard/messages/archive",
  },


  {
    id: 4,
    title: "Compose Message",
    description: "Create and send a new message.",
    value: "+",
    icon: PenSquare,
    color: "bg-amber-500",
    path: "/admin/dashboard/messages/compose",
  },

];