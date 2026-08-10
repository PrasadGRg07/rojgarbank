import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import JobCard from "../components/JobCard";
import { getJobs, getSavedJobs, toggleSavedJob } from "../../../lib/jobseekerApi";

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [savedJobIds, setSavedJobIds] = useState(new Set());
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchJobsAndSaved();
    }, []);

    const fetchJobsAndSaved = async () => {
        try {
            setLoading(true);
            const [jobsData, savedData] = await Promise.all([getJobs(), getSavedJobs()]);
            setJobs(jobsData);
            setSavedJobIds(new Set(savedData.map((s) => s.job.id)));
        } catch (error) {
            console.error("Failed to fetch jobs data:", error);
        } finally {
            setLoading(false);
        }
    };

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

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                Loading jobs...
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="flex h-96 items-center justify-center">
                <h2 className="text-xl font-semibold text-gray-500">
                    No approved jobs available.
                </h2>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    title={job.title}
                    company={job.company}
                    location={`${job.district}, ${job.municipality}`}
                    salary={
                        job.hideSalary
                            ? "Negotiable"
                            : `${job.currency} ${job.salaryMin ?? ""} - ${job.salaryMax ?? ""}`
                    }
                    type={job.employmentType}
                    posted={new Date(job.created_at).toLocaleDateString()}
                    logo="/logo.png"
                    onViewDetails={() =>
                        navigate(`/jobseeker/dashboard/jobs/${job.id}`)
                    }
                    onSave={() => handleSave(job.id)}
                    isSaved={savedJobIds.has(job.id)}
                />
            ))}
        </div>
    );
}