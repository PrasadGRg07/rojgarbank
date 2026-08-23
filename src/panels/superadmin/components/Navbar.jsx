import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ onMenuClick }) => {
  return (
    <div className="bg-white shadow-sm h-20 px-4 md:px-8 flex justify-between items-center">

      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-700 hover:text-gray-900"
          aria-label="Open sidebar"
        >
          <MenuIcon fontSize="medium" />
        </button>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 text-sm">Welcome back, Super Admin 👋</p>
        </div>
      </div>


      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">

          <SearchIcon className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2"
          />

        </div>

        {/* Notification */}

        <button className="relative">

          <NotificationsIcon fontSize="large" />

          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
            3
          </span>

        </button>

        {/* User */}

        <div className="flex items-center gap-2">

          <AccountCircleIcon fontSize="large" />

          <div>

            <h3 className="font-semibold">
              Super Admin
            </h3>

            <p className="text-xs text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Navbar;