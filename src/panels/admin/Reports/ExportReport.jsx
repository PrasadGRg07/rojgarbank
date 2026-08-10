import { useState } from "react";
import { Download, FileDown } from "lucide-react";

export default function ExportReport() {
  const [reportType, setReportType] = useState("users");
  const [format, setFormat] = useState("pdf");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-3">
            <FileDown className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Export Reports
            </h1>

            <p className="text-slate-500 dark:text-slate-400">
              Generate and download reports in multiple formats.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Report Type
            </label>

            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="users">Users</option>
              <option value="employers">Employers</option>
              <option value="jobs">Jobs</option>
              <option value="applications">Applications</option>
              <option value="blogs">Blogs</option>
              <option value="events">Events</option>
              <option value="training">Training</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Export Format
            </label>

            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Start Date
            </label>

            <input
              type="date"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">End Date</label>

            <input
              type="date"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked />
            Include Charts
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked />
            Include Tables
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked />
            Include Statistics
          </label>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">
            <FileDown size={18} />
            Generate Report
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
            <Download size={18} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
