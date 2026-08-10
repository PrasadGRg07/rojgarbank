import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { time: "10AM", events: 120 },
  { time: "12PM", events: 180 },
  { time: "2PM", events: 90 },
  { time: "4PM", events: 240 },
  { time: "6PM", events: 160 },
  { time: "8PM", events: 210 },
];

export default function SystemHealthChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="time" />

        <YAxis />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="events"
          fillOpacity={0.3}
          strokeWidth={3}
        />

      </AreaChart>
    </ResponsiveContainer>
  );
}