import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

import { applicationData } from "./data/applicationData";

export default function ResumeViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const application = applicationData.find((item) => item.id === Number(id));

  if (!application) {
    return (
      <div className="rounded-xl bg-white p-6 text-center dark:bg-slate-900">
        Resume not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold dark:text-white">
              Resume Viewer
            </h1>

            <p className="text-sm text-slate-500">{application.applicant}</p>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700">
          <Download size={18} />
          Download
        </button>
      </div>

      {/* Resume Preview */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <iframe
          src="/sample-resume.pdf"
          title="Resume Preview"
          className="h-[800px] w-full rounded-xl border"
        />
      </div>
    </div>
  );
}
