import React, { useState } from "react";

const modules = [
  "Dashboard",
  "Admins",
  "Employees",
  "Employers",
  "Job Seekers",
  "Jobs",
  "Applications",
  "Blogs",
  "Events",
  "Trainings",
  "Analytics",
  "Audit Logs",
  "Settings",
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

            {modules.map((module) => (

              <tr key={module} className="border-t">

                <td className="p-4 font-medium">
                  {module}
                </td>

                <td className="text-center">
                  <input type="checkbox" />
                </td>

                <td className="text-center">
                  <input type="checkbox" defaultChecked />
                </td>

                <td className="text-center">
                  <input type="checkbox" />
                </td>

                <td className="text-center">
                  <input type="checkbox" />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Save Permissions
        </button>

      </div>

    </div>
  );
};

export default Permissions;