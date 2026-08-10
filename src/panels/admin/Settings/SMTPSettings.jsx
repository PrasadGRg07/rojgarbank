import { useState } from "react";
import { Save, Server } from "lucide-react";

export default function SMTPSettings() {
  const [smtp, setSmtp] = useState({
    host: "smtp.gmail.com",
    port: "587",
    username: "",
    password: "",
    encryption: "TLS",
    enabled: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSmtp({
      ...smtp,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(smtp);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500 p-3">
            <Server size={26} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              SMTP Settings
            </h1>

            <p className="text-sm text-slate-500">
              Configure SMTP server for outgoing emails.
            </p>
          </div>
        </div>
      </div>

      {/* SMTP Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="space-y-5">
          <label className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <div>
              <p className="font-medium">Enable SMTP</p>

              <p className="text-sm text-slate-500">
                Use custom SMTP server for emails.
              </p>
            </div>

            <input
              type="checkbox"
              name="enabled"
              checked={smtp.enabled}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                SMTP Host
              </label>

              <input
                name="host"
                value={smtp.host}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Port</label>

              <input
                name="port"
                value={smtp.port}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Username</label>

              <input
                name="username"
                value={smtp.username}
                onChange={handleChange}
                placeholder="SMTP username"
                className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>

              <input
                type="password"
                name="password"
                value={smtp.password}
                onChange={handleChange}
                placeholder="SMTP password"
                className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Encryption</label>

            <select
              name="encryption"
              value={smtp.encryption}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            >
              <option>TLS</option>

              <option>SSL</option>

              <option>None</option>
            </select>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-white hover:bg-cyan-700">
            <Save size={18} />
            Save SMTP Settings
          </button>
        </div>
      </form>
    </div>
  );
}
