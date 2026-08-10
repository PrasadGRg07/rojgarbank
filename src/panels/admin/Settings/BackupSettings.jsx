import { useState } from "react";
import { Save, DatabaseBackup, Download, Upload } from "lucide-react";

export default function BackupSettings() {
  const [backup, setBackup] = useState({
    autoBackup: true,
    frequency: "Daily",
    storage: "Local Storage",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setBackup({
      ...backup,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(backup);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-500 p-3">
            <DatabaseBackup size={26} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Backup Settings
            </h1>

            <p className="text-sm text-slate-500">
              Manage database backup and restore options.
            </p>
          </div>
        </div>
      </div>

      {/* Backup Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="space-y-5">
          <label className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <div>
              <p className="font-medium">Automatic Backup</p>

              <p className="text-sm text-slate-500">
                Automatically create backups.
              </p>
            </div>

            <input
              type="checkbox"
              name="autoBackup"
              checked={backup.autoBackup}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Backup Frequency
              </label>

              <select
                name="frequency"
                value={backup.frequency}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              >
                <option>Daily</option>

                <option>Weekly</option>

                <option>Monthly</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Storage Location
              </label>

              <select
                name="storage"
                value={backup.storage}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              >
                <option>Local Storage</option>

                <option>Cloud Storage</option>
              </select>
            </div>
          </div>

          {/* Actions */}

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              <Download size={18} />
              Create Backup
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-slate-700 px-5 py-3 text-white hover:bg-slate-800"
            >
              <Upload size={18} />
              Restore Backup
            </button>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">
            <Save size={18} />
            Save Backup Settings
          </button>
        </div>
      </form>
    </div>
  );
}
