import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Building2,
  MapPin,
  Wallet,
  Users,
  Briefcase,
  Clock3,
  Calendar,
  Globe,
  Phone,
  Mail,
  FileText,
  GraduationCap,
  Gift,
  Star,
} from "lucide-react";
import {
  approveJob,
  rejectJob,
} from "../../../lib/adminApi";

function Section({ title, children }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">{title}</h3>
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

// Safely convert any value to an array
function toArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try { const parsed = JSON.parse(val); return Array.isArray(parsed) ? parsed : []; }
    catch { return val.split(",").map(s => s.trim()).filter(Boolean); }
  }
  return [];
}

export default function JobReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [job, setJob] = useState(state?.job || null);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl bg-white p-10 shadow">
          <h2 className="text-xl font-bold">Job not found</h2>
          <button onClick={() => navigate(-1)} className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-white">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleApprove = async () => {
    try {
      await approveJob(job.id);
      alert("Job approved successfully.");
      navigate("/admin/dashboard/jobs");
    } catch (error) {
      console.error(error);
      alert("Failed to approve job.");
    }
  };

  const handleReject = async () => {
    const reason = prompt("Enter rejection reason");
    if (!reason) return;
    try {
      await rejectJob(job.id, reason);
      alert("Job rejected successfully.");
      navigate("/admin/dashboard/jobs");
    } catch (error) {
      console.error(error);
      alert("Failed to reject job.");
    }
  };

  const salary = job.hideSalary
    ? "Negotiable"
    : job.salaryMin
    ? `${job.currency || ""} ${job.salaryMin} – ${job.salaryMax || ""}`.trim()
    : job.salary || "Not specified";

  const location = [job.municipality, job.district, job.province].filter(Boolean).join(", ") || job.location || "-";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="rounded-lg border bg-white p-3 hover:bg-gray-50">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Review Job Post</h1>
            <p className="text-gray-500">Verify all job details before approval.</p>
          </div>
        </div>

        {/* Title Card */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <div className="flex items-start gap-3">
                <Building2 className="text-blue-600 mt-1" size={24} />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{job.title}</h2>
                  <p className="mt-1 text-gray-500 font-medium">{job.company || job.employee_name}</p>
                  <p className="text-sm text-gray-400">{job.employee_email}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.jobLevel && <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{job.jobLevel}</span>}
                {job.employmentType && <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">{job.employmentType}</span>}
                {job.mainCategory && <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">{job.mainCategory}</span>}
                {job.subCategory && <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">{job.subCategory}</span>}
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${job.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : job.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {job.status?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <MapPin className="mx-auto mb-1 text-red-500" size={20} />
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-semibold text-sm">{location}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <Wallet className="mx-auto mb-1 text-green-600" size={20} />
              <p className="text-xs text-gray-500">Salary</p>
              <p className="font-semibold text-sm">{salary}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <Users className="mx-auto mb-1 text-purple-600" size={20} />
              <p className="text-xs text-gray-500">Openings</p>
              <p className="font-semibold text-sm">{job.openings || "-"}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <Calendar className="mx-auto mb-1 text-orange-500" size={20} />
              <p className="text-xs text-gray-500">Deadline</p>
              <p className="font-semibold text-sm">{job.applicationDeadline || "Until Filled"}</p>
            </div>
          </div>

          {/* Details */}
          {job.shortDescription && (
            <Section title="Short Description">
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

          <Section title="Requirements">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <InfoBadge icon={GraduationCap} label="Education" value={job.education} />
              <InfoBadge icon={Clock3} label="Experience" value={job.experience} />
              <InfoBadge icon={Globe} label="Work Mode" value={job.workMode} />
              <InfoBadge icon={Users} label="Gender" value={job.gender} />
              <InfoBadge icon={Users} label="Age" value={job.minAge && job.maxAge ? `${job.minAge} – ${job.maxAge} yrs` : null} />
              <InfoBadge icon={FileText} label="License" value={job.license} />
              <InfoBadge icon={Briefcase} label="Vehicle" value={job.vehicle} />
              <InfoBadge icon={Briefcase} label="Workplace" value={job.workplace} />
              <InfoBadge icon={Briefcase} label="Department" value={job.department} />
            </div>
          </Section>

          {toArray(job.skills).length > 0 && (
            <Section title="Required Skills">
              <div className="flex flex-wrap gap-2">
                {toArray(job.skills).map((skill, i) => (
                  <span key={i} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 font-medium">{skill}</span>
                ))}
              </div>
            </Section>
          )}

          {toArray(job.languages).length > 0 && (
            <Section title="Languages">
              <div className="flex flex-wrap gap-2">
                {toArray(job.languages).map((lang, i) => (
                  <span key={i} className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700 font-medium">{lang}</span>
                ))}
              </div>
            </Section>
          )}

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

          {job.whyJoinUs && (
            <Section title="Why Join Us">
              <p className="whitespace-pre-line text-gray-700">{job.whyJoinUs}</p>
            </Section>
          )}

          <Section title="Application & Contact Info">
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

          {/* Actions */}
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            {job.status !== "approved" && (
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 font-semibold"
              >
                <CheckCircle size={20} />
                Approve Job
              </button>
            )}
            {job.status !== "rejected" && (
              <button
                onClick={handleReject}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 font-semibold"
              >
                <XCircle size={20} />
                Reject Job
              </button>
            )}
            {job.status === "approved" && (
              <span className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-6 py-3 text-green-700 font-semibold">
                <CheckCircle size={20} />
                This job is currently Approved
              </span>
            )}
            {job.status === "rejected" && (
              <span className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-6 py-3 text-red-700 font-semibold">
                <XCircle size={20} />
                This job was Rejected
              </span>
            )}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-lg border px-6 py-3 text-gray-700 hover:bg-gray-50 font-semibold"
            >
              Back to List
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}