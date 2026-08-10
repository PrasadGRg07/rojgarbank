export default function UserFilters({
  search,
  setSearch,
  filters,
  setFilters,
}) {


return (

<div className="bg-white rounded-xl border p-4 flex flex-wrap gap-4">


<input

type="text"

placeholder="Search users..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border rounded-lg px-4 py-2 flex-1 min-w-[250px]"

/>



<select

value={filters.role}

onChange={(e)=>
setFilters({
...filters,
role:e.target.value
})
}

className="border rounded-lg px-4 py-2"

>

<option value="">
All Roles
</option>

<option value="jobseeker">
Job Seeker
</option>

<option value="employee">
Employee
</option>

<option value="admin">
Admin
</option>

<option value="superadmin">
Super Admin
</option>


</select>



<select

value={filters.status}

onChange={(e)=>
setFilters({
...filters,
status:e.target.value
})
}

className="border rounded-lg px-4 py-2"

>

<option value="">
All Status
</option>

<option value="active">
Active
</option>

<option value="inactive">
Inactive
</option>


</select>



</div>

);

}