import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Link2,
  Briefcase,
  Users,
  Info,
  Edit3,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profileRes, statsRes] = await Promise.all([
          api.get("/auth/update-profile/"),
          api.get("/employee/dashboard/"),
        ]);
        setProfile({ ...profileRes.data, ...statsRes.data });
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-red-500 gap-2">
        <AlertCircle className="h-10 w-10" />
        <p>{error}</p>
      </div>
    );
  }

  const companyName = profile?.company_name || user?.company_name || user?.company || "—";
  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.username || "Employer";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const infoRow = (icon, label, value) =>
    value ? (
      <div className="flex items-start gap-3 py-2">
        <span className="mt-0.5 text-blue-500">{icon}</span>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">{label}</p>
          <p className="font-medium text-gray-800">{value}</p>
        </div>
      </div>
    ) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Hero Card */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">

          {/* Avatar */}
          <div className="relative shrink-0">
            {profile?.profile_picture ? (
              <img
                src={profile.profile_picture}
                alt={displayName}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white/30"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur items-center justify-center ring-4 ring-white/30"
              style={{ display: profile?.profile_picture ? "none" : "flex" }}
            >
              <span className="text-3xl font-bold">{initials}</span>
            </div>
          </div>

          {/* Name & Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold">{displayName}</h1>
            <p className="text-blue-200 mt-0.5">
              {profile?.designation || profile?.department || "Employer"}
            </p>
            <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start text-sm">
              <span className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                <Building2 className="h-4 w-4" />
                {companyName}
              </span>
              {user?.email && (
                <span className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </span>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => navigate("/employee/dashboard/settings/update-profile")}
            className="shrink-0 flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-blue-50 transition"
          >
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </button>

        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Jobs", value: profile?.total_jobs ?? "—", color: "blue" },
          { label: "Active Jobs", value: profile?.active_jobs ?? "—", color: "green" },
          { label: "Total Applicants", value: profile?.total_applicants ?? "—", color: "indigo" },
          { label: "Shortlisted", value: profile?.shortlisted_applicants ?? "—", color: "purple" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border p-4 text-center shadow-sm">
            <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Contact Info */}
        <div className="bg-white rounded-2xl border p-5 shadow-sm space-y-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" /> Contact Information
          </h2>
          <hr className="mb-3" />
          {infoRow(<Mail className="h-4 w-4" />, "Email", user?.email)}
          {infoRow(<Phone className="h-4 w-4" />, "Phone", profile?.phone_number || profile?.mobile || user?.phone)}
          {infoRow(<Phone className="h-4 w-4" />, "Office Phone", profile?.office_phone)}
          {infoRow(<Mail className="h-4 w-4" />, "Official Email", profile?.official_email)}
          {infoRow(<MapPin className="h-4 w-4" />, "Address", profile?.address)}
          {infoRow(<User className="h-4 w-4" />, "Contact Person", profile?.contact_person)}
          {!profile?.phone_number && !profile?.mobile && !profile?.office_phone && !profile?.address && (
            <p className="text-sm text-gray-400 italic py-2">No contact details filled yet.</p>
          )}
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-2xl border p-5 shadow-sm space-y-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-500" /> Company Information
          </h2>
          <hr className="mb-3" />
          {infoRow(<Building2 className="h-4 w-4" />, "Company Name", companyName !== "—" ? companyName : null)}
          {infoRow(<Briefcase className="h-4 w-4" />, "Industry", profile?.industry)}
          {infoRow(<Users className="h-4 w-4" />, "Company Size", profile?.company_size)}
          {infoRow(<Globe className="h-4 w-4" />, "Website", profile?.website)}
          {infoRow(<Link2 className="h-4 w-4" />, "LinkedIn", profile?.linkedin_id)}
          {infoRow(<Link2 className="h-4 w-4" />, "Facebook", profile?.facebook)}
          {!profile?.industry && !profile?.company_size && !profile?.website && (
            <p className="text-sm text-gray-400 italic py-2">No company details filled yet.</p>
          )}
        </div>

        {/* About */}
        {profile?.intro && (
          <div className="bg-white rounded-2xl border p-5 shadow-sm md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" /> About
            </h2>
            <hr className="mb-3" />
            <p className="text-gray-600 leading-relaxed">{profile.intro}</p>
          </div>
        )}

      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/employee/dashboard/settings/update-profile")}
            className="flex items-center gap-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition text-sm"
          >
            <Edit3 className="h-4 w-4" /> Update Profile
          </button>
          <button
            onClick={() => navigate("/employee/dashboard/settings/change-password")}
            className="flex items-center gap-2 border border-slate-200 text-slate-700 font-medium px-4 py-2 rounded-xl hover:bg-slate-50 transition text-sm"
          >
            <CheckCircle className="h-4 w-4" /> Change Password
          </button>
          <button
            onClick={() => navigate("/employee/dashboard/jobs/create")}
            className="flex items-center gap-2 border border-slate-200 text-slate-700 font-medium px-4 py-2 rounded-xl hover:bg-slate-50 transition text-sm"
          >
            <Briefcase className="h-4 w-4" /> Post a Job
          </button>
        </div>
      </div>

    </div>
  );
}
