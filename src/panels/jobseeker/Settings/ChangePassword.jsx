import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { changePassword } from "../../../lib/jobseekerApi";
const FIELDS = [
  { key: "current", label: "Current Password", placeholder: "Current Password" },
  { key: "next", label: "New Password", placeholder: "New Password" },
  { key: "confirm", label: "Confirm New Password", placeholder: "Confirm Password" },
];

const INITIAL_STATE = { current: "", next: "", confirm: "" };

function PasswordField({ label, placeholder, value, onChange, visible, onToggleVisible }) {
  return (
    <div>
      <label htmlFor={placeholder} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={placeholder}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-11 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
        <button
          type="button"
          onClick={onToggleVisible}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export default function ChangePassword() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [visibility, setVisibility] = useState({});
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setError("");
    setSaved(false);
  };

  const toggleVisible = (key) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.current || !form.next || !form.confirm) {
    setError("Please fill in all fields.");
    return;
  }

  if (form.next.length < 8) {
    setError("New password must be at least 8 characters.");
    return;
  }

  if (form.next !== form.confirm) {
    setError("New password and confirmation do not match.");
    return;
  }

  try {
    await changePassword({
      current_password: form.current,
      new_password: form.next,
      confirm_password: form.confirm,
    });

    setForm(INITIAL_STATE);
    setSaved(true);

  } catch (error) {
    console.error(error);

    setError(
      error.response?.data?.detail ||
      "Password update failed."
    );
  }
};

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {FIELDS.map(({ key, label, placeholder }) => (
          <PasswordField
            key={key}
            label={label}
            placeholder={placeholder}
            value={form[key]}
            onChange={handleChange(key)}
            visible={!!visibility[key]}
            onToggleVisible={() => toggleVisible(key)}
          />
        ))}

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <div className="flex flex-col-reverse items-center gap-3 sm:flex-row">
          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 sm:w-auto"
          >
            Update Password
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <Check size={16} />
              Password updated
            </span>
          )}
        </div>
      </form>
    </div>
  );
}