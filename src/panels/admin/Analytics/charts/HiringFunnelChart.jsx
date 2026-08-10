import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
} from "recharts";

const data = [
  {
    value: 18920,
    name: "Applied",
  },
  {
    value: 9620,
    name: "Shortlisted",
  },
  {
    value: 4120,
    name: "Interviewed",
  },
  {
    value: 1850,
    name: "Hired",
  },
];

export default function HiringFunnelChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <FunnelChart>
        <Tooltip />

        <Funnel
          dataKey="value"
          data={data}
          isAnimationActive
        >
          <LabelList
            position="right"
            fill="#374151"
            stroke="none"
            dataKey="name"
          />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
}