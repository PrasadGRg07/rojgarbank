import React, { useState } from "react";

const modules = [
  { name: "Dashboard", create: true, read: true, update: true, delete: false },
  { name: "Admins", create: false, read: true, update: false, delete: false },
  { name: "Employees", create: false, read: true, update: true, delete: false },
  { name: "Employers", create: false, read: true, update: true, delete: false },
  { name: "Job Seekers", create: false, read: true, update: true, delete: false },
  { name: "Jobs", create: true, read: true, update: true, delete: true },
  { name: "Applications", create: true, read: true, update: true, delete: false },
  { name: "Blogs", create: true, read: true, update: true, delete: true },
  { name: "Events", create: true, read: true, update: true, delete: true },
  { name: "Trainings", create: true, read: true, update: true, delete: true },
  { name: "Analytics", create: false, read: true, update: false, delete: false },
  { name: "Audit Logs", create: false, read: false, update: false, delete: false },
  { name: "Settings", create: false, read: true, update: false, delete: false },
];

const Permissions = () => {
  const [selectedRole, setSelectedRole] = useState("Admin");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Role Permissions
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="mb-6">

          <label className="font-semibold">
            Select Role
          </label>

          <select
            className="border rounded-lg p-3 ml-4"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option>Super Admin</option>
            <option>Admin</option>
            <option>Employee</option>
          </select>

        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Module
              </th>

              <th>Create</th>

              <th>Read</th>

              <th>Update</th>

              <th>Delete</th>

            </tr>

          </thead>

          <tbody>

            {modules.map((module) => {
              // Mock logic to show different permissions based on selected role
              const isSuperAdmin = selectedRole === "Super Admin";
              const isAdmin = selectedRole === "Admin";
              
              const canCreate = isSuperAdmin || (isAdmin && module.create);
              const canRead = isSuperAdmin || module.read;
              const canUpdate = isSuperAdmin || (isAdmin && module.update);
              const canDelete = isSuperAdmin || (isAdmin && module.delete);
              
              return (
                <tr key={module.name} className="border-t">
                  <td className="p-4 font-medium text-gray-700">
                    {module.name}
                  </td>
                  <td className="text-center">
                    <input type="checkbox" checked={canCreate} disabled className="opacity-60 cursor-not-allowed" />
                  </td>
                  <td className="text-center">
                    <input type="checkbox" checked={canRead} disabled className="opacity-60 cursor-not-allowed" />
                  </td>
                  <td className="text-center">
                    <input type="checkbox" checked={canUpdate} disabled className="opacity-60 cursor-not-allowed" />
                  </td>
                  <td className="text-center">
                    <input type="checkbox" checked={canDelete} disabled className="opacity-60 cursor-not-allowed" />
                  </td>
                </tr>
              )
            })}

          </tbody>

        </table>
        <p className="mt-6 text-sm text-gray-500 italic">Permissions are read-only and strictly tied to hardcoded user roles.</p>
      </div>
    </div>
  );
};

export default Permissions;