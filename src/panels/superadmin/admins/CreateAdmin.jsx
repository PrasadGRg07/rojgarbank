import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/api";

const CreateAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "Admin",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/superadmin/admins/create/", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      alert("Admin created successfully");
      navigate("/superadmin/admins");
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create Admin</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-5 max-w-xl"
      >
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        <input
          name="username"
          placeholder="Username"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        >
          <option>Admin</option>
        </select>

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <button 
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-6 py-3 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;