import React from "react";
import { Link } from "react-router-dom";

const admins = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Moderator",
    status: "Inactive",
  },
];

const AdminList = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Manage Admins
        </h1>

        <Link
          to="/superadmin/admins/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Admin
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Role</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {admins.map((admin) => (

              <tr key={admin.id} className="border-t">

                <td className="p-4">{admin.name}</td>

                <td className="p-4">{admin.email}</td>

                <td className="p-4">{admin.role}</td>

                <td className="p-4">{admin.status}</td>

                <td className="p-4 text-center space-x-2">

                  <Link
                    to={`/superadmin/admins/edit/${admin.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/superadmin/admins/delete/${admin.id}`}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminList;