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
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Blogs"
        subtitle="Manage all blog articles."
      />

      <BlogStatistics />

      <div className="rounded-xl border bg-white p-4 shadow sm:p-5">
        {/* Search + Add Button */}
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-md">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blogs..."
            />
          </div>

          <button
            onClick={() => navigate("/admin/dashboard/blogs/create")}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-white shadow transition hover:bg-emerald-700 md:w-auto"
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
