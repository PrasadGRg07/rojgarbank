import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";

import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { getUser } from "../../../lib/adminApi";

export default function UserDetail() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(id);
        setUser(data);
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading user...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10 text-red-500">
        User not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Details"
        subtitle="View user information"
      />

      <div className="bg-white rounded-xl shadow border p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500 text-sm">Username</p>
            <p className="font-semibold">{user.username}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Full Name</p>
            <p className="font-semibold">
              {user.first_name} {user.last_name}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p>{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Role</p>
            <p className="capitalize">{user.role}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Company</p>
            <p>{user.company || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Employee ID</p>
            <p>{user.employee_id || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-1">Status</p>
            <StatusBadge
              status={user.is_active ? "Active" : "Inactive"}
            />
          </div>

          <div>
            <p className="text-gray-500 text-sm">Date Joined</p>
            <p>
              {user.date_joined
                ? new Date(user.date_joined).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Last Login</p>
            <p>
              {user.last_login
                ? new Date(user.last_login).toLocaleString()
                : "Never"}
            </p>
          </div>

        </div>

        <div className="flex gap-3 mt-8">

          <NavLink
            to="/admin/dashboard/users"
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </NavLink>

          <NavLink
            to={`/admin/dashboard/users/edit/${user.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Pencil size={18} />
            Edit User
          </NavLink>

        </div>

      </div>
    </div>
  );
}