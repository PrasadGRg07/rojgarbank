import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Video,
  MoreVertical,
  Briefcase,
  User,
} from "lucide-react";

export default function ChatHeader({
  company,
  position,
  logo,
  online = true,
  participantId,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between border-b bg-white px-6 py-4 relative z-10">

      {/* Left */}
      <div className="flex items-center gap-4">

        <div className="relative">

          <img
            src={logo}
            alt={company}
            className="h-14 w-14 rounded-xl border object-cover"
          />

          {online && (
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>
          )}

        </div>

        <div>

          <h2 className="text-lg font-bold text-gray-800">
            {company}
          </h2>

          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <Briefcase size={15} />

            <span>{position}</span>
          </div>

          <p
            className={`mt-1 text-xs font-medium ${
              online
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            {online ? "Online" : "Offline"}
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <button className="rounded-xl bg-slate-100 p-3 transition hover:bg-cyan-100 hover:text-cyan-700">
          <Phone size={18} />
        </button>

        <button className="rounded-xl bg-slate-100 p-3 transition hover:bg-cyan-100 hover:text-cyan-700">
          <Video size={18} />
        </button>

        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-xl bg-slate-100 p-3 transition hover:bg-cyan-100 hover:text-cyan-700"
          >
            <MoreVertical size={18} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <button
                onClick={() => {
                  setShowMenu(false);
                  if (participantId) {
                    navigate(`/jobseeker/dashboard/company/${participantId}`);
                  }
                }}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <User size={16} />
                View Profile
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}