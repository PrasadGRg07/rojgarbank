import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Accepted",
    value: 42,
    color: "#22c55e",
  },
  {
    name: "Pending",
    value: 33,
    color: "#f59e0b",
  },
  {
    name: "Rejected",
    value: 25,
    color: "#ef4444",
  },
];

export default function ApplicationStatusChart() {
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