import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", applications: 850 },
  { month: "Feb", applications: 1020 },
  { month: "Mar", applications: 1180 },
  { month: "Apr", applications: 1420 },
  { month: "May", applications: 1680 },
  { month: "Jun", applications: 1930 },
];

export default function ApplicationTrendChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="applications"
          stroke="#2563eb"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}