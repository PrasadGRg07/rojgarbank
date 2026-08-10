import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Low", value: 65 },
  { name: "Medium", value: 25 },
  { name: "High", value: 10 },
];

const colors = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

export default function SecurityRiskChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label
        >
          {data.map((item,index)=>(
            <Cell
              key={index}
              fill={colors[index]}
            />
          ))}
        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>
  );
}