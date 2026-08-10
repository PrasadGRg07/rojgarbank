import { Outlet } from "react-router-dom";
import SettingMenu from "./SettingMenu";

export default function Settings() {
  return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <main className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your account settings and set preferences.
          </p>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-72">
              <SettingMenu />
            </div>
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
 
  );
}