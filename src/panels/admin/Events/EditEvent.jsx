import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { getEvent, updateEvent } from "../../../lib/eventApi";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    is_active: true,
  });

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const data = await getEvent(id);

      setFormData({
        title: data.title || "",
        description: data.description || "",
        date: data.date
          ? new Date(data.date).toISOString().slice(0, 16)
          : "",
        location: data.location || "",
        is_active: data.is_active,
      });

      setCurrentImage(data.image || "");
    } catch (err) {
      console.error(err);
      alert("Failed to load event.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("date", formData.date);
      data.append("location", formData.location);
      data.append("is_active", formData.is_active);

      if (image) {
        data.append("image", image);
      }

      await updateEvent(id, data);

      navigate(`/admin/dashboard/events/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update event.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading event...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Edit Event"
        subtitle="Update event information"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow border p-6 space-y-5"
      >

        <div>
          <label className="block mb-2 font-medium">
            Event Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Date
            </label>

            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        {currentImage && (
          <div>
            <p className="font-medium mb-2">
              Current Image
            </p>

            <img
              src={currentImage}
              alt={formData.title}
              className="w-64 rounded-lg border"
            />
          </div>
        )}

        <div>
          <label className="block mb-2 font-medium">
            Change Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          Active Event
        </label>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {saving ? "Saving..." : "Update Event"}
          </button>

        </div>

      </form>

    </div>
  );
}