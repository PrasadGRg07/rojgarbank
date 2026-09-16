import React, { memo, useCallback, useMemo, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../../lib/api";
import logo from "../../../assets/logoo.jpeg";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Search,
  CreditCard,
  Settings,
  ChevronDown,
  ChevronRight,
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
      { title: "My Jobs", path: "/employee/dashboard/jobs", icon: Briefcase },
      { title: "Post Job", path: "/employee/dashboard/jobs/create", icon: Briefcase },
    ],
  },
  {
    title: "Resume Search",
    icon: Search,
    children: [
      { title: "Search Candidates", path: "/employee/dashboard/search-candidates", icon: Search },
      { title: "Saved Candidates", path: "/employee/dashboard/saved-candidates", icon: Search },
    ],
  },
  {
    title: "ATS",
    icon: Users,
    children: [
      { title: "Pipeline", path: "/employee/dashboard/ats/pipeline", icon: Users },
      { title: "Interviews", path: "/employee/dashboard/ats/interviews", icon: Users },
    ],
  },
  {
    title: "Messages",
    icon: MessageSquare,
    children: [
      { title: "Inbox", path: "/employee/dashboard/messages/inbox", icon: MessageSquare },
    ],
  },
  {
    title: "Subscription",
    icon: CreditCard,
    path: "/employee/dashboard/subscription",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/employee/dashboard/settings",
  },
];

function Sidebar({ mobileOpen, onClose, user }) {
  const [openMenus, setOpenMenus] = useState({
    Vacancy: true,
    "Resume Search": false,
    ATS: false,
    Messages: false,
  });

  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    api.get("/auth/update-profile/")
      .then((res) => {
        if (res.data?.profile_picture) {
          setProfilePicture(res.data.profile_picture);
        }
      })
      .catch(() => {});
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/employee/login");
  };

  const items = useMemo(() => navigation, []);

  const toggleMenu = useCallback((title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }, []);

  const companyName = user?.company_name || user?.company || user?.name || user?.username || "Employer";
  const companyInitial = companyName.charAt(0).toUpperCase();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40 lg:hidden" />
      )}

      {/* Sidebar */}
      <aside
        className={`flex h-screen w-80 flex-shrink-0 flex-col border-r border-slate-200 bg-slate-50 shadow-xl fixed left-0 top-0 z-50 transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ================= LOGO ================= */}
        <div className="flex items-center justify-between border-b border-blue-200 bg-blue-600 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-16 overflow-hidden rounded-xl bg-white/20 backdrop-blur shadow-sm">
              <img src={logo} alt="Rojgar Bank" className="h-full w-full object-cover p-1 bg-white" loading="eager" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Rojgar Bank</h1>
              <p className="text-xs text-blue-100">Employer Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-white/70 hover:bg-white/20 hover:text-white lg:hidden transition">
            <X size={18} />
          </button>
        </div>

        {/* ================= USER CARD ================= */}
        <div className="border-b border-slate-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-blue-100 bg-blue-600 text-2xl font-bold text-white shadow-sm">
                {profilePicture || user?.profile_picture ? (
                  <img src={profilePicture || user.profile_picture} alt="Profile" className="h-full w-full object-cover bg-white" />
                ) : (
                  companyInitial
                )}
              </div>
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-bold text-slate-800">{companyName}</h2>
              <p className="text-sm font-medium text-blue-600">Employer</p>
              <p className="truncate text-xs text-slate-500">{user?.email || "Employer Account"}</p>
            </div>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-5">
          {items.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children;

            if (hasChildren) {
              return (
                <div key={item.title} className="overflow-hidden rounded-2xl mb-1">
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className="group flex w-full items-center justify-between rounded-2xl px-4 py-3 font-medium text-slate-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-slate-200 p-2 transition group-hover:bg-blue-100">
                        <Icon size={19} />
                      </div>
                      <span>{item.title}</span>
                    </div>
                    {openMenus[item.title] ? (
                      <ChevronDown size={18} className="text-blue-600 transition-transform duration-300" />
                    ) : (
                      <ChevronRight size={18} className="transition-transform duration-300" />
                    )}
                  </button>

                  {openMenus[item.title] && (
                    <div className="ml-6 mt-2 mb-2 space-y-1 border-l-2 border-blue-100 pl-4">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon || Icon;
                        return (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300 ${
                                isActive
                                  ? "bg-blue-600 font-semibold text-white shadow-md"
                                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
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
                end={item.path === "/employee/dashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  `group mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`rounded-xl p-2 transition ${isActive ? "bg-white/20" : "bg-slate-200 group-hover:bg-blue-100"}`}>
                      <Icon size={19} />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </>
                )}
              </NavLink>
            );
          })}

        </nav>

        {/* ================= FOOTER ================= */}
        <div className="mt-auto bg-white p-5 border-t border-slate-200">
          <div className="rounded-2xl bg-blue-50 p-4 text-center">
            <h3 className="font-semibold text-slate-700">Rojgar Bank</h3>
            <p className="mt-1 text-xs text-slate-500">Connecting talented people with great opportunities.</p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-medium text-green-600">System Online</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default memo(Sidebar);
