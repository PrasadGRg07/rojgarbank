import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import MessageCard from "../components/MessageCard";
import api from "../../../lib/api";

export default function SentMessages() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setUserId(JSON.parse(userStr).id);
      }
    } catch (e) {
      console.error("Failed to parse user", e);
    }
    
    const fetchConversations = async () => {
      try {
        const response = await api.get("/messaging/conversations/");
        setConversations(response.data);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  const filteredConversations = conversations.filter(c => {
    // Only show if the user sent the last message
    if (!c.last_message || c.last_message.sender_id !== userId) return false;
    return c.other_participant.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Sent Messages</h1>
          <p className="mt-1 text-slate-500">View all messages you have sent to employers.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search sent messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
          </div>
        ) : filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <MessageCard
              key={conversation.id}
              id={conversation.id}
              company={conversation.other_participant.name}
              profile_picture={conversation.other_participant.profile_picture}
              message={conversation.last_message ? conversation.last_message.content : "No messages yet"}
              time={new Date(conversation.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              unread={false}
              online={true}
            />
          ))
        ) : (
          <div className="text-center p-8 text-gray-500">
            No sent messages found.
          </div>
        )}
      </div>
    </div>
  );
}