import { Bell, Search, UserCircle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Admin</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-sm w-52"
          />
        </div>

        {/* Notification */}
        <button
          onClick={() => navigate("/admin/dashboard/notifications")}
          className="relative rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          <Bell size={22} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Admin Profile */}
        <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
          <UserCircle size={34} className="text-blue-600" />

          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-800">Admin</p>

            <p className="text-xs text-gray-500">Administrator</p>
          </div>

          <ChevronDown size={18} className="text-gray-500" />
        </button>
      </div>
    </header>
  );
}