import { MessageSquareText } from "lucide-react";

export default function EmptyChat() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10">

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-100">
        <MessageSquareText
          size={50}
          className="text-cyan-600"
        />
      </div>

      <h2 className="mt-8 text-2xl font-bold text-slate-800">
        No Conversation Selected
      </h2>

      <p className="mt-3 max-w-md text-center text-slate-500">
        Select a conversation from your inbox to start chatting
        with employers, recruiters, or hiring managers.
      </p>

      <button
        className="mt-8 rounded-2xl bg-cyan-600 px-8 py-3 font-semibold text-white transition hover:bg-cyan-700"
      >
        Open Inbox
      </button>

    </div>
  );
}