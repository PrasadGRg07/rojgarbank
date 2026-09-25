import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const applicationData = [
  { month: "Jan", applications: 120 },
  { month: "Feb", applications: 180 },
  { month: "Mar", applications: 240 },
  { month: "Apr", applications: 210 },
  { month: "May", applications: 320 },
  { month: "Jun", applications: 410 },
];

const jobCategoryData = [
  { name: "IT", value: 40 },
  { name: "Finance", value: 20 },
  { name: "Marketing", value: 15 },
  { name: "Healthcare", value: 15 },
  { name: "Others", value: 10 },
];

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

const axisTick = { fontSize: 12, fill: "#94A3B8" };

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #E2E8F0",
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
  fontSize: 13,
};

function Panel({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-800">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        )}
      </div>

      {children}
    </div>
  );
}

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Panel
        title="Applications Trend"
        subtitle="Monthly applications received"
      >
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={applicationData}
              margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient id="appFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="#2563EB"
                    stopOpacity={0.28}
                  />
                  <stop
                    offset="100%"
                    stopColor="#2563EB"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#F1F5F9"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={axisTick}
                dy={8}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={axisTick}
                width={48}
              />

              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ stroke: "#CBD5E1", strokeDasharray: "4 4" }}
              />

              <Area
                type="monotone"
                dataKey="applications"
                stroke="#2563EB"
                strokeWidth={2.5}
                fill="url(#appFill)"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel
        title="Jobs by Category"
        subtitle="Share of published jobs"
      >
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={jobCategoryData}
                dataKey="value"
                nameKey="name"
                innerRadius="52%"
                outerRadius="78%"
                paddingAngle={3}
                stroke="none"
              >
                {jobCategoryData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
          {jobCategoryData.map((entry, index) => (
            <li
              key={entry.name}
              className="flex items-center gap-2 text-sm"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <span className="truncate text-slate-500">{entry.name}</span>
              <span className="ml-auto font-semibold tabular-nums text-slate-700">
                {entry.value}%
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
