import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../../lib/api";
import { Loader2 } from "lucide-react";

import ChatHeader from "../components/ChatHeader";
import ChatBubble from "../components/ChatBubble";
import MessageInput from "../components/MessageInput";

export default function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [conversationInfo, setConversationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setUserId(JSON.parse(userStr).id);
      }
    } catch (e) {
      console.error("Failed to parse user", e);
    }

    const fetchChatData = async () => {
      try {
        // Fetch conversation details
        const convRes = await api.get("/messaging/conversations/");
        const currentConv = convRes.data.find(c => c.id === parseInt(id));
        if (currentConv) {
          setConversationInfo(currentConv);
        }

        // Fetch messages
        const msgRes = await api.get(`/messaging/conversations/${id}/messages/`);
        setMessages(msgRes.data);

        // Mark as read
        await api.post(`/messaging/conversations/${id}/read/`);
      } catch (error) {
        console.error("Failed to fetch chat data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();

    // Polling every 5 seconds
    const interval = setInterval(async () => {
      try {
        const msgRes = await api.get(`/messaging/conversations/${id}/messages/`);
        setMessages(msgRes.data);
        await api.post(`/messaging/conversations/${id}/read/`);
      } catch (error) {
        console.error("Failed to poll messages:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  const handleSend = async (text) => {
    try {
      const res = await api.post(`/messaging/conversations/${id}/messages/`, {
        content: text
      });
      setMessages((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Chat Header */}
      {conversationInfo ? (
        <ChatHeader
          company={conversationInfo.other_participant.name}
          position={conversationInfo.other_participant.role}
          logo={conversationInfo.other_participant.profile_picture || "https://via.placeholder.com/70"}
          online={true}
          participantId={conversationInfo.other_participant.id}
        />
      ) : (
        <div className="h-[73px] border-b bg-white flex items-center px-6">
          <div className="h-4 w-32 bg-slate-200 rounded animate-pulse"></div>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollContainerRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-6">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
          </div>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              sender={msg.sender === userId ? "user" : "employer"}
              message={msg.content}
              time={new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-gray-400">
            <p>No messages yet.</p>
            <p className="text-sm">Send a message to start the conversation.</p>
          </div>
        )}
      </div>

      {/* Message Input */}
      <MessageInput onSend={handleSend} />
    </div>
  );
}