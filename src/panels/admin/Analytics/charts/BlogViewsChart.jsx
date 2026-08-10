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
  { month: "Jan", views: 12000 },
  { month: "Feb", views: 16000 },
  { month: "Mar", views: 18500 },
  { month: "Apr", views: 21400 },
  { month: "May", views: 25800 },
  { month: "Jun", views: 32100 },
];

export default function BlogViewsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="views"
          stroke="#7c3aed"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}