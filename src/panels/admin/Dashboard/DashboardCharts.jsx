import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
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

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Applications Trend */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Applications Trend
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={applicationData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="applications"
                stroke="#2563EB"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Jobs by Category */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Jobs by Category
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={jobCategoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {jobCategoryData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}