import React, { memo, useCallback, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logoo.jpeg";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Search,
  CreditCard,
  Settings,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  X,
  UserCircle,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/employee/dashboard",
  },

  {
    title: "My Profile",
    icon: UserCircle,
    path: "/employee/dashboard/my-profile",
  },

  {
    title: "Vacancy",
    icon: Briefcase,

    children: [
      {
        title: "Dashboard",
        path: "/employee/dashboard",
      },

      {
        title: "My Jobs",
        path: "/employee/dashboard/jobs",
      },

      {
        title: "Post Job",
        path: "/employee/dashboard/jobs/create",
      },
    ],
  },

  {
    title: "Resume Search",
    icon: Search,

    children: [
      {
        title: "Search Candidates",
        path: "/employee/dashboard/search-candidates",
      },

      {
        title: "Saved Candidates",
        path: "/employee/dashboard/saved-candidates",
      },
    ],
  },

  {
    title: "ATS",
    icon: Users,

    children: [
      {
        title: "Pipeline",
        path: "/employee/dashboard/ats/pipeline",
      },

      {
        title: "Interviews",
        path: "/employee/dashboard/ats/interviews",
      },
    ],
  },

  {
    title: "Subscription",
    icon: CreditCard,
    path: "/employee/dashboard/subscription",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    children: [
      {
        title: "Inbox",
        icon: MessageSquare,
        path: "/employee/dashboard/messages/inbox",
      },
    ],
  },

  {
    title: "Settings",
    icon: Settings,
    path: "/employee/dashboard/settings",
  },
];

function Sidebar({ mobileOpen, onClose, user }) {
  const [expanded, setExpanded] = useState("Vacancy");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/employee/login");
  };

  const items = useMemo(() => navigation, []);

  const toggleMenu = useCallback((title) => {
    setExpanded((prev) => (prev === title ? "" : title));
  }, []);
  return (
    <>
      {/* Mobile Overlay */}

      {mobileOpen && (
        <div
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}

      <aside
        className={` flex flex-col fixed left-0 top-0 z-50 h-screen w-72 bg-white border-r border-slate-200 shadow-xl transition-transform duration-300 lg:static lg:translate-x-0          
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ================= LOGO ================= */}
    

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Employer Panel</h2>

            <p className="text-sm text-slate-500">Recruitment Dashboard</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <div className="flex-1 min-h-0 space-y-2 overflow-y-auto p-4">
          {items.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children;
            const isExpanded = expanded === item.title;

            // Normal menu item
            if (!hasChildren) {
              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              );
            }

            // Expandable menu
            return (
              <div
                key={item.title}
                className="overflow-hidden rounded-xl border border-slate-100"
              >
                <button
                  type="button"
                  onClick={() => toggleMenu(item.title)}
                  className="flex w-full items-center justify-between px-4 py-3 transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-slate-700" />

                    <span className="font-medium text-slate-700">
                      {item.title}
                    </span>
                  </div>

                  {isExpanded ? (
                    <ChevronUp
                      size={18}
                      className="text-slate-500 transition-transform"
                    />
                  ) : (
                    <ChevronDown
                      size={18}
                      className="text-slate-500 transition-transform"
                    />
                  )}
                </button>

                {isExpanded && (
                  <div className="space-y-1 bg-slate-50 p-2">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `block rounded-lg px-4 py-2.5 text-sm transition ${
                            isActive
                              ? "bg-blue-600 font-semibold text-white"
                              : "text-slate-600 hover:bg-white hover:text-blue-600"
                          }`
                        }
                      >
                        {child.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto bg-white p-5">
          <div className="mt-5 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 p-4 text-center">
            <h3 className="font-semibold text-slate-700">Rojgar Bank</h3>
            <p className="mt-1 text-xs text-slate-500">
              Connecting talented people with great opportunities.
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-medium text-green-600">
                System Online
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default memo(Sidebar);
