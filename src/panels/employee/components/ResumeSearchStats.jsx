import React from "react";
import {
  Search,
  Eye,
  Bookmark,
  Users,
} from "lucide-react";

function ProgressItem({
  icon: Icon,
  title,
  value,
  total,
  color,
}) {
  const percentage =
    total === 0 ? 0 : Math.min((value / total) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`rounded-lg p-2 ${color}`}>
            <Icon size={18} className="text-white" />
          </div>

          <span className="font-medium text-slate-700">
            {title}
          </span>
        </div>

        <span className="font-bold text-slate-900">
          {value}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${percentage}%`,
            transition: "width .5s ease",
          }}
        />
      </div>
    </div>
  );
}

function ResumeSearchStats({
  stats = {
    searches: 0,
    viewed: 0,
    saved: 0,
    candidates: 100,
  },
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Resume Search Statistics
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track your candidate search activity.
        </p>
      </div>

      <div className="space-y-6">
        <ProgressItem
          icon={Search}
          title="Resume Searches"
          value={stats.searches}
          total={stats.candidates}
          color="bg-blue-600"
        />

        <ProgressItem
          icon={Eye}
          title="Profiles Viewed"
          value={stats.viewed}
          total={stats.candidates}
          color="bg-emerald-500"
        />

        <ProgressItem
          icon={Bookmark}
          title="Profiles Saved"
          value={stats.saved}
          total={stats.candidates}
          color="bg-orange-500"
        />
      </div>

      <div className="mt-8 rounded-xl bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-indigo-100 p-3">
            <Users
              size={22}
              className="text-indigo-600"
            />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Total Candidates
            </p>

            <p className="text-2xl font-bold text-slate-900">
              {stats.candidates}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ResumeSearchStats);