import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { applicationStatusData } from "../data/dashboardData";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

export default function ApplicationPieChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={applicationStatusData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={45}
          paddingAngle={3}
        >
          {applicationStatusData.map((entry, index) => (
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
  );
}