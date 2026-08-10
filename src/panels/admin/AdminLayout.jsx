import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-20 flex h-16 items-center bg-blue-600 px-4 shadow">
          <button onClick={() => setIsOpen(true)}>
            <Menu size={28} />
          </button>

          <h1 className="ml-4 text-lg font-bold">Admin Panel</h1>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}