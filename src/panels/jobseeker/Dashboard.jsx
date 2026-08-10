import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">

      <Sidebar user={user} />

      <div className="flex flex-1 flex-col">

              <Header user={user} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}