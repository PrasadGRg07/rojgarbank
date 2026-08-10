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
  { month: "Jan", blogs: 12 },
  { month: "Feb", blogs: 18 },
  { month: "Mar", blogs: 22 },
  { month: "Apr", blogs: 16 },
  { month: "May", blogs: 28 },
  { month: "Jun", blogs: 32 },
];

export default function BlogPostsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="blogs"
          fill="#2563eb"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}