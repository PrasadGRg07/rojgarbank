import { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { getTraining } from "../../../lib/trainingApi";

export default function TrainingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTraining();
  }, [id]);

  const fetchTraining = async () => {
    try {
      const data = await getTraining(id);
      setTraining(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load training.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading training...
      </div>
    );
  }

  if (!training) {
    return (
      <div className="text-center py-10">
        Training not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title={training.title}
        subtitle="Training Details"
      />

      <div className="bg-white rounded-xl shadow border p-6 space-y-5">

        <div>
          <h3 className="font-semibold text-gray-700">
            Course Name
          </h3>
          <p>{training.course_name}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">
            Description
          </h3>
          <p>{training.description || "-"}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <h3 className="font-semibold text-gray-700">
              Trainer
            </h3>
            <p>{training.trainer_name || "-"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">
              Location
            </h3>
            <p>{training.location || "-"}</p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <h3 className="font-semibold text-gray-700">
              Start Time
            </h3>
            <p>
              {new Date(training.start_time).toLocaleString()}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">
              End Time
            </h3>
            <p>
              {training.end_time
                ? new Date(training.end_time).toLocaleString()
                : "-"}
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <h3 className="font-semibold text-gray-700">
              Capacity
            </h3>
            <p>{training.capacity || "Unlimited"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">
              Status
            </h3>
            <p>
              {training.is_active ? "Active" : "Inactive"}
            </p>
          </div>

        </div>

        <div className="flex gap-3 pt-5">

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Back
          </button>

          <NavLink
            to={`/admin/dashboard/training/edit/${training.id}`}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Training
          </NavLink>

          <NavLink
            to={`/admin/dashboard/training/${training.id}/enrollments`}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            View Enrollments
          </NavLink>

        </div>

      </div>

    </div>
  );
}