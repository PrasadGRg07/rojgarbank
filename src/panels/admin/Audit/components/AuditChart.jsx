import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { activityTrendData } from "../data/auditData";

export default function AuditChart() {
  const totalLogs = activityTrendData.reduce((sum, item) => sum + item.logs, 0);

  const averageLogs = Math.round(totalLogs / activityTrendData.length);

  const peakDay = activityTrendData.reduce((prev, current) =>
    current.logs > prev.logs ? current : prev,
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Activity Trend
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Audit events recorded during the last 7 days
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm lg:text-right">
          <div>
            <p className="text-slate-500 dark:text-slate-400">Average</p>

            <h3 className="font-semibold text-slate-900 dark:text-white">
              {averageLogs}/day
            </h3>
          </div>

          <div>
            <p className="text-slate-500 dark:text-slate-400">Peak</p>

            <h3 className="font-semibold text-slate-900 dark:text-white">
              {peakDay.day} ({peakDay.logs})
            </h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activityTrendData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="day" tickLine={false} axisLine={false} />

            <YAxis tickLine={false} axisLine={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="logs"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
