import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { verificationData } from "../data/employerAnalyticsData";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

export default function EmployerVerificationChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={verificationData}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          innerRadius={45}
          paddingAngle={5}
        >
          {verificationData.map((item, index) => (
            <Cell
              key={item.name}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}