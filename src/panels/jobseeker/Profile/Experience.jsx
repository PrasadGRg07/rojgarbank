import React, { useEffect, useState } from "react";
import { Briefcase, Plus, Pencil, Trash2, Save, X } from "lucide-react";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../../lib/jobseekerApi";

const EMPTY_FORM = {
  position: "",
  company: "",
  employment_type: "",
  start_date: "",
  end_date: "",
  currently_working: false,
  description: "",
};

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await getExperiences();
      setExperiences(res.data);
    } catch {
      setMsg({ text: "Failed to load experience records.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleSave = async () => {
  if (!form.position || !form.company) {
    setMsg({ text: "Position and Company are required.", type: "error" });
    return;
  }

  setMsg({ text: "", type: "" });

  const payload = {
    ...form,
    end_date: form.currently_working || !form.end_date ? null : form.end_date,
  };

  console.log(payload);

  try {
    if (editingId) {
      await updateExperience(editingId, payload);
      setMsg({ text: "Experience updated successfully.", type: "success" });
    } else {
      await createExperience(payload);
      setMsg({ text: "Experience added successfully.", type: "success" });
    }

    resetForm();
    fetchExperiences();
  } catch (error) {
    console.log(error.response?.data);

    setMsg({
      text: JSON.stringify(error.response?.data),
      type: "error",
    });
  }
};

  const handleEdit = (exp) => {
    setEditingId(exp.id);
    setForm(exp);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience record?")) return;
    try {
      await deleteExperience(id);
      setMsg({ text: "Experience deleted.", type: "success" });
      fetchExperiences();
    } catch {
      setMsg({ text: "Failed to delete experience.", type: "error" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Experience</h1>
        <p className="text-gray-500 mt-2">Add your professional work experience.</p>
      </div>

      {msg.text && (
        <p className={`mb-4 text-sm font-medium ${msg.type === "success" ? "text-green-600" : "text-red-500"}`}>
          {msg.text}
        </p>
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-xl font-semibold mb-6">
          {editingId ? "Edit Experience" : "Add Experience"}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium text-gray-700">Position *</label>
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="Software Developer"
              className="mt-2 w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Company Name *</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="mt-2 w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Employment Type</label>
            <select
              name="employment_type"
              value={form.employment_type}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
            >
              <option value="">Select Type</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              disabled={form.currently_working}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              name="currently_working"
              id="currently_working"
              checked={form.currently_working}
              onChange={(e) => setForm({ ...form, currently_working: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="currently_working" className="font-medium text-gray-700">Currently Working Here</label>
          </div>

          <div className="md:col-span-2">
            <label className="font-medium text-gray-700">Description</label>
            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your responsibilities..."
              className="mt-2 w-full rounded-xl border px-4 py-3"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {editingId && (
            <button
              onClick={resetForm}
              className="flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-gray-100"
            >
              <X size={18} /> Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-700"
          >
            {editingId ? <Save size={18} /> : <Plus size={18} />}
            {editingId ? "Update Experience" : "Add Experience"}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mt-8 space-y-6">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : experiences.length === 0 ? (
          <p className="text-gray-400">No experience records added yet.</p>
        ) : (
          experiences.map((exp) => (
            <div key={exp.id} className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="bg-cyan-100 p-3 rounded-xl h-fit">
                    <Briefcase className="text-cyan-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{exp.position}</h2>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-gray-500 text-sm">{exp.employment_type}</p>
                    <p className="text-sm mt-2 text-cyan-600">
                      {exp.start_date} — {exp.currently_working ? "Present" : exp.end_date}
                    </p>
                    <p className="mt-4 text-gray-600">{exp.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(exp)} className="rounded-lg bg-blue-100 p-3 hover:bg-blue-200">
                    <Pencil size={18} className="text-blue-600" />
                  </button>
                  <button onClick={() => handleDelete(exp.id)} className="rounded-lg bg-red-100 p-3 hover:bg-red-200">
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
