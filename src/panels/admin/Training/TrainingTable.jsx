import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import {
  getTrainings,
  deleteTraining,
} from "../../../lib/trainingApi";

export default function TrainingTable({ search }) {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const data = await getTrainings();
      setTrainings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this training session?")) return;

    try {
      await deleteTraining(id);
      fetchTrainings();
    } catch (err) {
      console.error(err);
      alert("Failed to delete training.");
    }
  };

  const filteredTrainings = trainings.filter((training) =>
    training.title.toLowerCase().includes(search.toLowerCase()) ||
    training.course_name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "course_name",
      label: "Course",
    },
    {
      key: "trainer_name",
      label: "Trainer",
    },
    {
      key: "start_time",
      label: "Start Date",
      render: (training) =>
        new Date(training.start_time).toLocaleDateString(),
    },
    {
      key: "status",
      label: "Status",
      render: (training) => (
        <StatusBadge
          status={training.is_active ? "Active" : "Inactive"}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading training sessions...
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={filteredTrainings}
      actions={(training) => (
        <div className="flex justify-center gap-3">

          <NavLink
            to={`/admin/dashboard/training/${training.id}`}
            className="text-blue-600"
          >
            <Eye size={18} />
          </NavLink>

          <NavLink
            to={`/admin/dashboard/training/edit/${training.id}`}
            className="text-green-600"
          >
            <Pencil size={18} />
          </NavLink>

          <NavLink
            to={`/admin/dashboard/training/${training.id}/enrollments`}
            className="text-purple-600"
          >
            <Users size={18} />
          </NavLink>

          <button
            onClick={() => handleDelete(training.id)}
            className="text-red-600"
          >
            <Trash2 size={18} />
          </button>

        </div>
      )}
    />
  );
}