import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { createUser } from "../../../lib/adminApi";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function UserCreate() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "jobseeker",
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSaving(true);

      await createUser(formData);

      alert("User created successfully.");

      navigate("/admin/dashboard/users");
    } catch (err) {
      console.error(err);
      const serverMsg =
        err?.response?.data?.detail ||
        err?.response?.data?.username?.[0] ||
        err?.response?.data?.email?.[0] ||
        err?.response?.data?.password?.[0] ||
        JSON.stringify(err?.response?.data) ||
        "Failed to create user.";
      setError(serverMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create User"
        subtitle="Add a new user"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow border p-6 space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
  <label className="block mb-2 font-medium">
    Password
  </label>

  <div className="relative">
    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      placeholder="Enter password"
      className="w-full border rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      type="button"
      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>
</div>

          <div>
            <label className="block mb-2 font-medium">
              First Name
            </label>

            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Last Name
            </label>

            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="jobseeker">Job Seeker</option>
            </select>
          </div>

        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          Active User
        </label>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            {saving ? "Creating..." : "Create User"}
          </button>

        </div>
      </form>
    </div>
  );
}