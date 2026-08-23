import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ onMenuClick }) => {
  return (
    <div className="bg-white shadow-sm h-16 md:h-20 px-4 md:px-8 flex justify-between items-center">

      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden shrink-0 text-gray-700 hover:text-gray-900"
          aria-label="Open sidebar"
        >
          <MenuIcon fontSize="medium" />
        </button>

        <div className="min-w-0">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 truncate">Dashboard</h2>
          <p className="text-gray-500 text-xs md:text-sm hidden sm:block">Welcome back, Super Admin 👋</p>
        </div>
      </div>

      {/* Right: Search (hidden on mobile) + Notification + User */}
      <div className="flex items-center gap-3 md:gap-5 shrink-0">

        {/* Search — hidden on mobile */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <SearchIcon className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2"
          />
        </div>

        {/* Notification — always visible */}
        <button className="relative shrink-0">
          <NotificationsIcon fontSize="medium" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User — always visible */}
        <div className="flex items-center gap-2 shrink-0">
          <AccountCircleIcon fontSize="large" />
          <div className="hidden sm:block">
            <h3 className="font-semibold text-sm">Super Admin</h3>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>

      </div>

    </div>

  );
};

export default Navbar;