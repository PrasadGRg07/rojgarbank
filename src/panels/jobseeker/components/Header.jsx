import React, { useState, useEffect } from "react";
import { Bell, MessageSquare, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ user }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Debug user object
  useEffect(() => {
    console.log(user);
    console.log("First Name:", user?.first_name);
    console.log("Last Name:", user?.last_name);
    console.log("Username:", user?.username);

  }, [user]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/jobseeker/dashboard/jobs?search=${search}`);
    }
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-8 py-4">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
              Welcome back,
              <span className="ml-1 font-semibold">
                {user?.first_name
                  ? `${user.first_name}${user.last_name ? " " + user.last_name : ""}`
                  : user?.name || user?.username || user?.email || "Guest"}{" "}
              </span>
            </h1>

        <p className="text-sm text-gray-500">
          Find your next opportunity today.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="w-72 rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* Messages */}
        <button
          onClick={() => navigate("/jobseeker/dashboard/message/inbox")}
          className="rounded-full bg-gray-100 p-3 hover:bg-gray-200"
        >
          <MessageSquare size={20} />

        </button>
        {/* Notifications */}
        <button
          onClick={() => navigate("/jobseeker/dashboard/notifications")}
          className="relative rounded-full bg-gray-100 p-3 hover:bg-gray-200"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3">

          <img
            src={
              user?.profile_picture ||
              user?.profile ||
              `https://ui-avatars.com/api/?name=${
                user?.first_name || user?.name || user?.username || user?.email || "Guest"
              }+${user?.last_name || ""}&background=06b6d4&color=fff`
            }
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />


          <div className="hidden md:block">

            <h4 className="font-semibold text-gray-700">
              {user?.first_name
                ? `${user.first_name}${user.last_name ? " " + user.last_name : ""}`
                : user?.name || user?.username || user?.email || "Guest"}
            </h4>

            <p className="text-xs text-gray-500">
              Job Seeker
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}