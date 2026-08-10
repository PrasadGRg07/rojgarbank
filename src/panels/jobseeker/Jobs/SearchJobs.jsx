import { useState } from "react";
import SearchBar from "../components/SearchBar";
import JobList from "./JobList";

export default function SearchJobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Searching:", search, location);
  };

  const handleFilter = () => {
    console.log("Open filters");
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Search Jobs
      </h1>

      <div className="mb-8 rounded-xl bg-white p-5 shadow-sm">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search job title or company..."
          onClear={() => setSearch("")}
          onSearch={handleSearch}
          onFilter={handleFilter}
        />

        <input
          type="text"
          placeholder="Search location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-4 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <JobList
        search={search}
        location={location}
      />
    </div>
  );
}