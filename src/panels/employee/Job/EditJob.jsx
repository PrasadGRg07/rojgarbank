import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import JobForm from "./components/JobForm";
import { validateJobForm } from "./utils/validation";
import {
    getJobDetail,
    updateJob,
    saveDraft,
} from "../../../lib/employeeJobApi";
export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load existing job
  useEffect(() => {
  if (id) {
    fetchJob();
  }
}, [id]);

  const fetchJob = async () => {
    try {
      const data = await getJobDetail(id);
setJob(data);
    } catch (err) {
      console.error(err);
      alert("Unable to load job.");
    } finally {
      setLoading(false);
    }
  };

const updateJobState = (patch) => {
  setJob((prev) => ({
    ...prev,
    ...patch,
  }));
};

  const handleUpdate = async () => {
    const validationErrors = validateJobForm(job);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSaving(true);

      await updateJob(id, job);

      alert("Job updated successfully.");

      navigate("/employee/dashboard/jobs");
    } catch (err) {
      console.error(err);
      alert("Failed to update job.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setSaving(true);

      await saveDraft(id, {
  ...job,
  status: "draft",
});

      alert("Draft updated.");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
  navigate("/employee/dashboard/jobs/preview", {
    state: {
      job,
    },
  });
};
  const handleSchedule = () => {
    console.log("Schedule Job");
  };

  const handleCancel = () => {
    navigate("/employee/dashboard/jobs");
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit Job
        </h1>

        <p className="mt-2 text-slate-500">
          Update your job posting.
        </p>
      </div>

      <JobForm
        data={job}
        errors={errors}
        loading={saving}
        onChange={updateJobState}
        onPublish={handleUpdate}
        onSaveDraft={handleSaveDraft}
        onPreview={handlePreview}
        onSchedule={handleSchedule}
        onCancel={handleCancel}
      />

    </div>
  );
}