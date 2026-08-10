import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ApplicantsTable({ applicants }) {
    const navigate = useNavigate();

    if (applicants.length === 0) {
        return (
            <div className="bg-white rounded-xl p-10 text-center">
                No applicants found.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left">Applicant</th>
                        <th className="p-4 text-left">Job</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Applied</th>
                        <th className="p-4 text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {applicants.map((applicant) => (
                        <tr key={applicant.id} className="border-t">
                            <td className="p-4">
                                <div className="font-medium">
                                    {applicant.applicant_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {applicant.applicant_email}
                                </div>
                            </td>

                            <td className="p-4">
                                {applicant.job_title}
                            </td>

                            <td className="p-4">
                                {applicant.status}
                            </td>

                            <td className="p-4">
                                {new Date(
                                    applicant.applied_at
                                ).toLocaleDateString()}
                            </td>

                            <td className="p-4 text-center">
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/employee/dashboard/applications/${applicant.id}`
                                        )
                                    }
                                    className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                                >
                                    <Eye size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}