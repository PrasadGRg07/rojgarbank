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