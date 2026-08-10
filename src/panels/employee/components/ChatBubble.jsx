import { CheckCheck } from "lucide-react";

export default function ChatBubble({
  message,
  sender = "user",
  time,
}) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "rounded-br-md bg-cyan-600 text-white"
            : "rounded-bl-md border border-gray-200 bg-white text-gray-800"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {message}
        </p>

        <div
          className={`mt-2 flex items-center gap-1 text-xs ${
            isUser
              ? "justify-end text-cyan-100"
              : "justify-end text-gray-400"
          }`}
        >
          <span>{time}</span>

          {isUser && (
            <CheckCheck size={14} />
          )}
        </div>
      </div>
    </div>
  );
}