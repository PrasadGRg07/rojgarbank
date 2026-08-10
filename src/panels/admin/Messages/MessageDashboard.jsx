import { MessageSquare } from "lucide-react";

import MessagePageHeader from "./components/MessagePageHeader";
import MessageCard from "./components/MessageCard";

import { messageDashboardCards } from "./data/messageDashboardData";

export default function MessageDashboard() {
  return (
    <div className="space-y-6">
      <MessagePageHeader
        title="Messages"
        description="Manage conversations, inbox, sent and archived messages."
        icon={MessageSquare}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {messageDashboardCards.map((card) => (
          <MessageCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
