import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    MapPin,
    Briefcase,
    Clock3,
    Wallet,
    Building2,
    Calendar,
    Users,
    Globe,
    Phone,
    Mail,
    CheckCircle,
    FileText,
    GraduationCap,
    Gift,
} from "lucide-react";

import { getPublicJobDetails } from "../lib/jobseekerApi";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
            <Icon size={16} className="text-cyan-500 shrink-0" />
            <span className="text-sm font-medium text-gray-500">{label}:</span>
            <span className="text-sm font-semibold">{value}</span>
        </div>
    );
}

export default function PublicJobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await getPublicJobDetails(id);
                setJob(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex flex-1 items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-600"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!job) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex flex-1 items-center justify-center">
                    Job not found.
                </div>
                <Footer />
            </div>
        );
    }

    const company = job.company || job.employee_name || "Company";
    const location = job.district ? `${job.district}, Nepal` : "Nepal";

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="mx-auto max-w-5xl space-y-4 p-4 sm:p-6 lg:p-8 flex-1 w-full my-8">

                {/* Header Card */}
                <div className="rounded-xl bg-white p-8 shadow">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                            <div className="mt-3 flex flex-wrap gap-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Building2 size={16} className="text-cyan-500" />
                                    <span className="font-medium">{company}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-red-500" />
                                    <span>{location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase size={16} className="text-green-500" />
                                    <span>{job.employmentType || "Full Time"}</span>
                                </div>
                                {job.workMode && (
                                    <div className="flex items-center gap-2">
                                        <Globe size={16} className="text-purple-500" />
                                        <span>{job.workMode}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {job.jobLevel && <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700">{job.jobLevel}</span>}
                                {job.mainCategory && <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">{job.mainCategory}</span>}
                            </div>
                        </div>
                        <button
                            onClick={() => navigate("/jobseeker/login")}
                            className="w-full sm:w-auto rounded-xl bg-cyan-600 px-8 py-3 text-white hover:bg-cyan-700 font-semibold transition whitespace-nowrap shadow-lg shadow-cyan-200"
                        >
                            Login to Apply
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
                                ? `NPR ${Number(job.salaryMin).toLocaleString()} – ${Number(job.salaryMax || job.salaryMin).toLocaleString()}`
                                : "Negotiable"}
                        </p>
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow text-center">
                        <Clock3 className="mx-auto mb-2 text-orange-500" size={22} />
                        <p className="text-xs text-gray-500 mb-1">Experience</p>
                        <p className="font-bold text-sm">{job.experience || "Any"}</p>
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow text-center">
                        <Users className="mx-auto mb-2 text-purple-600" size={22} />
                        <p className="text-xs text-gray-500 mb-1">Openings</p>
                        <p className="font-bold text-sm">{job.openings || "1"}</p>
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
                            <p className="text-gray-600 leading-relaxed">{job.shortDescription}</p>
                        </Section>
                    )}

                    {job.description && (
                        <Section title="Job Description">
                            <p className="whitespace-pre-line text-gray-700 leading-relaxed">{job.description}</p>
                        </Section>
                    )}

                    {job.responsibilities && (
                        <Section title="Responsibilities">
                            <p className="whitespace-pre-line text-gray-700 leading-relaxed">{job.responsibilities}</p>
                        </Section>
                    )}

                    {job.qualifications && (
                        <Section title="Qualifications">
                            <p className="whitespace-pre-line text-gray-700 leading-relaxed">{job.qualifications}</p>
                        </Section>
                    )}

                    {/* Requirements */}
                    <Section title="Requirements">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                                    <span key={index} className="rounded-full bg-cyan-50 border border-cyan-200 px-3 py-1 text-sm text-cyan-700 font-medium">{skill}</span>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Benefits */}
                    {(toArray(job.benefits).length > 0 || job.otherBenefits) && (
                        <Section title="Benefits">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {toArray(job.benefits).map((b, i) => (
                                    <span key={i} className="flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-sm text-green-700 font-medium">
                                        <Gift size={14} /> {b}
                                    </span>
                                ))}
                            </div>
                            {job.otherBenefits && <p className="text-gray-600 text-sm mt-2">{job.otherBenefits}</p>}
                        </Section>
                    )}

                    {/* Why Join Us */}
                    {job.whyJoinUs && (
                        <Section title="Why Join Us">
                            <p className="whitespace-pre-line text-gray-700 leading-relaxed">{job.whyJoinUs}</p>
                        </Section>
                    )}
                </div>

                {/* Apply Bottom CTA */}
                <div className="rounded-xl bg-white p-8 shadow flex flex-col items-center justify-center text-center">
                    <h2 className="text-2xl font-bold mb-2">Ready to Apply?</h2>
                    <p className="text-gray-500 mb-6">Create a jobseeker account to apply for this and many other opportunities.</p>
                    <button
                        onClick={() => navigate("/jobseeker/login")}
                        className="w-full sm:w-auto rounded-xl bg-cyan-600 px-10 py-3.5 text-lg text-white hover:bg-cyan-700 font-bold transition shadow-xl shadow-cyan-200"
                    >
                        Login as Jobseeker to Apply
                    </button>
                </div>

            </div>
            
            <Footer />
        </div>
    );
}
