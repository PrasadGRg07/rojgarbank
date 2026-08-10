import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", events: 6 },
  { month: "Feb", events: 9 },
  { month: "Mar", events: 12 },
  { month: "Apr", events: 10 },
  { month: "May", events: 15 },
  { month: "Jun", events: 18 },
];

export default function EventTrendChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="events"
          stroke="#2563eb"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}