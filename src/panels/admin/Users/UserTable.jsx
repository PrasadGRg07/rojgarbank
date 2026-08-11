import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";

import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import { getUsers, deleteUser } from "../../../lib/adminApi";


export default function UserTable({ search, filters }) {

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

const fetchUsers = async () => {
  try {
    const data = await getUsers();
    setUsers(data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchUsers();
}, []);

const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmed) return;

  try {
    await deleteUser(id);

    alert("User deleted successfully.");

    fetchUsers();
  } catch (error) {
    console.error("Failed to delete user:", error);
    alert("Failed to delete user.");
  }
};





  const filteredUsers = users.filter((user) => {

    // Only show jobseeker users
    if (user.role !== "jobseeker") return false;

    const name =
      `${user.first_name} ${user.last_name}`
      .toLowerCase();

    const matchesSearch =
      name.includes(search.toLowerCase()) ||
      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      !filters.status ||
      (user.is_active
        ? "active"
        : "inactive"
      ) === filters.status;

    return (
      matchesSearch &&
      matchesStatus
    );

  });



  const columns = [

    {
      key: "name",
      label: "Name",

      render: (user) => (
        <span>
          {user.first_name} {user.last_name}
        </span>
      ),
    },


    {
      key: "email",
      label: "Email",
    },


    {
      key: "role",
      label: "Role",
    },


    {
      key: "status",
      label: "Status",

      render: (user) => (
        <StatusBadge
          status={
            user.is_active
              ? "Active"
              : "Inactive"
          }
        />
      ),
    },

  ];



  if (loading) {
    return (
      <div className="text-center p-10">
        Loading users...
      </div>
    );
  }



  return (

    <DataTable

      columns={columns}

      data={filteredUsers}


      actions={(user) => (

        <div className="flex justify-center gap-3">


          <NavLink
            to={`/admin/dashboard/users/${user.id}`}
            className="text-blue-600"
          >
            <Eye size={18}/>
          </NavLink>



          <NavLink
            to={`/admin/dashboard/users/edit/${user.id}`}
            className="text-green-600"
          >
            <Pencil size={18}/>
          </NavLink>



          <button
  onClick={() => handleDelete(user.id)}
  className="text-red-600 hover:text-red-800"
>
  <Trash2 size={18} />
</button>


        </div>

      )}

    />

  );

}