import React from "react";
import { Link } from "react-router-dom";
import SecurityIcon from "@mui/icons-material/Security";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const roles = [
  {
    id: 1,
    role: "Super Admin",
    users: 1,
    description: "Full access to the entire system",
  },
  {
    id: 2,
    role: "Admin",
    users: 5,
    description: "Manage employees, jobs and reports",
  },
  {
    id: 3,
    role: "Employee",
    users: 18,
    description: "Manage company jobs",
  },
  {
    id: 4,
    role: "Job Seeker",
    users: 245,
    description: "Apply for jobs",
  },
];

const Roles = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <SecurityIcon fontSize="large" />
            Roles
          </h1>

          <p className="text-gray-500 mt-2">
            Manage system roles.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
          <AddIcon />
          Create Role
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Role</th>

              <th className="p-4 text-left">Users</th>

              <th className="p-4 text-left">Description</th>

              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {roles.map((role) => (

              <tr key={role.id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-semibold">
                  {role.role}
                </td>

                <td className="p-4">
                  {role.users}
                </td>

                <td className="p-4">
                  {role.description}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <Link
                      to={`/superadmin/roles/edit/${role.id}`}
                      className="bg-yellow-500 text-white p-2 rounded"
                    >
                      <EditIcon />
                    </Link>

                    <button className="bg-red-600 text-white p-2 rounded">
                      <DeleteIcon />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Roles;