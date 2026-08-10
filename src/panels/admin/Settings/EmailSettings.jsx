import { useState } from "react";
import { Save, Mail } from "lucide-react";

export default function EmailSettings() {
  const [email, setEmail] = useState({
    emailNotifications: true,
    senderName: "Rojgar Bank",
    senderEmail: "noreply@rojgarbank.com",
    userRegistration: true,
    jobApproval: true,
    applicationUpdates: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEmail({
      ...email,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-500 p-3">
            <Mail size={26} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Email Settings
            </h1>

            <p className="text-sm text-slate-500">
              Manage email notifications and sender configuration.
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
          <label className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <div>
              <p className="font-medium">Enable Email Notifications</p>

              <p className="text-sm text-slate-500">
                Send automated emails to users.
              </p>
            </div>

            <input
              type="checkbox"
              name="emailNotifications"
              checked={email.emailNotifications}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Sender Name
              </label>

              <input
                name="senderName"
                value={email.senderName}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Sender Email
              </label>

              <input
                name="senderEmail"
                value={email.senderEmail}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          {/* Email Events */}

          <div className="space-y-3 pt-4">
            <h3 className="font-semibold">Email Events</h3>

            <label className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
              <span>User Registration</span>

              <input
                type="checkbox"
                name="userRegistration"
                checked={email.userRegistration}
                onChange={handleChange}
                className="h-5 w-5"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
              <span>Job Approval Updates</span>

              <input
                type="checkbox"
                name="jobApproval"
                checked={email.jobApproval}
                onChange={handleChange}
                className="h-5 w-5"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
              <span>Application Updates</span>

              <input
                type="checkbox"
                name="applicationUpdates"
                checked={email.applicationUpdates}
                onChange={handleChange}
                className="h-5 w-5"
              />
            </label>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-white hover:bg-amber-600">
            <Save size={18} />
            Save Email Settings
          </button>
        </div>
      </form>
    </div>
  );
}
