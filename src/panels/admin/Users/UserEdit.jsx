import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { getUser, updateUser } from "../../../lib/adminApi";

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    company: "",
    employee_id: "",
    is_active: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(id);

        setFormData({
          username: data.username || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          role: data.role || "",
          company: data.company || "",
          employee_id: data.employee_id || "",
          is_active: data.is_active,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateUser(id, formData);

      navigate(`/admin/dashboard/users/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update user.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit User"
        subtitle="Update user information"
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
              value={formData.username}
              disabled
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
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
              <option value="employee">Employee</option>
              <option value="jobseeker">Job Seeker</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Company
            </label>

            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Employee ID
            </label>

            <input
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
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
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </form>
    </div>
  );
}