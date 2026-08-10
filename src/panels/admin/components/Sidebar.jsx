import { NavLink, useNavigate } from "react-router-dom";
import { X, LogOut } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileText,
  BookOpen,
  CalendarDays,
  GraduationCap,
  BarChart3,
  PieChart,
  Bell,
  MessageSquare,
  Shield,
  Settings,
  
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { title: "Users", icon: Users, path: "/admin/dashboard/users" },
    { title: "Employers", icon: Building2, path: "/admin/dashboard/employers" },
    { title: "Subscriptions", icon: Briefcase, path: "/admin/dashboard/subscriptions" },
    { title: "Jobs", icon: Briefcase, path: "/admin/dashboard/jobs" },
    { title: "Applications", icon: FileText, path: "/admin/dashboard/applications" },
    { title: "Blogs", icon: BookOpen, path: "/admin/dashboard/blogs" },
    { title: "Events", icon: CalendarDays, path: "/admin/dashboard/events" },
    { title: "Training", icon: GraduationCap, path: "/admin/dashboard/training" },
    { title: "Reports", icon: BarChart3, path: "/admin/dashboard/reports" },
    { title: "Analytics", icon: PieChart, path: "/admin/dashboard/analytics" },
    { title: "Notifications", icon: Bell, path: "/admin/dashboard/notifications" },
    { title: "Messages", icon: MessageSquare, path: "/admin/dashboard/messages" },
    { title: "Audit", icon: Shield, path: "/admin/dashboard/audit" },
    { title: "Settings", icon: Settings, path: "/admin/dashboard/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-40
          h-screen w-72
          bg-slate-900 text-white flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <h1 className="text-xl font-bold">Rojgar Bank</h1>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 mx-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800 p-4">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl"
          >
            <LogOut
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}