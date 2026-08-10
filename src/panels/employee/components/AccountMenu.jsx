import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  ChevronDown,
  User,
  Settings,
  CreditCard,
  Briefcase,
  LogOut,
  Building2,
} from "lucide-react";

function AccountMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const companyName =
    user?.company_name ||
    user?.company ||
    user?.name ||
    user?.username ||
    "Your Company";

  const role =
    user?.role ||
    "Employer";

  const menuItems = [
    {
      label: "My Profile",
      icon: User,
      path: "/employee/dashboard/my-profile",
    },
    {
      label: "Live Jobs",
      icon: Briefcase,
      path: "/employee/dashboard/jobs",
    },
    {
      label: "Subscription",
      icon: CreditCard,
      path: "/employee/dashboard/subscription",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/employee/dashboard/settings",
    },
  ];

  return (
    <div
      className="relative"
      ref={menuRef}
    >
      {/* Profile Button */}

      <button
        onClick={toggleMenu}
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-slate-200
          bg-white
          px-3
          py-2
          shadow-sm
          transition
          hover:shadow-md
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-blue-100
            overflow-hidden
          "
        >
          {user?.profile_picture || user?.profile ? (
            <img
              src={user.profile_picture || user.profile}
              alt="Company Logo"
              className="h-full w-full object-cover"
            />
          ) : (
            <Building2
              className="text-blue-600"
              size={20}
            />
          )}
        </div>

        <div className="hidden text-left sm:block">
          <h4 className="text-sm font-semibold text-slate-800">
            {companyName}
          </h4>

          <p className="text-xs text-slate-500">
            {role}
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-72
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-2xl
            z-50
          "
        >
          {/* Header */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 overflow-hidden">
                {user?.profile_picture || user?.profile ? (
                  <img
                    src={user.profile_picture || user.profile}
                    alt="Company Logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Building2 size={26} />
                )}
              </div>

              <div>
                <h3 className="font-semibold">
                  {companyName}
                </h3>

                <p className="text-sm text-blue-100">
                  {role}
                </p>

                <p className="text-xs text-blue-200">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu */}

          <div className="p-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false);
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-left
                    transition
                    hover:bg-slate-100
                  "
                >
                  <Icon
                    size={18}
                    className="text-slate-600"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-200 p-2">
            <button
              onClick={onLogout}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-left
                text-red-600
                transition
                hover:bg-red-50
              "
            >
              <LogOut size={18} />

              <span className="font-medium">
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(AccountMenu);