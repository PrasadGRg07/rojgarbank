import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Workshop",
    value: 35,
    color: "#3b82f6",
  },
  {
    name: "Seminar",
    value: 30,
    color: "#22c55e",
  },
  {
    name: "Training",
    value: 20,
    color: "#f59e0b",
  },
  {
    name: "Career Fair",
    value: 15,
    color: "#ef4444",
  },
];

export default function EventTypeChart() {
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