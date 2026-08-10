import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", activity: 400 },
  { day: "Tue", activity: 700 },
  { day: "Wed", activity: 550 },
  { day: "Thu", activity: 900 },
  { day: "Fri", activity: 650 },
  { day: "Sat", activity: 800 },
];

export default function AuditActivityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="activity"
          strokeWidth={3}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}