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
  { month: "Jan", visitors: 32000 },
  { month: "Feb", visitors: 41000 },
  { month: "Mar", visitors: 52000 },
  { month: "Apr", visitors: 61000 },
  { month: "May", visitors: 72000 },
  { month: "Jun", visitors: 84500 },
];

export default function TrafficVisitorsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="visitors"
          stroke="#2563eb"
          fill="#93c5fd"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}