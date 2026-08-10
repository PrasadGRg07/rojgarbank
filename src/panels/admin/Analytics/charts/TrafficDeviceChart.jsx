import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Mobile",
    value: 68,
    color: "#3b82f6",
  },
  {
    name: "Desktop",
    value: 32,
    color: "#22c55e",
  },
];

export default function TrafficDeviceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          label
        >
          {data.map((item, index) => (
            <Cell
              key={index}
              fill={item.color}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}