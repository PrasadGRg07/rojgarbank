import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { employerGrowthData } from "../data/employerAnalyticsData";

export default function EmployerGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={employerGrowthData}>
        <defs>
          <linearGradient id="employerGrowth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="employers"
          stroke="#2563eb"
          strokeWidth={3}
          fill="url(#employerGrowth)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}