import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Mail, User, Calendar, Tag, Reply } from "lucide-react";

import { messageData } from "./data/messageData";

export default function MessageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const message = messageData.find((item) => item.id === Number(id));

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
            Message Details
          </h1>

          <p className="text-sm text-slate-500">View conversation details.</p>
        </div>
      </div>

      {/* Message Card */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-600 p-3">
            <Mail className="text-white" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {message.subject}
            </h2>

            <p className="text-sm text-slate-500">{message.status}</p>
          </div>
        </div>

        <p className="mt-6 text-slate-600 dark:text-slate-300">
          {message.message}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <User size={20} />

            <div>
              <p className="text-xs text-slate-500">Sender</p>

              <p className="font-medium">{message.sender}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <Tag size={20} />

            <div>
              <p className="text-xs text-slate-500">Type</p>

              <p className="font-medium">{message.type}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <Calendar size={20} />

            <div>
              <p className="text-xs text-slate-500">Date</p>

              <p className="font-medium">{message.date}</p>
            </div>
          </div>
        </div>

        {/* Reply Button */}

        <button
          onClick={() =>
            navigate(`/admin/dashboard/messages/${message.id}/reply`)
          }
          className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Reply size={18} />
          Reply
        </button>
      </div>
    </div>
  );
}
