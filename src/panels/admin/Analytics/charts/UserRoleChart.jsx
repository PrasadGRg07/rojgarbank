import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { userRoleData } from "../data/userAnalyticsData";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
];

export default function UserRoleChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={userRoleData}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          innerRadius={45}
          paddingAngle={4}
        >
          {userRoleData.map((item, index) => (
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