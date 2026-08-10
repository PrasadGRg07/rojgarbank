import { useState } from "react";
import {
  Send,
  Paperclip,
  Smile,
} from "lucide-react";

export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    if (onSend) {
      onSend(message);
    }

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white p-4">

      <div className="flex items-end gap-3">

        {/* Attachment */}
        <button
          className="rounded-xl bg-slate-100 p-3 transition hover:bg-cyan-100 hover:text-cyan-700"
        >
          <Paperclip size={20} />
        </button>

        {/* Emoji */}
        <button
          className="rounded-xl bg-slate-100 p-3 transition hover:bg-cyan-100 hover:text-cyan-700"
        >
          <Smile size={20} />
        </button>

        {/* Message Input */}
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="max-h-32 min-h-[52px] flex-1 resize-none rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="rounded-2xl bg-cyan-600 p-4 text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={20} />
        </button>

      </div>

    </div>
  );
}