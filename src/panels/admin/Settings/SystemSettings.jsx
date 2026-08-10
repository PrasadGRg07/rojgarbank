import { useState } from "react";
import { Save, MonitorCog } from "lucide-react";

export default function SystemSettings() {
  const [system, setSystem] = useState({
    maintenanceMode: false,
    registration: true,
    jobApproval: true,
    timezone: "Asia/Kathmandu",
    language: "English",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSystem({
      ...system,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(system);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-500 p-3">
            <MonitorCog size={26} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              System Settings
            </h1>

            <p className="text-sm text-slate-500">
              Manage application system configuration.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="space-y-5">
          {/* Maintenance */}

          <label className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <div>
              <p className="font-medium">Maintenance Mode</p>

              <p className="text-sm text-slate-500">
                Temporarily disable public access.
              </p>
            </div>

            <input
              type="checkbox"
              name="maintenanceMode"
              checked={system.maintenanceMode}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </label>

          {/* Registration */}

          <label className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <div>
              <p className="font-medium">User Registration</p>

              <p className="text-sm text-slate-500">
                Allow new users to create accounts.
              </p>
            </div>

            <input
              type="checkbox"
              name="registration"
              checked={system.registration}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </label>

          {/* Job Approval */}

          <label className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <div>
              <p className="font-medium">Job Approval Required</p>

              <p className="text-sm text-slate-500">
                Admin reviews jobs before publishing.
              </p>
            </div>

            <input
              type="checkbox"
              name="jobApproval"
              checked={system.jobApproval}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Timezone</label>

              <select
                name="timezone"
                value={system.timezone}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              >
                <option>Asia/Kathmandu</option>

                <option>UTC</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Language</label>

              <select
                name="language"
                value={system.language}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              >
                <option>English</option>

                <option>Nepali</option>
              </select>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700">
            <Save size={18} />
            Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
}
