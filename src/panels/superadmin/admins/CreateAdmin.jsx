import React, { useState } from "react";

const CreateAdmin = () => {

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // API Call Here
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Create Admin
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-5 max-w-xl"
      >

        <input
          name="username"
          placeholder="Username"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        >
          <option>Admin</option>
          <option>Moderator</option>
        </select>

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Create Admin
        </button>

      </form>

    </div>
  );
};

export default CreateAdmin;