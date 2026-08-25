import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import api from "../../../../lib/api";

const ScheduleInterviewModal = ({ open, onClose, onSuccess }) => {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    job: "",
    candidate: "",
    date: "",
    time: "",
    interview_type: "in-person",
    meeting_link: "",
    notes: "",
  });

  // Fetch jobs list
  useEffect(() => {
    if (!open) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/employee/jobs/");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [open]);

  // Fetch applicants when job changes
  useEffect(() => {
    if (!form.job) { setCandidates([]); return; }
    const load = async () => {
      try {
        const res = await api.get(`/employee/jobs/${form.job}/applications/`);
        setCandidates(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [form.job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "job") setForm((prev) => ({ ...prev, job: value, candidate: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.job || !form.candidate || !form.date || !form.time) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/employee/interviews/", {
        job: form.job,
        candidate: form.candidate,
        date: form.date,
        time: form.time,
        interview_type: form.interview_type,
        meeting_link: form.meeting_link,
        notes: form.notes,
      });
      setForm({ job: "", candidate: "", date: "", time: "", interview_type: "in-person", meeting_link: "", notes: "" });
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to schedule interview.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold">Schedule Interview</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Job Position <span className="text-red-500">*</span></label>
                <select
                  name="job"
                  value={form.job}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Job</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>{j.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Candidate <span className="text-red-500">*</span></label>
                <select
                  name="candidate"
                  value={form.candidate}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={!form.job}
                >
                  <option value="">
                    {form.job ? (candidates.length > 0 ? "Select Candidate" : "No applicants for this job") : "Select a job first"}
                  </option>
                  {candidates.map((c) => (
                    <option key={c.id} value={c.applicant}>
                      {c.applicant_name} ({c.applicant_email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time <span className="text-red-500">*</span></label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Interview Type</label>
                <select
                  name="interview_type"
                  value={form.interview_type}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="in-person">In-Person</option>
                  <option value="video">Video Call</option>
                  <option value="phone">Phone</option>
                </select>
              </div>

              {(form.interview_type === "video") && (
                <div>
                  <label className="block text-sm font-medium mb-2">Meeting Link</label>
                  <input
                    type="url"
                    name="meeting_link"
                    value={form.meeting_link}
                    onChange={handleChange}
                    placeholder="https://meet.google.com/..."
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <textarea
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Add interview notes or instructions..."
                  className="w-full border rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Schedule Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;