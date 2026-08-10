import React, { useEffect, useState } from "react";
import { GraduationCap, Plus, Pencil, Trash2, Save, X } from "lucide-react";
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../../../lib/jobseekerApi";

const EMPTY_FORM = {
  degree: "",
  institution: "",
  start_year: "",
  end_year: "",
  grade: "",
  description: "",
  currently_studying: false,
};

export default function Education() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const res = await getEducations();
      setEducations(res.data);
    } catch {
      setMsg({ text: "Failed to load education records.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked, ...(name === "currently_studying" && checked ? { end_year: "" } : {}) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!form.degree || !form.institution) {
      setMsg({ text: "Degree and Institution are required.", type: "error" });
      return;
    }
    setMsg({ text: "", type: "" });
    try {
      if (editingId) {
        await updateEducation(editingId, form);
        setMsg({ text: "Education updated successfully.", type: "success" });
      } else {
        await createEducation(form);
        setMsg({ text: "Education added successfully.", type: "success" });
      }
      resetForm();
      fetchEducations();
    } catch {
      setMsg({ text: "Failed to save education. Please try again.", type: "error" });
    }
  };

  const handleEdit = (edu) => {
    setEditingId(edu.id);
    setForm(edu);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this education record?")) return;
    try {
      await deleteEducation(id);
      setMsg({ text: "Education deleted.", type: "success" });
      fetchEducations();
    } catch {
      setMsg({ text: "Failed to delete education.", type: "error" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Education</h1>
        <p className="text-gray-500 mt-2">Add your academic qualifications.</p>
      </div>

      {msg.text && (
        <p className={`mb-4 text-sm font-medium ${msg.type === "success" ? "text-green-600" : "text-red-500"}`}>
          {msg.text}
        </p>
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-xl font-semibold mb-6">
          {editingId ? "Edit Education" : "Add Education"}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium text-gray-700">Degree *</label>
            <input
              type="text"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="Bachelor of Information Technology"
              className="mt-2 w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Institution *</label>
            <input
              type="text"
              name="institution"
              value={form.institution}
              onChange={handleChange}
              placeholder="University Name"
              className="mt-2 w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Grade</label>
            <input
              type="text"
              name="grade"
              value={form.grade}
              onChange={handleChange}
              placeholder="3.8 GPA / Distinction"
              className="mt-2 w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            <div>
              <label className="font-medium text-gray-700">Start Year</label>
              <input
                type="number"
                name="start_year"
                value={form.start_year}
                onChange={handleChange}
                placeholder="2020"
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />
            </div>
            {!form.currently_studying && (
              <div>
                <label className="font-medium text-gray-700">End Year</label>
                <input
                  type="number"
                  name="end_year"
                  value={form.end_year}
                  onChange={handleChange}
                  placeholder="2024"
                  className="mt-2 w-full rounded-xl border px-4 py-3"
                />
              </div>
            )}
          </div>

          {/* Currently Studying checkbox */}
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="currently_studying"
              name="currently_studying"
              checked={form.currently_studying}
              onChange={handleChange}
              className="w-4 h-4 accent-cyan-600 cursor-pointer"
            />
            <label htmlFor="currently_studying" className="font-medium text-gray-700 cursor-pointer select-none">
              I am currently studying here
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="font-medium text-gray-700">Description</label>
            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your education..."
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
            {editingId ? "Update Education" : "Add Education"}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mt-8 space-y-6">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : educations.length === 0 ? (
          <p className="text-gray-400">No education records added yet.</p>
        ) : (
          educations.map((edu) => (
            <div key={edu.id} className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="bg-cyan-100 p-3 rounded-xl h-fit">
                    <GraduationCap className="text-cyan-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{edu.degree}</h2>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm mt-2 text-cyan-600">
                      {edu.start_year} — {edu.end_year || "Present"}
                    </p>
                    <p className="mt-4 text-gray-600">{edu.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(edu)} className="rounded-lg bg-blue-100 p-3 hover:bg-blue-200">
                    <Pencil size={18} className="text-blue-600" />
                  </button>
                  <button onClick={() => handleDelete(edu.id)} className="rounded-lg bg-red-100 p-3 hover:bg-red-200">
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
