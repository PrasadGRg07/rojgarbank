import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

import JobForm from "../../employee/Job/components/JobForm";
import { validateJobForm } from "../../employee/Job/utils/validation";
import { getAdminJob, updateAdminJob } from "../../../lib/adminApi";

/** Convert empty strings → null for numeric / date fields before PATCH */
function cleanPayload(job) {
  const nullableFields = [
    "openings", "salaryMin", "salaryMax",
    "minAge", "maxAge",
    "applicationDeadline", "joiningDate", "postingDate",
  ];
  const cleaned = { ...job };
  nullableFields.forEach((f) => {
    if (cleaned[f] === "" || cleaned[f] === undefined) cleaned[f] = null;
  });
  if (!cleaned.mapLink) delete cleaned.mapLink;
  return cleaned;
}

export default function AdminJobEdit() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [job, setJob]           = useState(null);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);

  // Prefer state passed via navigate(), otherwise fetch from API
  useEffect(() => {
    if (state?.job) {
      setJob(state.job);
      setFetching(false);
      return;
    }
    (async () => {
      try {
        const data = await getAdminJob(id);
        setJob(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load job details.");
      } finally {
        setFetching(false);
      }
    })();
  }, [id, state]);

  const updateField = (patch) => setJob((prev) => ({ ...prev, ...patch }));

  const handleSave = async () => {
    const validationErrors = validateJobForm(job);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    try {
      setLoading(true);
      await updateAdminJob(id, cleanPayload(job));
      alert("Job updated successfully.");
      navigate("/admin/dashboard/jobs");
    } catch (err) {
      console.error("Update error:", err?.response?.data || err);
      const detail =
        err?.response?.data && typeof err.response.data === "object"
          ? JSON.stringify(err.response.data, null, 2)
          : err?.message || "Unknown error";
      alert(`Failed to update job.\n\nDetails:\n${detail}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      await updateAdminJob(id, cleanPayload({ ...job, status: "draft" }));
      alert("Saved as draft.");
      navigate("/admin/dashboard/jobs");
    } catch (err) {
      console.error(err);
      alert("Failed to save draft.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={36} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl bg-white p-10 shadow text-center">
          <p className="text-xl font-bold text-slate-700">Job not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Page Header */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Edit Job (Admin)</h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Editing:{" "}
                <span className="font-semibold text-slate-700">{job.title}</span>
                {" · "}ID #{id}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveDraft}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
            >
              Save Draft
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div className="mx-auto max-w-7xl p-6">
        {Object.keys(errors).length > 0 && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p className="font-semibold mb-1">Please fix the following errors:</p>
            <ul className="list-disc pl-5 space-y-0.5">
              {Object.entries(errors).map(([field, msg]) => (
                <li key={field}>
                  <span className="capitalize">{field.replace(/([A-Z])/g, " $1")}</span>: {msg}
                </li>
              ))}
            </ul>
          </div>
        )}

        <JobForm
          data={job}
          errors={errors}
          loading={loading}
          onChange={updateField}
          onPublish={handleSave}
          onSaveDraft={handleSaveDraft}
          onPreview={() => {}}
          onSchedule={() => {}}
          onCancel={() => navigate(-1)}
        />

        {/* Bottom action bar */}
        <div className="mt-8 flex justify-end gap-3 rounded-2xl bg-white p-5 shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={loading}
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
          >
            Save Draft
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
