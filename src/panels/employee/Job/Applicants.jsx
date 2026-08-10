import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getApplicants } from "../../../lib/employeeJobApi";
import ApplicantsTable from "./ApplicantsTable";

import { ArrowLeft } from "lucide-react";

export default function Applicants() {
    const { id: jobId } = useParams();
    const navigate = useNavigate();

    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (jobId) {
            loadApplicants();
        }
    }, [jobId]);

    const loadApplicants = async () => {
    try {
        console.log("Job ID:", jobId);

        const data = await getApplicants(jobId);

        console.log("Applicants response:", data);

        if (Array.isArray(data)) {
            setApplicants(data);
        } else {
            setApplicants([]);
        }

    } catch (error) {
        console.error(
            "Applicants error:",
            error.response?.data || error
        );
    } finally {
        console.log("Finished loading");
        setLoading(false);
    }
};


    if (loading) {
        return (
            <div className="p-6">
                <h2 className="text-lg font-semibold">
                    Loading applicants...
                </h2>
            </div>
        );
    }


    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">

                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                >
                    <ArrowLeft size={20} />
                </button>


                <div>
                    <h1 className="text-2xl font-bold">
                        Applicants
                    </h1>

                    <p className="text-gray-500">
                        Applicants for this job
                    </p>
                </div>

            </div>


            {applicants.length === 0 ? (

                <div className="bg-white rounded-xl shadow p-10 text-center">

                    <h2 className="text-xl font-semibold">
                        No Applicants Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        No one has applied for this job yet.
                    </p>

                </div>

            ) : (

                <ApplicantsTable
                    applicants={applicants}
                />

            )}

        </div>
    );
}