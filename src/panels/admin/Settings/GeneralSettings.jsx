import { Save } from "lucide-react";
import { useState } from "react";

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    siteName: "Rojgar Bank",
    siteEmail: "admin@rojgarbank.com",
    phone: "+977 9800000000",
    timezone: "Asia/Kathmandu",
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(settings);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          General Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage basic application information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Site Name</label>

            <input
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              name="siteEmail"
              value={settings.siteEmail}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>

            <input
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Timezone</label>

            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            >
              <option>Asia/Kathmandu</option>

              <option>UTC</option>
            </select>
          </div>
        </div>

        <button className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
          <Save size={18} />
          Save Changes
        </button>
      </form>
    </div>
  );
}
