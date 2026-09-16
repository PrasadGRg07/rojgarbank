import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useState } from "react";

import PageHeader from "../components/PageHeader";
import UserTable from "./UserTable";
import UserFilters from "./UserFilters";


export default function UserList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    role: "",
    status: "",
  });



  return (

    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Users"
          subtitle="Manage all users in the system."
        />

        <button
          onClick={() => navigate("/admin/dashboard/users/create")}
          className="flex items-center justify-center gap-2 bg-blue-800 hover:bg-dablue-1000 text-white px-4 py-2 rounded-lg transition sm:w-auto w-full"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>
      



      <UserFilters

        search={search}

        setSearch={setSearch}

        filters={filters}

        setFilters={setFilters}
      />



      <UserTable

        search={search}

        filters={filters}

      />


    </div>

  );

}