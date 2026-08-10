import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";

import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import { getEvents, deleteEvent } from "../../../lib/eventApi";

export default function EventTable({ search }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Failed to delete event.");
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "date",
      label: "Date",
      render: (event) =>
        new Date(event.date).toLocaleDateString(),
    },
    {
      key: "location",
      label: "Location",
    },
    {
      key: "status",
      label: "Status",
      render: (event) => (
        <StatusBadge
          status={event.is_active ? "Active" : "Inactive"}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading events...
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={filteredEvents}
      actions={(event) => (
        <div className="flex justify-center gap-3">
          <NavLink
            to={`/admin/dashboard/events/${event.id}`}
            className="text-blue-600"
          >
            <Eye size={18} />
          </NavLink>

          <NavLink
            to={`/admin/dashboard/events/edit/${event.id}`}
            className="text-green-600"
          >
            <Pencil size={18} />
          </NavLink>

          <button
            onClick={() => handleDelete(event.id)}
            className="text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    />
  );
}