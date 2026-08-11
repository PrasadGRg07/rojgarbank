import React, { useEffect, useState } from "react";
import { Upload, FileText, Download, Trash2, RefreshCw, Eye, X } from "lucide-react";
import { getResume, uploadResume, deleteResume } from "../../../lib/jobseekerApi";

export default function Resume() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await getResume();
      setResume(res.data?.resume ? res.data : null);
    } catch {
      setResume(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSaving(true);
    setMsg({ text: "", type: "" });
    try {
      const formData = new FormData();
      formData.append("resume", file);
      await uploadResume(formData);
      setMsg({ text: "Resume uploaded successfully.", type: "success" });
      fetchResume();
    } catch (err) {
      console.error("Upload error:", err?.response?.data || err.message);
      setMsg({ text: "Failed to upload resume. Please try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete your resume?")) return;
    try {
      await deleteResume();
      setResume(null);
      setMsg({ text: "Resume deleted.", type: "success" });
    } catch {
      setMsg({ text: "Failed to delete resume.", type: "error" });
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Resume</h1>
        <p className="text-gray-500 mt-2">Upload and manage your professional resume.</p>
      </div>

      {msg.text && (
        <p className={`mb-4 text-sm font-medium ${msg.type === "success" ? "text-green-600" : "text-red-500"}`}>
          {msg.text}
        </p>
      )}

      {/* Upload Card */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        {!resume ? (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-cyan-300 rounded-2xl p-12 cursor-pointer hover:border-cyan-500 transition">
            <Upload size={60} className="text-cyan-600 mb-5" />
            <h2 className="text-xl font-semibold text-gray-700">Upload Resume</h2>
            <p className="text-gray-500 mt-2 text-center">
              PDF, DOC or DOCX <br /> Maximum size 5 MB
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleUpload}
              className="hidden"
            />
            <span className="mt-6 rounded-xl bg-cyan-600 px-6 py-3 text-white font-medium hover:bg-cyan-700 transition">
              {saving ? "Uploading..." : "Choose Resume"}
            </span>
          </label>
        ) : (
          <div>
            <div className="flex items-center gap-5 rounded-xl border p-6">
              <div className="rounded-xl bg-cyan-100 p-4">
                <FileText size={42} className="text-cyan-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{resume.file_name || "Resume"}</h3>
                <p className="text-gray-500 mt-1 text-sm">
                  Uploaded: {resume.uploaded_at ? new Date(resume.uploaded_at).toLocaleDateString() : "—"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              {resume.file_url && (
                <>
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition shadow-sm"
                  >
                    <Eye size={18} />
                    Preview
                  </button>

                  <a
                    href={resume.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-white hover:bg-cyan-700 transition shadow-sm"
                  >
                    <Download size={18} />
                    Download
                  </a>
                </>
              )}

              <label className="flex items-center gap-2 rounded-xl border px-5 py-3 cursor-pointer hover:bg-gray-100 transition">
                <RefreshCw size={18} />
                {saving ? "Uploading..." : "Replace Resume"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-white hover:bg-red-600 transition"
              >
                <Trash2 size={18} />
                Delete Resume
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && resume?.file_url && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative flex h-[85vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-3">
                <FileText className="text-cyan-600" size={24} />
                <h3 className="font-semibold text-lg text-slate-800">
                  {resume.file_name || "Resume Preview"}
                </h3>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 bg-slate-100 p-2">
              <iframe
                src={resume.file_url}
                title="Resume Preview"
                className="h-full w-full rounded-lg border-0 bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 bg-cyan-50 border border-cyan-100 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-cyan-700 mb-3">Resume Tips</h3>
        <ul className="space-y-2 text-gray-600 list-disc list-inside">
          <li>Keep your resume updated.</li>
          <li>Use a professional PDF format.</li>
          <li>Highlight your latest experience.</li>
          <li>Include relevant technical skills.</li>
          <li>Keep your resume concise (1–2 pages).</li>
        </ul>
      </div>
    </div>
  );
}
