import { useState } from "react";

const OPTIONS = [
  { key: "showProfile", label: "Show profile to employers" },
  { key: "allowResumeDownload", label: "Allow resume download" },
  { key: "showEmail", label: "Show email address" },
];

const INITIAL_STATE = {
  showProfile: true,
  allowResumeDownload: true,
  showEmail: false,
};

export default function PrivacySettings() {
  const [settings, setSettings] = useState(INITIAL_STATE);

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
        Privacy Settings
      </h2>

      <div className="mt-6 space-y-4">
        {OPTIONS.map(({ key, label }) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              checked={settings[key]}
              onChange={() => toggle(key)}
              className="h-4 w-4 shrink-0 accent-cyan-600"
            />
            <span className="text-slate-700">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}