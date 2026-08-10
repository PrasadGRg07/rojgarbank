import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", success: 500, failed: 40 },
  { day: "Tue", success: 700, failed: 60 },
  { day: "Wed", success: 650, failed: 35 },
  { day: "Thu", success: 900, failed: 80 },
  { day: "Fri", success: 750, failed: 50 },
  { day: "Sat", success: 820, failed: 70 },
];

export default function LoginTrendChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="success"
          radius={[6, 6, 0, 0]}
        />

        <Bar
          dataKey="failed"
          radius={[6, 6, 0, 0]}
        />

      </BarChart>
    </ResponsiveContainer>
  );
}