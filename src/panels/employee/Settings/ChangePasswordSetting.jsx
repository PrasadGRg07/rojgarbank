import { useState } from "react";
import api from "../../../lib/api";

export default function ChangePasswordSetting() {
  const [form, setForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setMsg("");
    setError("");
    if (form.new_password !== form.confirm_password) {
      setError("New passwords do not match.");
      return;
    }
    try {
      await api.post("/auth/change-password/", {
        current_password: form.current_password,
        new_password: form.new_password,
      });
      setMsg("Password changed successfully.");
      setForm({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to change password.");
    }
  };

  return (
    <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-lg space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Change Password</h2>
          <p className="text-slate-500">Update your account password.</p>
        </div>

        {msg && <p className="text-sm text-green-600">{msg}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="grid gap-6">
          {[
            { label: "Current Password", name: "current_password" },
            { label: "New Password", name: "new_password" },
            { label: "Confirm New Password", name: "confirm_password" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="font-semibold block mb-2">{label}</label>
              <input
                type="password"
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
