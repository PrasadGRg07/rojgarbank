import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", jobs: 80 },
  { month: "Feb", jobs: 120 },
  { month: "Mar", jobs: 150 },
  { month: "Apr", jobs: 210 },
  { month: "May", jobs: 260 },
  { month: "Jun", jobs: 320 },
];

export default function JobReportChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="jobs"
          stroke="#10b981"
          fill="#10b98133"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
