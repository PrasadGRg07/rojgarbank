import React, { useState, useEffect } from "react";
import SecurityIcon from "@mui/icons-material/Security";
import { getRoleStats } from "../../../lib/superadminApi";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoleStats();
        setRoles(data);
      } catch (err) {
        console.error("Failed to fetch roles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <SecurityIcon fontSize="large" />
            Roles
          </h1>

          <p className="text-gray-500 mt-2">
            System roles and user counts.
          </p>
        </div>
        {/* Create Role button hidden because roles are hardcoded enums */}
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

                <td className="p-4 text-center text-gray-400 italic">
                  Roles are hardcoded
                </td>

              </tr>

            ))}

            {loading && (
              <tr>
                <td colSpan="4" className="p-4 text-center">Loading...</td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Roles;