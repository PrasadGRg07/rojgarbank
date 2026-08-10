import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { getBlog, updateBlog } from "../../../lib/blogApi";

export default function BlogEdit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cover_image: null,
    is_published: true,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getBlog(id);

        setFormData({
          title: blog.title,
          content: blog.content,
          cover_image: null,
          is_published: blog.is_published,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("is_published", formData.is_published);

      if (formData.cover_image) {
        data.append("cover_image", formData.cover_image);
      }

      await updateBlog(id, data);

      alert("Blog updated successfully.");

      navigate(`/admin/dashboard/blogs/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update blog.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Blog"
        subtitle="Update blog article"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow border p-6 space-y-5"
      >
        <div>
          <label className="block mb-2 font-medium">
            Title
          </label>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Content
          </label>

          <textarea
            rows={8}
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Replace Cover Image
          </label>

          <input
            type="file"
            name="cover_image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_published"
            checked={formData.is_published}
            onChange={handleChange}
          />
          Published
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}