import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Bookmark,
  Briefcase,
  FileText,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  History,
  Shield,
  Lock,
  Award,
  GraduationCap,
  FolderOpen,
  Sparkles,
} from "lucide-react";
import logo from "../../../assets/logoo.jpeg";

const menuItems = [

  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/jobseeker/dashboard",
  },

  {
    title: "Jobs",
    icon: Briefcase,
    children: [
      {
        title: "Search Jobs",
        icon: Search,
        path: "/jobseeker/dashboard/jobs/search",
      },
      {
        title: "Recommended Jobs",
        icon: Sparkles,
        path: "/jobseeker/dashboard/jobs/recommended-jobs",
      },
      {
        title: "Saved Jobs",
        icon: Bookmark,
        path: "/jobseeker/dashboard/jobs/saved-jobs",
      },
    ],
  },

  {
    title: "Applications",
    icon: FileText,
    children: [
      {
        title: "Applied Jobs",
        icon: Briefcase,
        path: "/jobseeker/dashboard/applications",
      },
      {
        title: "History",
        icon: History,
        path: "/jobseeker/dashboard/applications/history",
      },
    ],
  },

  {
    title: "Profile",
    icon: User,
    children: [
      {
        title: "My Profile",
        icon: User,
        path: "/jobseeker/dashboard/profile",
      },
      {
        title: "Edit Profile",
        icon: User,
        path: "/jobseeker/dashboard/profile/edit",
      },
      {
        title: "Resume",
        icon: FileText,
        path: "/jobseeker/dashboard/profile/resume",
      },
      {
        title: "Skills",
        icon: Award,
        path: "/jobseeker/dashboard/profile/skills",
      },
      {
        title: "Education",
        icon: GraduationCap,
        path: "/jobseeker/dashboard/profile/education",
      },
      {
        title: "Experience",
        icon: Briefcase,
        path: "/jobseeker/dashboard/profile/experience",
      },
      {
        title: "Certifications",
        icon: Award,
        path: "/jobseeker/dashboard/profile/certifications",
      },
      {
        title: "Portfolio",
        icon: FolderOpen,
        path: "/jobseeker/dashboard/profile/portfolio",
      },
    ],
  },

  {
    title: "Messages",
    icon: MessageSquare,
    children: [
      {
        title: "Inbox",
        icon: MessageSquare,
        path: "/jobseeker/dashboard/messages/inbox",
      },

    ]

  },

  {
    title: "Notifications",
    icon: Bell,
    path: "/jobseeker/dashboard/notifications",
  },

  {
    title: "Settings",
    icon: Settings,
    path: "/jobseeker/dashboard/job-settings",
  }
];

export default function Sidebar({ user }) {
  const navigate = useNavigate();

  const [openMenus, setOpenMenus] = useState({
    Jobs: true,
    Applications: false,
    Profile: false,
    Settings: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/jobseeker/login");
  };

  return (
    <aside className="flex h-screen w-80 flex-shrink-0 flex-col border-r border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-100 shadow-xl">
      {/* ================= LOGO ================= */}

      <div className="border-b border-cyan-100 bg-gradient-to-r from-cyan-600 to-blue-600 p-6">
        <div className="flex items-center gap-4">
          <div className="h-18 w-25 overflow-hidden rounded-2xl bg-white/20 backdrop-blur">

            <img
              src={logo}
              alt="Rojgar Bank"
              className="h-full w-full object-cover"
              loading="eager"
            />

          </div>

          <div>


            <h1 className="text-2xl font-bold text-white">
              Rojgar Bank
            </h1>

            <p className="text-sm text-cyan-100">
              Job Seeker Portal
            </p>
          </div>
        </div>
      </div>

      {/* ================= USER CARD ================= */}

      <div className="border-b border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={
                user?.profile_picture ||
                user?.profile ||
                `https://ui-avatars.com/api/?background=0891b2&color=fff&name=${user?.first_name || user?.name || "U"}+${user?.last_name || ""}`
              }
              alt="Profile"
              className="h-16 w-16 rounded-2xl border-4 border-cyan-100 object-cover"
            />

            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-bold text-slate-800">
              {user?.first_name} {user?.last_name}
            </h2>

            <p className="text-sm font-medium text-cyan-600">
              Job Seeker
            </p>

            <p className="truncate text-xs text-slate-500">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}

      <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          if (item.children) {
            return (
              <div
                key={item.title}
                className="overflow-hidden rounded-2xl"
              >
                <button
                  onClick={() => toggleMenu(item.title)}
                  className="group flex w-full items-center justify-between rounded-2xl px-4 py-3 font-medium text-slate-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-slate-100 p-2 transition group-hover:bg-cyan-100">
                      <Icon size={19} />
                    </div>

                    <span>{item.title}</span>
                  </div>

                  {openMenus[item.title] ? (
                    <ChevronDown
                      size={18}
                      className="text-cyan-600 transition-transform duration-300"
                    />
                  ) : (
                    <ChevronRight
                      size={18}
                      className="transition-transform duration-300"
                    />
                  )}
                </button>

                {openMenus[item.title] && (
                  <div className="ml-6 mt-2 space-y-1 border-l-2 border-cyan-100 pl-4">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;

                      return (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300 ${isActive
                              ? "bg-cyan-600 font-semibold text-white shadow-md"
                              : "text-slate-600 hover:bg-cyan-50 hover:text-cyan-700"
                            }`
                          }
                        >
                          <ChildIcon size={16} />
                          <span>{child.title}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${isActive
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "text-slate-700 hover:bg-cyan-50 hover:text-cyan-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`rounded-xl p-2 transition ${isActive
                        ? "bg-white/20"
                        : "bg-slate-100 group-hover:bg-cyan-100"
                      }`}
                  >
                    <Icon size={19} />
                  </div>

                  <span className="font-medium">
                    {item.title}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ================= FOOTER ================= */}

      <div className="bg-white p-5">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          <LogOut
            size={20}
            className="transition-transform duration-300 group-hover:rotate-12"
          />

          Logout
        </button>

        <div className="mt-5 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 p-4 text-center">
          <h3 className="font-semibold text-slate-700">
            Rojgar Bank
          </h3>

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
  );
}