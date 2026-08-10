import { useState } from "react";
import { Save, ShieldCheck } from "lucide-react";

export default function SecuritySettings() {
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: true,
    loginAlert: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSecurity({
      ...security,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(security);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-500 p-3">
            <ShieldCheck className="text-white" size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Security Settings
            </h1>

            <p className="text-sm text-slate-500">
              Manage password and account security options.
            </p>
          </div>
        </div>
      </div>

      {/* Security Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={security.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={security.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={security.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          {/* Toggles */}

          <div className="space-y-4 pt-4">
            <label className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
              <div>
                <p className="font-medium">Two Factor Authentication</p>

                <p className="text-sm text-slate-500">
                  Add extra protection to admin login.
                </p>
              </div>

              <input
                type="checkbox"
                name="twoFactor"
                checked={security.twoFactor}
                onChange={handleChange}
                className="h-5 w-5"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
              <div>
                <p className="font-medium">Login Alerts</p>

                <p className="text-sm text-slate-500">
                  Receive alerts for new login attempts.
                </p>
              </div>

              <input
                type="checkbox"
                name="loginAlert"
                checked={security.loginAlert}
                onChange={handleChange}
                className="h-5 w-5"
              />
            </label>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700">
            <Save size={18} />
            Save Security Settings
          </button>
        </div>
      </form>
    </div>
  );
}
