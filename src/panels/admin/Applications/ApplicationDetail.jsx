import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Mail,
  Phone,
  Briefcase,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { applicationData } from "./data/applicationData";

export default function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const application = applicationData.find((item) => item.id === Number(id));

  if (!application) {
    return (
      <div className="rounded-xl bg-white p-6 text-center dark:bg-slate-900">
        Application not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl border p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Application Details
          </h1>

          <p className="text-sm text-slate-500">
            Review candidate application information.
          </p>
        </div>
      </div>

      {/* Candidate Card */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          {application.applicant}
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Mail size={18} />
            {application.email}
          </p>

          <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Phone size={18} />
            {application.phone}
          </p>

          <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Briefcase size={18} />
            {application.job}
          </p>

          <p className="text-slate-600 dark:text-slate-300">
            Experience: {application.experience}
          </p>
        </div>
      </div>

      {/* Application Status */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-4 text-lg font-semibold">Application Status</h2>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          {application.status}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() =>
            navigate(`/admin/dashboard/applications/${application.id}/resume`)
          }
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700"
        >
          <FileText size={18} />
          View Resume
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">
          <CheckCircle size={18} />
          Approve
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700">
          <XCircle size={18} />
          Reject
        </button>
      </div>
    </div>
  );
}
