import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { activeUsersData } from "../data/userAnalyticsData";

export default function ActiveUsersChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={activeUsersData}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="activeUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="active"
          stroke="#10b981"
          strokeWidth={3}
          fill="url(#activeUsers)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}