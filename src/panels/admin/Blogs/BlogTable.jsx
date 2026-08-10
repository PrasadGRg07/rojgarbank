import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";

import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";

import { getBlogs } from "../../../lib/blogApi";

export default function BlogTable({ search }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "author_name",
      label: "Author",
    },
    {
      key: "status",
      label: "Status",
      render: (blog) => (
        <StatusBadge
          status={
            blog.is_published
              ? "Published"
              : "Draft"
          }
        />
      ),
    },
    {
      key: "created_at",
      label: "Created",
      render: (blog) =>
        new Date(blog.created_at).toLocaleDateString(),
    },
  ];

  if (loading) {
    return (
      <div className="text-center p-10">
        Loading blogs...
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={filteredBlogs}
      actions={(blog) => (
        <div className="flex justify-center gap-3">

          <NavLink
            to={`/admin/dashboard/blogs/${blog.id}`}
            className="text-blue-600"
          >
            <Eye size={18} />
          </NavLink>

          <NavLink
            to={`/admin/dashboard/blogs/edit/${blog.id}`}
            className="text-green-600"
          >
            <Pencil size={18} />
          </NavLink>

          <button className="text-red-600">
            <Trash2 size={18} />
          </button>

        </div>
      )}
    />
  );
}