import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { registrationData } from "../data/userAnalyticsData";

export default function RegistrationChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={registrationData}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="users"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}