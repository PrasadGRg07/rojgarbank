import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, BookOpen } from "lucide-react";

import PageHeader from "../components/PageHeader";
import BlogTable from "./BlogTable";

export default function BlogList() {
  const [search] = useState("");
  const navigate = useNavigate();

  return (
    <div className="space-y-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <PageHeader
          title="Blogs"
          subtitle="Manage all blog articles."
        />

        <button
          onClick={() => navigate("/admin/dashboard/blogs/create")}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition"
        >
          <Plus size={18} />
          <BookOpen size={18} />
          Create Blog
        </button>

      </div>

      <BlogTable search={search} />

    </div>
  );
}