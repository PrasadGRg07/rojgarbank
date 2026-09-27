import { useState } from "react";
import { Bell, MessageSquare, Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JobseekerAccountMenu from "./AccountMenu";

export default function Header({ user, onMenuClick, onLogout }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const displayName = user?.first_name
    ? `${user.first_name}${user.last_name ? " " + user.last_name : ""}`
    : user?.name || user?.username || user?.email || "Guest";

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(
        `/jobseeker/dashboard/jobs/search?search=${encodeURIComponent(search.trim())}`
      );
    }
  };

  const searchField = (
    <>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
        className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
      />
    </>
  );

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3 px-4 py-3 md:gap-6 md:px-8 md:py-4">
        <button
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
          className="-ml-2 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold text-gray-800 sm:text-xl md:text-2xl">
            Welcome back,{" "}
            <span className="font-semibold">{displayName}</span>
          </h1>

          <p className="hidden truncate text-sm text-gray-500 sm:block">
            Find your next opportunity today.
          </p>
        </div>

        {/* Search (md and up) */}
        <div className="relative hidden w-72 md:block">{searchField}</div>

        {/* Right actions */}
        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3 md:gap-5">
          <button
            onClick={() => navigate("/jobseeker/dashboard/messages/inbox")}
            aria-label="Messages"
            className="hidden rounded-full bg-gray-100 p-2.5 transition hover:bg-gray-200 sm:block sm:p-3"
          >
            <MessageSquare size={20} />
          </button>

          <button
            onClick={() => navigate("/jobseeker/dashboard/notifications")}
            aria-label="Notifications"
            className="relative rounded-full bg-gray-100 p-2.5 transition hover:bg-gray-200 sm:p-3"
          >
            <Bell size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 sm:right-2 sm:top-2" />
          </button>

          <JobseekerAccountMenu user={user} onLogout={onLogout} />
        </div>
      </div>

      {/* Search (below md) */}
      <div className="border-t border-gray-100 px-4 py-2.5 md:hidden">
        <div className="relative">{searchField}</div>
      </div>
    </header>
  );
}
