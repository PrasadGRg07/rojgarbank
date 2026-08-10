import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { genderData } from "../data/userAnalyticsData";

const COLORS = [
  "#3b82f6",
  "#ec4899",
  "#8b5cf6",
];

export default function GenderChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={genderData}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          innerRadius={45}
          paddingAngle={4}
        >
          {genderData.map((item, index) => (
            <Cell
              key={item.name}
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