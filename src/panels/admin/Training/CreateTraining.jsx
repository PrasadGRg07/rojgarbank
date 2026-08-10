import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { createTraining } from "../../../lib/trainingApi";

export default function CreateTraining() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    course_name: "",
    description: "",
    trainer_name: "",
    location: "",
    start_time: "",
    end_time: "",
    capacity: "",
    is_active: true,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, checked, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const submitData = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== "") {
          submitData.append(key, formData[key]);
        }
      }

      await createTraining(submitData);

      navigate("/admin/dashboard/training");
    } catch (err) {
      console.error(err);
      alert("Failed to create training session.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">

      <PageHeader
        title="Create Training"
        subtitle="Add a new training session"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow border p-6 space-y-5"
      >

        <div>
          <label className="block mb-2 font-medium">
            Training Title
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
            Course Name
          </label>

          <input
            type="text"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Course Image
          </label>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
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
              Trainer Name
            </label>

            <input
              type="text"
              name="trainer_name"
              value={formData.trainer_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
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

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Start Time
            </label>

            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              End Time
            </label>

            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        <div>
          <label className="block mb-2 font-medium">
            Capacity
          </label>

          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
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
          Active Training Session
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
            {saving ? "Saving..." : "Create Training"}
          </button>

        </div>

      </form>

    </div>
  );
}