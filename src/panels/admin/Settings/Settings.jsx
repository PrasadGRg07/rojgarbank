import { Settings as SettingsIcon } from "lucide-react";

import SettingsCard from "./components/SettingsCard";
import { settingsCards } from "./data/settingsData";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-600 p-3">
            <SettingsIcon size={26} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Settings
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage application settings and system configurations.
            </p>
          </div>
        </div>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {settingsCards.map((card) => (
          <SettingsCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
