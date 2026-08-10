import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";

export default function RecommendedJobs() {
    const navigate = useNavigate();

    const recommendedJobs = [
        {
            id: 1,
            title: "React Developer",
            company: "Tech Solutions Pvt Ltd",
            location: "Kathmandu",
            salary: "Rs. 50,000",
            type: "Full Time",
            posted: "1 day ago",
            logo: "/logo.png",
        },
        {
            id: 2,
            title: "QA Tester Intern",
            company: "Rojgar Bank Pvt Ltd",
            location: "Lalitpur",
            salary: "Rs. 15,000",
            type: "Internship",
            posted: "3 days ago",
            logo: "/logo.png",
        },
        {
            id: 3,
            title: "Django Developer",
            company: "Software Hub",
            location: "Bhaktapur",
            salary: "Rs. 60,000",
            type: "Full Time",
            posted: "5 days ago",
            logo: "/logo.png",
        },
    ];

    const handleSave = (job) => {
        console.log("Saved job:", job);
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Recommended Jobs
                </h1>

                <p className="mt-2 text-gray-500">
                    Jobs matching your profile and skills
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedJobs.map((job) => (
                    <JobCard
                        key={job.id}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        salary={job.salary}
                        type={job.type}
                        posted={job.posted}
                        logo={job.logo}
                        onViewDetails={() =>
                            navigate(`/jobseeker/dashboard/jobs/${job.id}`)
                        }
                        onSave={() => handleSave(job)}
                    />
                ))}
            </div>
        </div>
    );
}