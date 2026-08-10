import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getApplicantDetail,
    updateApplicantStatus,
} from "../../../lib/employeeJobApi";

import {
    ArrowLeft,
    User,
    Mail,
    FileText,
    Calendar,
    MessageCircle,
} from "lucide-react";

import api from "../../../lib/api";

export default function ApplicantDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [applicant, setApplicant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplicant();
    }, [id]);

    const loadApplicant = async () => {
        try {
            const data = await getApplicantDetail(id);
            setApplicant(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const changeStatus = async (status) => {
        try {
            const updated = await updateApplicantStatus(id, status);
            setApplicant(updated);

            alert(`Application marked as ${status}`);
        } catch (error) {
            console.error(error);
            alert("Failed to update status.");
        }
    };

    const handleMessage = async () => {
        try {
            const response = await api.post("/messaging/conversations/start/", {
                participant_id: applicant.applicant
            });
            navigate(`/employee/dashboard/messages/chat/${response.data.id}`);
        } catch (error) {
            console.error("Failed to start conversation:", error);
            alert("Failed to start conversation.");
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                Loading...
            </div>
        );
    }

    if (!applicant) {
        return (
            <div className="p-6">
                Applicant not found.
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-6">

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-600"
            >
                <ArrowLeft size={18} />
                Back
            </button>

            <div className="rounded-xl bg-white p-8 shadow">

                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        Applicant Details
                    </h1>
                    <button
                        onClick={handleMessage}
                        className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700 transition"
                    >
                        <MessageCircle size={18} />
                        Message Applicant
                    </button>
                </div>

                <div className="space-y-5">

                    <div className="flex items-center gap-2">
                        <User size={20} />
                        <strong>Name:</strong>
                        {applicant.applicant_name}
                    </div>

                    <div className="flex items-center gap-2">
                        <Mail size={20} />
                        <strong>Email:</strong>
                        {applicant.applicant_email}
                    </div>

                    <div>
                        <strong>Job:</strong>{" "}
                        {applicant.job_title}
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar size={20} />
                        <strong>Applied:</strong>
                        {new Date(
                            applicant.applied_at
                        ).toLocaleString()}
                    </div>

                    <div>
                        <strong>Status:</strong>{" "}
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                            {applicant.status}
                        </span>
                    </div>

                    <div>
                        <strong>Cover Letter</strong>

                        <div className="mt-2 rounded-lg border p-4">
                            {applicant.cover_letter ||
                                "No cover letter submitted."}
                        </div>
                    </div>

                    {applicant.resume && (
                        <div>
                            <a
                                href={`http://127.0.0.1:8000${applicant.resume}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-blue-600 hover:underline"
                            >
                                <FileText size={18} />
                                View Resume
                            </a>
                        </div>
                    )}

                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">

                    <button
                        onClick={() =>
                            changeStatus("reviewing")
                        }
                        className="rounded-lg bg-yellow-500 py-3 text-white"
                    >
                        Reviewing
                    </button>

                    <button
                        onClick={() =>
                            changeStatus("shortlisted")
                        }
                        className="rounded-lg bg-green-600 py-3 text-white"
                    >
                        Shortlist
                    </button>

                    <button
                        onClick={() =>
                            changeStatus("rejected")
                        }
                        className="rounded-lg bg-red-600 py-3 text-white"
                    >
                        Reject
                    </button>

                    <button
                        onClick={() =>
                            changeStatus("hired")
                        }
                        className="rounded-lg bg-blue-600 py-3 text-white"
                    >
                        Hire
                    </button>

                </div>

            </div>

        </div>
    );
}