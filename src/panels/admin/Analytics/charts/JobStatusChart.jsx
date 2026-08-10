import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Active",
    value: 68,
    color: "#22c55e",
  },
  {
    name: "Pending",
    value: 18,
    color: "#f59e0b",
  },
  {
    name: "Expired",
    value: 14,
    color: "#ef4444",
  },
];

export default function JobStatusChart() {
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
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.color}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}