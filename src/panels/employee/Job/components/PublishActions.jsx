import {
  Save,
  Eye,
  CalendarDays,
  Send,
  X,
} from "lucide-react";

export default function PublishActions({
  loading = false,
  onSaveDraft,
  onPreview,
  onSchedule,
  onPublish,
  onCancel,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Ready to Publish?
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review your job posting before making it live.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 hover:bg-slate-100"
          >
            <X size={18} />
            Cancel
          </button>

          <button
            type="button"
            onClick={onSaveDraft}
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 hover:bg-slate-100"
          >
            <Save size={18} />
            Save Draft
          </button>

          <button
            type="button"
            onClick={onPreview}
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 hover:bg-slate-100"
          >
            <Eye size={18} />
            Preview
          </button>

          <button
            type="button"
            onClick={onSchedule}
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 hover:bg-slate-100"
          >
            <CalendarDays size={18} />
            Schedule
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onPublish}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Send size={18} />

            {loading ? "Publishing..." : "Publish Job"}
          </button>

        </div>

      </div>

    </div>
  );
}