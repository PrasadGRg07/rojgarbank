import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Technology", value: 40, color: "#2563eb" },
  { name: "Career", value: 25, color: "#16a34a" },
  { name: "Interview", value: 20, color: "#f59e0b" },
  { name: "Education", value: 15, color: "#ef4444" },
];

export default function BlogCategoryChart() {
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