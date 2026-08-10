import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { getEvent } from "../../../lib/eventApi";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const data = await getEvent(id);
      setEvent(data);
    } catch (err) {
      console.error("Failed to load event", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-10">
        Event not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Event Details"
        subtitle="View event information"
      />

      <div className="bg-white rounded-xl shadow border p-6">

        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full max-h-80 object-cover rounded-lg mb-6"
          />
        )}

        <div className="space-y-4">

          <div>
            <h3 className="text-sm text-gray-500">Title</h3>
            <p className="text-lg font-semibold">{event.title}</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500">Description</h3>
            <p>{event.description || "-"}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <h3 className="text-sm text-gray-500">Date</h3>
              <p>{new Date(event.date).toLocaleString()}</p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500">Location</h3>
              <p>{event.location || "-"}</p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500">Status</h3>
              <p>
                {event.is_active ? "Active" : "Inactive"}
              </p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500">Created</h3>
              <p>
                {new Date(event.created_at).toLocaleString()}
              </p>
            </div>

          </div>

        </div>

        <div className="mt-8 flex gap-3">

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Back
          </button>

          <button
            onClick={() =>
              navigate(`/admin/dashboard/events/edit/${event.id}`)
            }
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Event
          </button>

        </div>

      </div>

    </div>
  );
}