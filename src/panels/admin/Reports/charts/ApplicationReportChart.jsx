import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Pending", value: 35 },
  { name: "Reviewed", value: 28 },
  { name: "Rejected", value: 18 },
  { name: "Hired", value: 19 },
];

const colors = ["#3b82f6", "#8b5cf6", "#ef4444", "#10b981"];

export default function ApplicationReportChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={100} label>
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
