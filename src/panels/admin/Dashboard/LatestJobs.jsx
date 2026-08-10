import { Briefcase } from "lucide-react";
import ListCard from "../components/ListCard";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Studio",
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "Soft Nepal",
  },
];

export default function LatestJobs() {
  return (
    <ListCard
      title="Latest Jobs"
      items={jobs}
      icon={Briefcase}
      iconBg="bg-blue-100"
      iconColor="text-blue-600"
      primaryKey="title"
      secondaryKey="company"
    />
  );
}