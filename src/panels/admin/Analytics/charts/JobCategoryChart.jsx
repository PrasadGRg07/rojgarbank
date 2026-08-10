import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
 CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { category: "IT", jobs: 420 },
  { category: "Finance", jobs: 260 },
  { category: "Marketing", jobs: 180 },
  { category: "HR", jobs: 140 },
  { category: "Design", jobs: 120 },
];

export default function JobCategoryChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="jobs"
          fill="#3b82f6"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}