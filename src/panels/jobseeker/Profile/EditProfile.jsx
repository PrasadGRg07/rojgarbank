import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  FileText,
  Globe,
  Save,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile, getProfile } from "../../../lib/jobseekerApi";
import { useAuth } from "../../../context/AuthContext";
export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    bio: "",
    skills: "",
    education: "",
    experience: "",
    portfolio: "",
    linkedin: "",
    github: "",
    profile_picture: null,
  });

  useEffect(() => {
    getProfile()
      .then((res) => {
        const p = res.data;
        setForm((prev) => ({
          ...prev,
          phone: p.phone || "",
          address: p.address || "",
          bio: p.bio || "",
          skills: p.skills || "",
          education: p.education || "",
          experience: p.experience || "",
          portfolio: p.portfolio || "",
          linkedin: p.linkedin || "",
          github: p.github || "",
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setForm({
      ...form,
      profile_picture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (val !== null && val !== "") formData.append(key, val);
      });
      const res = await updateProfile(formData);
      // Sync profile picture (and name if changed) into auth context
      // so Header + Sidebar avatars update immediately
      const saved = res.data;
      updateUser({
        ...(saved.profile_picture ? { profile_picture: saved.profile_picture } : {}),
        ...(saved.first_name ? { first_name: saved.first_name, name: `${saved.first_name} ${saved.last_name || ""}`.trim() } : {}),
        ...(saved.last_name  ? { last_name: saved.last_name } : {}),
      });
      setMsg("Profile updated successfully.");
    } catch {
      setMsg("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Edit Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Update your personal and professional information.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* Profile Picture */}

        <div className="bg-white rounded-2xl shadow-sm border p-8">

          <h2 className="text-xl font-semibold mb-6">
            Profile Picture
          </h2>

          <div className="flex items-center gap-8">

            <div className="relative">

              <img
                src={
                  form.profile_picture
                    ? URL.createObjectURL(form.profile_picture)
                    : `https://ui-avatars.com/api/?name=${form.first_name}+${form.last_name}&background=06b6d4&color=fff&size=200`
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-cyan-100"
              />

              <label className="absolute bottom-0 right-0 bg-cyan-600 text-white rounded-full p-3 cursor-pointer hover:bg-cyan-700">

                <Camera size={18} />

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />

              </label>

            </div>

            <div>

              <h3 className="text-lg font-semibold">
                {form.first_name} {form.last_name}
              </h3>

              <p className="text-gray-500">
                Job Seeker
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Upload JPG, PNG or JPEG
              </p>

            </div>

          </div>

        </div>               {/* Personal Information */}

        <div className="bg-white rounded-2xl shadow-sm border p-8">

          <h2 className="text-xl font-semibold mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* First Name */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <User size={16} />
                First Name
              </label>

              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
              />

            </div>

            {/* Last Name */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <User size={16} />
                Last Name
              </label>

              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
              />

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail size={16} />
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
              />

            </div>

            {/* Phone */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <Phone size={16} />
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+977 98XXXXXXXX"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
              />

            </div>

            {/* Address */}

            <div className="md:col-span-2">

              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin size={16} />
                Address
              </label>

              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
              />

            </div>

            {/* Bio */}

            <div className="md:col-span-2">

              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText size={16} />
                About Me
              </label>

              <textarea
                rows={5}
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell employers about yourself..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none resize-none"
              />

            </div>

          </div>

        </div>

        
{/* Social Links */ }

        <div className="bg-white rounded-2xl shadow-sm border p-8">

          <h2 className="text-xl font-semibold mb-6">
            Social Links
          </h2>

          <div className="grid grid-cols-1 gap-6">

            {/* Portfolio */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <Globe size={16} />
                Portfolio Website
              </label>

              <input
                type="url"
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
              />

            </div>

            {/* LinkedIn */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <Globe size={16} />
                LinkedIn
              </label>

              <input
                type="url"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
              />

            </div>

            {/* GitHub */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <Globe size={16} />
                GitHub
              </label>

              <input
                type="url"
                name="github"
                value={form.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-cyan-500 focus:outline-none"
              />

            </div>

          </div>

        </div>

        {msg && <p className="text-sm text-center text-cyan-600">{msg}</p>}

        {/* Buttons */}

        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <X size={18} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-medium text-white hover:bg-cyan-700 transition disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
}