import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyApplications } from "../../../lib/jobseekerApi";

export default function AppliedJobs() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const data = await getMyApplications();
            setApplications(data);
        } catch (error) {
            console.error("Failed to load applications:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                Loading applications...
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <h1 className="text-3xl font-bold">
                Applied Jobs
            </h1>

            {applications.length === 0 ? (
                <div className="rounded-lg border bg-white p-8 text-center">
                    <p className="text-gray-500">
                        You haven't applied for any jobs yet.
                    </p>
                </div>
            ) : (
                applications.map((application) => (
                    <div
                        key={application.id}
                        onClick={() =>
                            navigate(
                                `/jobseeker/dashboard/applications/${application.id}`
                            )
                        }
                        className="cursor-pointer rounded-xl border bg-white p-6 shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold">
                            {application.job_title}
                        </h2>

                        <p className="text-gray-600">
                            {application.company}
                        </p>

                        <div className="mt-4 flex justify-between">
                            <span className="font-medium">
                                Status:
                                <span className="ml-2 capitalize text-blue-600">
                                    {application.status}
                                </span>
                            </span>

                            <span className="text-sm text-gray-500">
                                {new Date(
                                    application.applied_at
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))
            )}

        </div>
    );
}