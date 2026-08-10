import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { createBlog } from "../../../lib/blogApi";

export default function BlogCreate() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cover_image: null,
    is_published: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

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

      await createBlog(data);

      alert("Blog created successfully.");

      navigate("/admin/dashboard/blogs");
    } catch (err) {
      console.error(err);
      alert("Failed to create blog.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Blog"
        subtitle="Add a new blog article"
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
            required
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
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Cover Image
          </label>

          <input
            type="file"
            name="cover_image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_published"
            checked={formData.is_published}
            onChange={handleChange}
          />
          Publish immediately
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
            {saving ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}