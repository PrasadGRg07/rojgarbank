import {
  Bell,
  ArrowRight,
  Clock3,
} from "lucide-react";

const typeColors = {
  interview: "bg-purple-100 text-purple-600",
  application: "bg-blue-100 text-blue-600",
  job: "bg-cyan-100 text-cyan-600",
  resume: "bg-orange-100 text-orange-600",
  success: "bg-green-100 text-green-600",
  warning: "bg-yellow-100 text-yellow-600",
  default: "bg-gray-100 text-gray-600",
};

export default function NotificationCard({
  title,
  message,
  time,
  type = "default",
  unread = false,
  onClick,
}) {
  const color =
    typeColors[type] || typeColors.default;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-5 shadow-sm transition hover:shadow-md ${
        unread
          ? "border-blue-200 bg-blue-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className={`rounded-full p-3 ${color}`}>
            <Bell size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">
              {title}
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              {message}
            </p>

            <div className="flex flex-col items-end gap-3">
              <Clock3 size={14} />
              {time}
            </div>
          </div>
        </div>

        <ArrowRight
          size={18}
          className="text-gray-400"
        />
      </div>
    </div>
  );
}