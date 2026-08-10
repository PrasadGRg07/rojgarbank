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
  { month: "Jan", participants: 220 },
  { month: "Feb", participants: 410 },
  { month: "Mar", participants: 560 },
  { month: "Apr", participants: 720 },
  { month: "May", participants: 890 },
  { month: "Jun", participants: 1040 },
];

export default function EventParticipationChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="participants"
          fill="#22c55e"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}