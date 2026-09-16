import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import { getJobs, getSavedJobs, toggleSavedJob } from "../../../lib/jobseekerApi";

export default function RecommendedJobs() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [savedJobIds, setSavedJobIds] = useState(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobsAndSaved = async () => {
            try {
                setLoading(true);
                const [jobsData, savedData] = await Promise.all([getJobs(), getSavedJobs()]);
                // For now, take the first 4 jobs as "recommended"
                setJobs(jobsData.slice(0, 4));
                setSavedJobIds(new Set(savedData.map((s) => s.job.id)));
            } catch (error) {
                console.error("Failed to fetch jobs data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobsAndSaved();
    }, []);

    const handleSave = async (jobId) => {
        try {
            await toggleSavedJob(jobId);
            setSavedJobIds((prev) => {
                const next = new Set(prev);
                if (next.has(jobId)) {
                    next.delete(jobId);
                } else {
                    next.add(jobId);
                }
                return next;
            });
        } catch (error) {
            console.error("Failed to toggle saved job:", error);
        }
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

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    Loading recommended jobs...
                </div>
            ) : jobs.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center text-center">
                    <h2 className="text-xl font-semibold text-gray-500">
                        No recommendations yet.
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Keep your profile updated to get better matches!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobs.map((job) => (
                        <JobCard
                            key={job.id}
                            title={job.title}
                            company={job.employer_company_name || job.company}
                            location={`${job.district || ""}, ${job.municipality || ""}`.replace(/^, | , $/g, '')}
                            salary={
                                job.hideSalary
                                    ? "Negotiable"
                                    : `${job.currency || "Rs."} ${job.salaryMin ?? ""} - ${job.salaryMax ?? ""}`
                            }
                            type={job.employmentType}
                            posted={new Date(job.created_at).toLocaleDateString()}
                            logo={job.employer_profile_picture || job.logo || "/logo.png"}
                            onViewDetails={() =>
                                navigate(`/jobseeker/dashboard/jobs/${job.id}`)
                            }
                            onSave={() => handleSave(job.id)}
                            isSaved={savedJobIds.has(job.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}