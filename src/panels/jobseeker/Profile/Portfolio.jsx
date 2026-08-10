import React, { useState, useEffect } from "react";
import { FolderGit2, Plus, Pencil, Trash2, Save, X, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { getPortfolio, createPortfolio, updatePortfolio, deletePortfolio } from "../../../lib/jobseekerApi";

const EMPTY_FORM = {
  title: "",
  project_type: "",
  technologies: "",
  project_url: "",
  github_url: "",
  image: null,
  description: "",
};

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchPortfolios(); }, []);

  const fetchPortfolios = async () => {
    try {
      const res = await getPortfolio();
      setPortfolios(res.data);
    } catch {
      showToast("error", "Failed to load portfolios.");
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const resetForm = () => { setForm(EMPTY_FORM); setEditingId(null); };

  const buildFormData = () => {
    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val !== null && val !== "") fd.append(key, val);
    });
    return fd;
  };

  const handleSave = async () => {
    if (!form.title) return;
    setLoading(true);
    try {
      if (editingId) {
        const res = await updatePortfolio(editingId, buildFormData());
        setPortfolios(portfolios.map((p) => (p.id === editingId ? res.data : p)));
        showToast("success", "Portfolio updated successfully!");
      } else {
        const res = await createPortfolio(buildFormData());
        setPortfolios([...portfolios, res.data]);
        showToast("success", "Portfolio added successfully!");
      }
      resetForm();
    } catch (err) {
      console.error("Portfolio error:", err?.response?.data || err.message);
      showToast("error", editingId ? "Failed to update portfolio." : "Failed to add portfolio.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({ ...project, image: null });
  };

  const handleDelete = async (id) => {
    try {
      await deletePortfolio(id);
      setPortfolios(portfolios.filter((p) => p.id !== id));
      showToast("success", "Portfolio deleted.");
    } catch {
      showToast("error", "Failed to delete portfolio.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl px-5 py-3 text-white shadow-lg ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.type === "success" ? <CheckCircle size={18} /> : <XCircle size={18} />}
          {toast.message}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Portfolio</h1>
        <p className="text-gray-500 mt-2">Showcase your projects and achievements.</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-xl font-semibold mb-6">{editingId ? "Edit Portfolio" : "Add Portfolio"}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium text-gray-700">Project Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Project Name" className="mt-2 w-full rounded-xl border px-4 py-3" />
          </div>

          <div>
            <label className="font-medium text-gray-700">Project Type</label>
            <select name="project_type" value={form.project_type} onChange={handleChange} className="mt-2 w-full rounded-xl border px-4 py-3">
              <option value="">Select Type</option>
              <option>Web Application</option>
              <option>Mobile Application</option>
              <option>Research Project</option>
              <option>Personal Project</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700">Technologies Used</label>
            <input type="text" name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, Django, Python" className="mt-2 w-full rounded-xl border px-4 py-3" />
          </div>

          <div>
            <label className="font-medium text-gray-700">Project Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="mt-2 w-full rounded-xl border px-4 py-3" />
          </div>

          <div>
            <label className="font-medium text-gray-700">Live Project URL</label>
            <input type="text" name="project_url" value={form.project_url} onChange={handleChange} placeholder="https://project.com" className="mt-2 w-full rounded-xl border px-4 py-3" />
          </div>

          <div>
            <label className="font-medium text-gray-700">GitHub URL</label>
            <input type="text" name="github_url" value={form.github_url} onChange={handleChange} placeholder="https://github.com/project" className="mt-2 w-full rounded-xl border px-4 py-3" />
          </div>

          <div className="md:col-span-2">
            <label className="font-medium text-gray-700">Description</label>
            <textarea rows="4" name="description" value={form.description} onChange={handleChange} placeholder="Describe your project..." className="mt-2 w-full rounded-xl border px-4 py-3" />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {editingId && (
            <button onClick={resetForm} className="flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-gray-100">
              <X size={18} /> Cancel
            </button>
          )}
          <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-700 disabled:opacity-60">
            {editingId ? <Save size={18} /> : <Plus size={18} />}
            {editingId ? "Update Portfolio" : "Add Portfolio"}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mt-8 space-y-6">
        {portfolios.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  {!project.image && (
                    <div className="bg-cyan-100 p-3 rounded-xl h-fit">
                      <FolderGit2 className="text-cyan-600" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold">{project.title}</h2>
                    <p className="text-gray-600">{project.project_type}</p>
                    <p className="text-sm text-cyan-600 mt-2">{project.technologies}</p>
                    <p className="mt-4 text-gray-600">{project.description}</p>
                    <div className="flex gap-4 mt-4">
                      {project.project_url && (
                        <a href={project.project_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-cyan-600">
                          Live Demo <ExternalLink size={16} />
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-cyan-600">
                          GitHub <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(project)} className="rounded-lg bg-blue-100 p-3 hover:bg-blue-200">
                    <Pencil size={18} className="text-blue-600" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="rounded-lg bg-red-100 p-3 hover:bg-red-200">
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
