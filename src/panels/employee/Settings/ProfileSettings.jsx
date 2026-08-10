import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../lib/api";

export default function ProfileSettings() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const handleEmail = async () => {
    try {
      await api.post("/auth/update-email/", { email });
      setMsg("Email update request sent.");
    } catch {
      setMsg("Failed to send email update.");
    }
  };

  const handlePhone = async () => {
    try {
      await api.post("/auth/send-otp/", { phone });
      setMsg("OTP sent to your phone.");
    } catch {
      setMsg("Failed to send OTP.");
    }
  };

  return (
    <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <p className="text-slate-500">Manage your email and phone settings.</p>
        </div>

        {msg && <p className="text-sm text-blue-600">{msg}</p>}

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <label className="font-semibold">Existing Email:</label>
              <span className="text-slate-600">{user?.email || "Not set"}</span>
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="New Email"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleEmail}
              className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
            >
              Send Email
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <label className="font-semibold">Existing Phone Number:</label>
              <span className="text-slate-600">{user?.phone || user?.phone_number || "Not set"}</span>
            </div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="New Phone Number"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handlePhone}
              className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
            >
              Send OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
