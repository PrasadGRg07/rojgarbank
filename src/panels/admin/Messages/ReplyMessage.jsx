import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

import { messageData } from "./data/messageData";

export default function ReplyMessage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const message = messageData.find((item) => item.id === Number(id));

  const [reply, setReply] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      messageId: id,
      reply,
    });
  };

  if (!message) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center dark:bg-slate-900">
        Message not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl border p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Reply Message
          </h1>

          <p className="text-sm text-slate-500">Reply to {message.sender}</p>
        </div>
      </div>

      {/* Original Message */}

      <div className="rounded-2xl border bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm text-slate-500">Original Message</p>

        <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">
          {message.subject}
        </h3>

        <p className="mt-3 text-slate-600 dark:text-slate-300">
          {message.message}
        </p>
      </div>

      {/* Reply Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <label className="mb-2 block text-sm font-medium">Your Reply</label>

        <textarea
          rows="6"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write your reply..."
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
        />

        <button
          type="submit"
          className="mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Send size={18} />
          Send Reply
        </button>
      </form>
    </div>
  );
}
