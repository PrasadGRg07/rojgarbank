import { useState } from "react";

import PageHeader from "../components/PageHeader";
import UserTable from "./UserTable";
import UserFilters from "./UserFilters";

export default function UserList() {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    role: "",
    status: "",
  });

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Users"
        subtitle="Manage all users in the system."
        buttonText="Add User"
        buttonLink="/admin/dashboard/users/create"
      />

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
