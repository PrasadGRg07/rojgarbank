import { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { getBlog, deleteBlog } from "../../../lib/blogApi";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlog(id);
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      await deleteBlog(id);

      alert("Blog deleted successfully.");

      navigate("/admin/dashboard/blogs");
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!blog) {
    return <div className="p-6">Blog not found.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog Details"
        subtitle="View blog article"
      />

      <div className="bg-white rounded-xl shadow border p-6 space-y-6">

        {blog.cover_image_url && (
          <img
            src={blog.cover_image_url}
            alt={blog.title}
            className="w-full max-h-96 object-cover rounded-lg"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold">
            {blog.title}
          </h1>

          <p className="text-gray-500 mt-2">
            By {blog.author_name || "Unknown"} •{" "}
            {new Date(blog.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-3">

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              blog.is_published
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {blog.is_published
              ? "Published"
              : "Draft"}
          </span>

        </div>

        <div className="border-t pt-6 whitespace-pre-wrap leading-7">
          {blog.content}
        </div>

        <div className="flex gap-3 pt-4">

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 border rounded-lg"
          >
            Back
          </button>

          <NavLink
            to={`/admin/dashboard/blogs/edit/${blog.id}`}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Edit
          </NavLink>

          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}