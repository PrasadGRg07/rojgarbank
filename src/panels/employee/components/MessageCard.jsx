import { useNavigate } from "react-router-dom";

export default function MessageCard({ id, company, profile_picture, message, time, unread, online }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/employee/dashboard/messages/chat/${id}`)}
      className={`cursor-pointer rounded-xl p-4 transition ${
        unread ? "bg-cyan-50/50 hover:bg-cyan-50" : "hover:bg-slate-100"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Profile Picture / Logo */}
        <div className="relative">
          <img
            src={profile_picture || "https://via.placeholder.com/60"}
            alt={company}
            className="h-12 w-12 rounded-xl border object-cover"
          />
          {online && (
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"></span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className={`truncate font-semibold ${unread ? "text-slate-900" : "text-slate-700"}`}>
              {company}
            </h3>
            <span className={`whitespace-nowrap text-xs ${unread ? "font-medium text-cyan-600" : "text-slate-500"}`}>
              {time}
            </span>
          </div>

          <p className={`truncate text-sm mt-0.5 ${unread ? "font-medium text-slate-700" : "text-slate-500"}`}>
            {message}
          </p>
        </div>
        
        {/* Unread Indicator */}
        {unread && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white">
            </div>
        )}
      </div>
    </div>
  );
}