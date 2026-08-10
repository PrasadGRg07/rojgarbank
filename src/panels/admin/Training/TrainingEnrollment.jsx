import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import { getEnrollments } from "../../../lib/trainingApi";

export default function TrainingEnrollment() {
  const { id } = useParams();

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, [id]);

  const fetchEnrollments = async () => {
    try {
      const data = await getEnrollments(id);
      setEnrollments(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load enrollments.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "full_name",
      label: "Full Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "phone_number",
      label: "Phone",
    },
    {
      key: "course_interest",
      label: "Course Interest",
    },
    {
      key: "preferred_time",
      label: "Preferred Time",
    },
    {
      key: "created_at",
      label: "Enrolled On",
      render: (item) =>
        new Date(item.created_at).toLocaleDateString(),
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading enrollments...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Training Enrollments"
        subtitle="People enrolled in this training session"
      />

      <div className="bg-white rounded-xl shadow border p-5">

        <DataTable
          columns={columns}
          data={enrollments}
        />

      </div>

    </div>
  );
}