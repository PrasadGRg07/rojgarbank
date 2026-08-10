import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { industryData } from "../data/employerAnalyticsData";

export default function IndustryChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={industryData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="industry" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="employers"
          radius={[8, 8, 0, 0]}
          fill="#7c3aed"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}