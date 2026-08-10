import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { trafficSourceData } from "../data/dashboardData";

export default function TrafficChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={trafficSourceData}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="source" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="visitors"
          fill="#8b5cf6"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}