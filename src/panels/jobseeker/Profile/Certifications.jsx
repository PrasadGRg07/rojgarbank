import React, { useEffect, useState } from "react";
import { Award, Plus, Pencil, Trash2, Save, X } from "lucide-react";
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../../../lib/jobseekerApi";

const EMPTY_FORM = {
  title: "",
  organization: "",
  issue_date: "",
  expiry_date: "",
  credential_id: "",
  credential_url: "",
  description: "",
};

export default function Certification() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const res = await getCertifications();
      setCertifications(res.data);
    } catch {
      setMsg({ text: "Failed to load certifications.", type: "error" });
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
    if (!form.title || !form.organization) return;
    setMsg({ text: "", type: "" });
    try {
      if (editingId) {
        await updateCertification(editingId, form);
        setMsg({ text: "Certification updated successfully.", type: "success" });
      } else {
        await createCertification(form);
        setMsg({ text: "Certification added successfully.", type: "success" });
      }
      resetForm();
      fetchCertifications();
    } catch {
      setMsg({ text: "Failed to save certification.", type: "error" });
    }
  };

  const handleEdit = (cert) => {
    setEditingId(cert.id);
    setForm(cert);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certification?")) return;
    try {
      await deleteCertification(id);
      setMsg({ text: "Certification deleted.", type: "success" });
      fetchCertifications();
    } catch {
      setMsg({ text: "Failed to delete certification.", type: "error" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Certifications</h1>
        <p className="text-gray-500 mt-2">Add your professional certifications and achievements.</p>
      </div>

      {msg.text && (
        <p className={`mb-4 text-sm font-medium ${
          msg.type === "success" ? "text-green-600" : "text-red-500"
        }`}>
          {msg.text}
        </p>
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-xl font-semibold mb-6">
          {editingId ? "Edit Certification" : "Add Certification"}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { label: "Certification Name", name: "title", placeholder: "AWS Certified Developer" },
            { label: "Issuing Organization", name: "organization", placeholder: "Google, Microsoft, AWS" },
            { label: "Issue Date", name: "issue_date", type: "date" },
            { label: "Expiry Date", name: "expiry_date", type: "date" },
            { label: "Credential ID", name: "credential_id", placeholder: "Certificate ID" },
            { label: "Credential URL", name: "credential_url", placeholder: "https://certificate-link.com" },
          ].map(({ label, name, type = "text", placeholder }) => (
            <div key={name}>
              <label className="font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="font-medium text-gray-700">Description</label>
            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your certification..."
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
            {editingId ? "Update Certification" : "Add Certification"}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mt-8 space-y-6">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : certifications.length === 0 ? (
          <p className="text-gray-400">No certifications added yet.</p>
        ) : (
          certifications.map((cert) => (
            <div key={cert.id} className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="bg-cyan-100 p-3 rounded-xl h-fit">
                    <Award className="text-cyan-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{cert.title}</h2>
                    <p className="text-gray-600">{cert.organization}</p>
                    <p className="text-sm text-cyan-600 mt-2">Issued: {cert.issue_date}</p>
                    {cert.expiry_date && <p className="text-sm text-gray-500">Expiry: {cert.expiry_date}</p>}
                    {cert.credential_id && <p className="text-sm text-gray-500">Credential ID: {cert.credential_id}</p>}
                    <p className="mt-4 text-gray-600">{cert.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(cert)} className="rounded-lg bg-blue-100 p-3 hover:bg-blue-200">
                    <Pencil size={18} className="text-blue-600" />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="rounded-lg bg-red-100 p-3 hover:bg-red-200">
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
