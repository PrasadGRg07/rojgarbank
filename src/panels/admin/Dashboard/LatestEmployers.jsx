import { Building2 } from "lucide-react";
import ListCard from "../components/ListCard";

const employers = [
  { id: 1, name: "Tech Solutions" },
  { id: 2, name: "Creative Studio" },
  { id: 3, name: "Soft Nepal" },
];

export default function LatestEmployers() {
  return (
    <ListCard
      title="Latest Employers"
      items={employers}
      icon={Building2}
      iconBg="bg-green-100"
      iconColor="text-green-600"
      primaryKey="name"
    />
  );
}