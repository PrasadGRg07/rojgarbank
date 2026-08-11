import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, BookOpen } from "lucide-react";

import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import BlogTable from "./BlogTable";
import BlogStatistics from "./BlogStatistics";

export default function BlogList() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="space-y-6">

      <PageHeader
        title="Blogs"
        subtitle="Manage all blog articles."
      />

      <BlogStatistics />

      <div className="bg-white rounded-xl shadow border p-5">

        {/* Search + Add Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

          <div className="w-full md:max-w-md">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blogs..."
            />
          </div>

          <button
            onClick={() => navigate("/admin/dashboard/blogs/create")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition"
          >
            <Plus size={18} />
            <BookOpen size={18} />
            Create Blog
          </button>

        </div>

        <BlogTable search={search} />

      </div>

    </div>
  );
}