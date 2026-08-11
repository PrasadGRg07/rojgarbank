import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { createEvent } from "../../../lib/eventApi";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    is_active: true,
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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

      await createEvent(data);

      navigate("/admin/dashboard/events");

    } catch (err) {
      console.error(err);
      alert("Failed to create event.");

    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-5 lg:px-0 space-y-6">

      <PageHeader
        title="Create Event"
        subtitle="Add a new event"
      />


      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow border p-4 sm:p-6 space-y-5"
      >


        {/* Title */}

        <div>
          <label className="block mb-2 font-medium text-sm sm:text-base">
            Event Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter event title"
            className="
              w-full 
              border 
              rounded-lg 
              p-3 
              text-sm 
              sm:text-base
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500
            "
          />
        </div>



        {/* Description */}

        <div>
          <label className="block mb-2 font-medium text-sm sm:text-base">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            className="
              w-full 
              border 
              rounded-lg 
              p-3 
              text-sm 
              sm:text-base
              resize-none
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500
            "
          />
        </div>



        {/* Date and Location */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


          <div>

            <label className="block mb-2 font-medium text-sm sm:text-base">
              Event Date
            </label>

            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="
                w-full 
                border 
                rounded-lg 
                p-3
                text-sm
                sm:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>



          <div>

            <label className="block mb-2 font-medium text-sm sm:text-base">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Event location"
              className="
                w-full 
                border 
                rounded-lg 
                p-3
                text-sm
                sm:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>


        </div>





        {/* Image Upload */}

        <div>

          <label className="block mb-2 font-medium text-sm sm:text-base">
            Event Image
          </label>


          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="
              w-full 
              border 
              rounded-lg 
              p-3
              text-sm
              cursor-pointer
            "
          />


          {
            image && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Selected: {image.name}
                </p>
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Preview" 
                  className="w-full max-w-sm h-auto object-cover rounded-lg border shadow-sm"
                />
              </div>
            )
          }


        </div>





        {/* Active Checkbox */}

        <label className="flex items-center gap-2 text-sm sm:text-base">

          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="w-4 h-4"
          />

          Active Event

        </label>





        {/* Buttons */}

        <div className="flex flex-col sm:flex-row gap-3 pt-3">


          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              w-full
              sm:w-auto
              px-5
              py-2
              border
              rounded-lg
              hover:bg-gray-100
              transition
            "
          >
            Cancel
          </button>




          <button
            type="submit"
            disabled={saving}
            className="
              w-full
              sm:w-auto
              px-5
              py-2
              bg-blue-600
              text-white
              rounded-lg
              hover:bg-blue-700
              transition
              disabled:opacity-50
            "
          >
            {saving ? "Creating..." : "Create Event"}

          </button>


        </div>


      </form>


    </div>
  );
}