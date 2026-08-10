import { useState } from "react";

const OPTIONS = [
  {
    key: "email",
    title: "Email Notifications",
    desc: "Receive important updates through email",
  },
  {
    key: "jobs",
    title: "Job Recommendations",
    desc: "Get recommended jobs based on your profile",
  },
  {
    key: "applications",
    title: "Application Updates",
    desc: "Receive application status updates",
  },
  {
    key: "marketing",
    title: "Marketing Emails",
    desc: "Receive promotional emails",
  },
];

const INITIAL_STATE = {
  email: true,
  jobs: true,
  applications: true,
  marketing: false,
};

function ToggleRow({ title, desc, checked, onToggle, isLast }) {
  return (
    <div
      className={`flex items-start justify-between gap-4 pb-5 ${
        isLast ? "" : "border-b border-slate-100"
      }`}
    >
      <div className="min-w-0">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="mt-0.5 text-sm text-slate-500">{desc}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={onToggle}
        className={`relative h-6 w-11 shrink-0 rounded-full transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 ${
          checked ? "bg-cyan-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function NotificationSettings() {
  const [settings, setSettings] = useState(INITIAL_STATE);

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
        Notification Settings
      </h2>

      <div className="mt-6 space-y-5">
        {OPTIONS.map((item, i) => (
          <ToggleRow
            key={item.key}
            title={item.title}
            desc={item.desc}
            checked={settings[item.key]}
            onToggle={() => toggle(item.key)}
            isLast={i === OPTIONS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}