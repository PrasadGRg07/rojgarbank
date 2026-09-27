import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getProfile } from "../../../lib/jobseekerApi";
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
  ChevronDown,
  ChevronRight,
  History,
  Award,
  GraduationCap,
  FolderOpen,
  Sparkles,
  X,
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
 title:"Settings",
    icon: Settings,
 path:"/jobseeker/dashboard/job-settings",
}
];

export default function Sidebar({ user, onClose }) {
  const [profilePicture, setProfilePicture] = useState(null);

  const [openMenus, setOpenMenus] = useState({
    Jobs: true,
    Applications: false,
    Profile: false,
    Settings: false,
  });

  useEffect(() => {
    getProfile()
      .then((res) => {
        const pic = res?.data?.profile_picture || res?.data?.profile?.profile_picture;
        if (pic) setProfilePicture(pic);
      })
      .catch(() => {}); // silently ignore if fails
  }, [user]);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <aside className="flex h-full w-[85vw] max-w-80 flex-shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-100 shadow-xl">
      {/* ================= LOGO ================= */}

      <div className="flex items-center justify-between gap-2 border-b border-cyan-100 bg-gradient-to-r from-cyan-600 to-blue-600 p-4 sm:gap-4 sm:p-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-white/20 backdrop-blur sm:h-14 sm:w-20">

  <img
    src={logo}
    alt="Rojgar Bank"
    className="h-full w-full object-cover"
    loading="eager"
  />

</div>

          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-white sm:text-2xl">
              Rojgar Bank
            </h1>

            <p className="truncate text-sm text-cyan-100">
              Job Seeker Portal
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="-mr-1 flex-shrink-0 rounded-lg p-1 text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
        >
          <X size={24} />
        </button>
      </div>

      {/* ================= USER CARD ================= */}

      <div className="border-b border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={
                profilePicture ||
                user?.profile_picture ||
                user?.profile ||
                `https://ui-avatars.com/api/?background=0891b2&color=fff&name=${user?.first_name || user?.name || "U"}+${user?.last_name || ""}`
              }
              alt="Profile"
              className="h-14 w-14 rounded-2xl border-4 border-cyan-100 object-cover sm:h-16 sm:w-16"
            />

            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
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

      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5">
        {menuItems.map((item) => {
        const Icon = item.icon;

        if (item.children) {
          return (
            <div
              key={item.title}
              className="mb-1 overflow-hidden rounded-2xl"
            >
              <button
                onClick={() => toggleMenu(item.title)}
                aria-expanded={Boolean(openMenus[item.title])}
                className="group flex w-full items-center justify-between rounded-2xl px-3 py-2.5 font-medium text-slate-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700 sm:px-4 sm:py-3"
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
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-cyan-100 pl-3 sm:ml-6 sm:pl-4">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;

                    return (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300 ${
                            isActive
                              ? "bg-cyan-600 font-semibold text-white shadow-md"
                              : "text-slate-600 hover:bg-cyan-50 hover:text-cyan-700"
                          }`
                        }
                      >
                        <ChildIcon size={16} className="flex-shrink-0" />
                        <span className="truncate">{child.title}</span>
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
            onClick={onClose}
            className={({ isActive }) =>
              `group mb-1 flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300 sm:px-4 sm:py-3 ${
                isActive
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "text-slate-700 hover:bg-cyan-50 hover:text-cyan-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`flex-shrink-0 rounded-xl p-2 transition ${
                    isActive
                      ? "bg-white/20"
                      : "bg-slate-100 group-hover:bg-cyan-100"
                  }`}
                >
                  <Icon size={19} />
                </div>

                <span className="truncate font-medium">
                  {item.title}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
      </nav>

      {/* ================= FOOTER ================= */}

   
        

        <div className="mt-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 p-4 text-center">
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

    </aside>
  );
}