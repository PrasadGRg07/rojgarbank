import { FileText } from "lucide-react";
import ListCard from "../components/ListCard";

const applications = [
  { id: 1, applicant: "John Doe" },
  { id: 2, applicant: "Jane Smith" },
  { id: 3, applicant: "Michael Lee" },
];

export default function LatestApplications() {
  return (
    <ListCard
      title="Latest Applications"
      items={applications}
      icon={FileText}
      iconBg="bg-purple-100"
      iconColor="text-purple-600"
      primaryKey="applicant"
    />
  );
}