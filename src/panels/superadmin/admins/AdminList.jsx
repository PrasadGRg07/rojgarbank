import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../lib/api";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await api.get("/superadmin/users/");
        // Filter out only admins (you could also include superadmins if desired)
        const adminUsers = response.data.filter(u => u.role === "admin");
        setAdmins(adminUsers);
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Admins</h1>
        <Link
          to="/superadmin/dashboard/admins/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Admin
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading admins...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Joined</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No admins found.</td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id} className="border-t">
                    <td className="p-4">{admin.username}</td>
                    <td className="p-4">{admin.email}</td>
                    <td className="p-4 capitalize">{admin.role}</td>
                    <td className="p-4">{admin.date_joined}</td>
                    <td className="p-4 text-center space-x-2">
                      <Link
                        to={`/superadmin/dashboard/admins/edit/${admin.id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/superadmin/dashboard/admins/delete/${admin.id}`}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminList;