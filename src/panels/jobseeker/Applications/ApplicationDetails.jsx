import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplication } from "../../../lib/jobseekerApi";

export default function ApplicationDetails() {
    const { id } = useParams();

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplication();
    }, [id]);

    const loadApplication = async () => {
        try {
            const data = await getApplication(id);
            setApplication(data);
        } catch (error) {
            console.error("Failed to load application:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                Loading application...
            </div>
        );
    }

    if (!application) {
        return (
            <div className="p-6">
                Application not found.
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-white p-8 shadow">

            <h1 className="mb-6 text-3xl font-bold">
                Application Details
            </h1>

            <div className="space-y-4">

                <div>
                    <p className="text-sm text-gray-500">
                        Job Title
                    </p>

                    <p className="text-lg font-semibold">
                        {application.job_title}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Company
                    </p>

                    <p className="text-lg">
                        {application.company}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Status
                    </p>

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700">
                        {application.status}
                    </span>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Applied On
                    </p>

                    <p>
                        {new Date(
                            application.applied_at
                        ).toLocaleString()}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Cover Letter
                    </p>

                    <div className="mt-2 rounded-lg border p-4">
                        {application.cover_letter || "No cover letter submitted."}
                    </div>
                </div>

                {application.resume && (
                    <div>
                        <p className="text-sm text-gray-500">
                            Resume
                        </p>

                        <a
                            href={application.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            View Resume
                        </a>
                    </div>
                )}

            </div>

        </div>
    );
}