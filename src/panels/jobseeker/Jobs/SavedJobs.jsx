import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import { getSavedJobs, toggleSavedJob } from "../../../lib/jobseekerApi";

export default function SavedJobs() {
    const navigate = useNavigate();

    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    const fetchSavedJobs = async () => {
        try {
            setLoading(true);
            const data = await getSavedJobs();
            setSavedJobs(data);
        } catch (error) {
            console.error("Failed to fetch saved jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (savedJob) => {
        try {
            await toggleSavedJob(savedJob.job.id);
            // Refresh list
            fetchSavedJobs();
        } catch (error) {
            console.error("Failed to remove saved job:", error);
        }
    };

    if (loading) {
        return <div className="p-6">Loading saved jobs...</div>;
    }

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold text-gray-800">
                Saved Jobs
            </h1>

            {savedJobs.length === 0 ? (
                <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                    <p className="text-gray-500">
                        No saved jobs found.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {savedJobs.map((savedJob) => {
                        const job = savedJob.job;
                        return (
                            <JobCard
                                key={savedJob.id}
                                title={job.title}
                                company={job.company_name || job.company}
                                location={job.location}
                                salary={`Rs. ${job.salary_min || 0} - ${job.salary_max || 0}`}
                                type={job.employment_type || job.type}
                                posted={new Date(job.created_at).toLocaleDateString() || "Recently"}
                                logo={job.logo || "/logo.png"}
                                onViewDetails={() =>
                                    navigate(`/jobseeker/dashboard/jobs/${job.id}`)
                                }
                                onSave={() => handleRemove(savedJob)}
                                isSaved={true}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}