import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../lib/api";
import { Camera } from "lucide-react";

export default function UpdateProfile() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    company_name: "",
    address: "",
    office_phone: "",
    official_email: "",
    linkedin_id: "",
    industry: "Automobile",
    company_size: "",
    website: "",
    facebook: "",
    contact_person: "",
    mobile: "",
    intro: "",
  });

  // Load existing profile data on mount
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/auth/update-profile/");
        setForm({
          company_name: data.company_name || "",
          address: data.address || "",
          office_phone: data.office_phone || "",
          official_email: data.official_email || "",
          linkedin_id: data.linkedin_id || "",
          industry: data.industry || "Automobile",
          company_size: data.company_size || "",
          website: data.website || "",
          facebook: data.facebook || "",
          contact_person: data.contact_person || "",
          mobile: data.mobile || "",
          intro: data.intro || "",
        });
        if (data.profile_picture) {
          setLogoPreview(data.profile_picture);
        }
      } catch {
        // If fetch fails, fall back to user context values
        setForm((prev) => ({
          ...prev,
          company_name: user?.company_name || user?.company || "",
          official_email: user?.email || "",
        }));
      }
    };
    load();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg({ text: "", type: "" });
    try {
      const formData = new FormData();
      // Append all text fields
      Object.entries(form).forEach(([key, val]) => {
        formData.append(key, val);
      });
      // Append logo file if selected
      if (logoFile) {
        formData.append("profile_picture", logoFile);
      }

      const res = await api.patch("/auth/update-profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Push the new picture (and company name) into AuthContext so
      // the Header avatar reflects the change immediately
      const saved = res.data;
      updateUser({
        ...(saved.profile_picture ? { profile_picture: saved.profile_picture } : {}),
        ...(saved.company_name    ? { company_name: saved.company_name, company: saved.company_name } : {}),
      });
      setMsg({ text: "Profile updated successfully!", type: "success" });
    } catch {
      setMsg({ text: "Failed to update profile. Please try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-5xl space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Update Profile</h2>
          <p className="text-slate-500 text-sm">Keep your company information up to date.</p>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block font-semibold mb-3">Company Logo / Profile Picture</label>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Preview */}
            <div
              className="relative h-20 w-20 shrink-0 cursor-pointer rounded-xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center hover:border-blue-400 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              {logoPreview ? (
                <>
                  <img
                    src={logoPreview}
                    alt="Logo"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                    <Camera className="text-white h-6 w-6" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <Camera className="h-6 w-6" />
                  <span className="text-xs">Upload</span>
                </div>
              )}
            </div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
              >
                Choose Image
              </button>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {msg.text && (
          <p className={`text-sm font-medium ${msg.type === "success" ? "text-green-600" : "text-red-500"}`}>
            {msg.text}
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {[
            { label: "Company Name *", name: "company_name" },
            { label: "Company Address *", name: "address" },
            { label: "Office Phone Number *", name: "office_phone" },
            { label: "Official Email", name: "official_email", type: "email" },
            { label: "LinkedIn Company ID", name: "linkedin_id" },
            { label: "Company Website", name: "website" },
            { label: "Facebook Page Link", name: "facebook" },
            { label: "Contact Person Fullname *", name: "contact_person" },
            { label: "Mobile Number *", name: "mobile" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="font-semibold block mb-2">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="font-semibold block mb-2">Industry *</label>
            <select
              name="industry"
              value={form.industry}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
            >
              {["Automobile", "IT", "Education", "Banking", "Healthcare", "Finance", "Manufacturing", "Retail", "Other"].map(
                (o) => <option key={o}>{o}</option>
              )}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">Company Size *</label>
            <select
              name="company_size"
              value={form.company_size}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
            >
              {["Select...", "1-10", "11-50", "51-100", "100-500", "500+"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="font-semibold block mb-2">Company Short Intro *</label>
          <textarea
            name="intro"
            rows="5"
            value={form.intro}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
            placeholder="Write about your company..."
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 disabled:opacity-60 font-semibold transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
