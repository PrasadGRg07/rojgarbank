import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { source: "Google", users: 92000 },
  { source: "Direct", users: 51000 },
  { source: "Facebook", users: 34000 },
  { source: "LinkedIn", users: 21000 },
  { source: "Others", users: 17000 },
];

export default function TrafficSourceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="source" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="users"
          fill="#8b5cf6"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}