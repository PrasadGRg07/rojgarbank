import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    MapPin,
    Briefcase,
    Clock3,
    Wallet,
    Building2,
    MessageCircle,
    Calendar,
    Users,
    Globe,
    Phone,
    Mail,
    CheckCircle,
    FileText,
    GraduationCap,
    Star,
    Gift,
} from "lucide-react";

import api from "../../../lib/api";
import { getJob, applyJob, getMyApplications } from "../../../lib/jobseekerApi";

function toArray(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
        try { const parsed = JSON.parse(val); return Array.isArray(parsed) ? parsed : []; }
        catch { return val.split(",").map(s => s.trim()).filter(Boolean); }
    }
    return [];
}

function Section({ title, children }) {
    return (
        <div className="mt-8">
            <h2 className="mb-3 text-xl font-bold text-gray-800 border-b pb-2">{title}</h2>
            {children}
        </div>
    );
}

function InfoBadge({ icon: Icon, label, value }) {
    if (!value) return null;
    return (
        <div className="flex items-center gap-2 text-gray-600">
            <Icon size={16} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium text-gray-500">{label}:</span>
            <span className="text-sm font-semibold">{value}</span>
        </div>
    );
}

export default function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [coverLetter, setCoverLetter] = useState("");
    const [resume, setResume] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [alreadyApplied, setAlreadyApplied] = useState(false);

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJob();
        checkIfApplied();
    }, [id]);

    const checkIfApplied = async () => {
        try {
            const applications = await getMyApplications();
            const applied = applications.some(app => app.job === parseInt(id));
            setAlreadyApplied(applied);
        } catch (e) {
            // silently ignore
        }
    };

    const fetchJob = async () => {
        try {
            const data = await getJob(id);
            setJob(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="flex h-96 items-center justify-center">
                Job not found.
            </div>
        );
    }

    const handleApply = async () => {
        try {
            setSubmitting(true);
            const formData = new FormData();
            formData.append("cover_letter", coverLetter);
            if (resume) {
                formData.append("resume", resume);
            }
            const result = await applyJob(job.id, formData);
            if (result && result.already_applied) {
                setAlreadyApplied(true);
            } else {
                setAlreadyApplied(true);
                alert("Application submitted successfully!");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.detail || "Failed to apply.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleMessage = async () => {
        try {
            if (!job.employer_id) {
                alert("Employer information is not available.");
                return;
            }
            const response = await api.post("/messaging/conversations/start/", {
                participant_id: job.employer_id
            });
            navigate(`/jobseeker/dashboard/messages/chat/${response.data.id}`);
        } catch (error) {
            console.error("Failed to start conversation:", error);
            alert("Failed to start conversation.");
        }
    };

    return (
        <div className="mx-auto max-w-5xl space-y-4 p-4 sm:p-6 lg:p-8">

            {/* Header Card */}
            <div className="rounded-xl bg-white p-8 shadow">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                        <div className="mt-3 flex flex-wrap gap-4 text-gray-600">
                            <div className="flex items-center gap-2">
                                <Building2 size={16} className="text-blue-500" />
                                <span className="font-medium">{job.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-red-500" />
                                <span>{[job.municipality, job.district, job.province].filter(Boolean).join(", ")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Briefcase size={16} className="text-green-500" />
                                <span>{job.employmentType}</span>
                            </div>
                            {job.workMode && (
                                <div className="flex items-center gap-2">
                                    <Globe size={16} className="text-purple-500" />
                                    <span>{job.workMode}</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {job.jobLevel && <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{job.jobLevel}</span>}
                            {job.mainCategory && <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">{job.mainCategory}</span>}
                            {job.department && <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">{job.department}</span>}
                        </div>
                    </div>
                    <button
                        onClick={handleMessage}
                        className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 rounded-lg border-2 border-cyan-600 px-4 py-2 text-cyan-600 hover:bg-cyan-50 transition font-semibold whitespace-nowrap"
                    >
                        <MessageCircle size={18} />
                        Message Employer
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-white p-5 shadow text-center">
                    <Wallet className="mx-auto mb-2 text-green-600" size={22} />
                    <p className="text-xs text-gray-500 mb-1">Salary</p>
                    <p className="font-bold text-sm">
                        {job.hideSalary
                            ? "Negotiable"
                            : job.salaryMin
                            ? `${job.currency || ""} ${job.salaryMin} – ${job.salaryMax || ""}`
                            : "-"}
                    </p>
                </div>
                <div className="rounded-xl bg-white p-5 shadow text-center">
                    <Clock3 className="mx-auto mb-2 text-orange-500" size={22} />
                    <p className="text-xs text-gray-500 mb-1">Experience</p>
                    <p className="font-bold text-sm">{job.experience || "-"}</p>
                </div>
                <div className="rounded-xl bg-white p-5 shadow text-center">
                    <Users className="mx-auto mb-2 text-purple-600" size={22} />
                    <p className="text-xs text-gray-500 mb-1">Openings</p>
                    <p className="font-bold text-sm">{job.openings || "-"}</p>
                </div>
                <div className="rounded-xl bg-white p-5 shadow text-center">
                    <Calendar className="mx-auto mb-2 text-red-500" size={22} />
                    <p className="text-xs text-gray-500 mb-1">Deadline</p>
                    <p className="font-bold text-sm">{job.applicationDeadline || "Until Filled"}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="rounded-xl bg-white p-8 shadow">

                {job.shortDescription && (
                    <Section title="About the Role">
                        <p className="text-gray-600">{job.shortDescription}</p>
                    </Section>
                )}

                {job.description && (
                    <Section title="Job Description">
                        <p className="whitespace-pre-line text-gray-700">{job.description}</p>
                    </Section>
                )}

                {job.responsibilities && (
                    <Section title="Responsibilities">
                        <p className="whitespace-pre-line text-gray-700">{job.responsibilities}</p>
                    </Section>
                )}

                {job.qualifications && (
                    <Section title="Qualifications">
                        <p className="whitespace-pre-line text-gray-700">{job.qualifications}</p>
                    </Section>
                )}

                {/* Requirements */}
                <Section title="Requirements">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <InfoBadge icon={GraduationCap} label="Education" value={job.education} />
                        <InfoBadge icon={Clock3} label="Experience" value={job.experience} />
                        <InfoBadge icon={Users} label="Gender" value={job.gender} />
                        <InfoBadge icon={Users} label="Age" value={job.minAge && job.maxAge ? `${job.minAge} – ${job.maxAge} yrs` : null} />
                        <InfoBadge icon={FileText} label="License" value={job.license} />
                        <InfoBadge icon={Briefcase} label="Vehicle" value={job.vehicle} />
                    </div>
                </Section>

                {/* Skills */}
                {toArray(job.skills).length > 0 && (
                    <Section title="Required Skills">
                        <div className="flex flex-wrap gap-2">
                            {toArray(job.skills).map((skill, index) => (
                                <span key={index} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 font-medium">{skill}</span>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Languages */}
                {toArray(job.languages).length > 0 && (
                    <Section title="Languages">
                        <div className="flex flex-wrap gap-2">
                            {toArray(job.languages).map((lang, index) => (
                                <span key={index} className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700 font-medium">{lang}</span>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Benefits */}
                {(toArray(job.benefits).length > 0 || job.otherBenefits) && (
                    <Section title="Benefits">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {toArray(job.benefits).map((b, i) => (
                                <span key={i} className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700 font-medium">
                                    <Gift size={14} /> {b}
                                </span>
                            ))}
                        </div>
                        {job.otherBenefits && <p className="text-gray-600 text-sm">{job.otherBenefits}</p>}
                    </Section>
                )}

                {/* Why Join Us */}
                {job.whyJoinUs && (
                    <Section title="Why Join Us">
                        <p className="whitespace-pre-line text-gray-700">{job.whyJoinUs}</p>
                    </Section>
                )}

                {/* Contact & Application Info */}
                <Section title="Application Info">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {job.joiningDate && (
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-blue-500" />
                                <span className="text-sm text-gray-500">Joining Date:</span>
                                <span className="text-sm font-semibold">{job.joiningDate}</span>
                            </div>
                        )}
                        {job.contactEmail && (
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-blue-500" />
                                <a href={`mailto:${job.contactEmail}`} className="text-sm text-blue-600 hover:underline">{job.contactEmail}</a>
                            </div>
                        )}
                        {job.contactPhone && (
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-blue-500" />
                                <a href={`tel:${job.contactPhone}`} className="text-sm text-blue-600 hover:underline">{job.contactPhone}</a>
                            </div>
                        )}
                        {toArray(job.requiredDocuments).length > 0 && (
                            <div className="col-span-full">
                                <p className="text-sm text-gray-500 mb-1">Required Documents:</p>
                                <div className="flex flex-wrap gap-2">
                                    {toArray(job.requiredDocuments).map((doc, i) => (
                                        <span key={i} className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs">
                                            <CheckCircle size={12} className="text-green-500" /> {doc}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Section>
            </div>

            {/* Apply Section */}
            <div className="rounded-xl bg-white p-8 shadow">
                <h2 className="mb-5 text-xl font-bold">Apply for this Job</h2>

                {alreadyApplied ? (
                    <div className="flex items-center gap-3 rounded-xl border-2 border-green-200 bg-green-50 px-6 py-5">
                        <CheckCircle className="text-green-600" size={24} />
                        <div>
                            <p className="font-semibold text-green-800">Already Applied</p>
                            <p className="text-sm text-green-600">You have already submitted an application for this job.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <textarea
                            rows={6}
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Write your cover letter..."
                            className="mb-5 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />

                        <label className="mb-2 block text-sm font-medium text-gray-700">Upload Resume (PDF / DOC)</label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setResume(e.target.files[0])}
                            className="mb-5 block"
                        />

                        <div className="flex gap-3 flex-wrap">
                            <button
                                onClick={handleApply}
                                disabled={submitting}
                                className="rounded-lg bg-green-600 px-8 py-3 text-white hover:bg-green-700 disabled:opacity-50 font-semibold"
                            >
                                {submitting ? "Submitting..." : "Apply Now"}
                            </button>
                            <button
                                onClick={() => navigate(-1)}
                                className="rounded-lg border px-8 py-3 text-gray-700 hover:bg-gray-50 font-semibold"
                            >
                                Back
                            </button>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
}