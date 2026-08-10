import React, { memo } from "react";
import { Menu, Bell } from "lucide-react";

import logo from "../../../assets/logoo.jpeg";
import AccountMenu from "./AccountMenu";

function Header({
  user,
  onMenuClick,
  onLogout,
  notificationCount = 0,
}) {
  return (
    <header className="sticky top-0 z-40 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 transition hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <img
            src={logo}
            alt="Rojgar Bank"
            className="h-12 w-auto object-contain"
            loading="eager"
          />

          {/* Title */}
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-slate-800">
              Employer Dashboard
            </h1>

            <p className="text-sm text-slate-500">
              Welcome back,
              <span className="ml-1 font-semibold">
                {user?.company_name ||
                  user?.company ||
                  user?.name ||
                  user?.username ||
                  "Employer"}
              </span>
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button
            className="
              relative
              rounded-xl
              border
              border-slate-200
              p-2.5
              transition
              hover:bg-slate-100
            "
          >
            <Bell size={20} />

            {notificationCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-xs
                  font-bold
                  text-white
                "
              >
                {notificationCount}
              </span>
            )}
          </button>

          {/* Account Menu */}
          <AccountMenu
            user={user}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
}

export default memo(Header);