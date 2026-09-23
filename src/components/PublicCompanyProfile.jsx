import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Phone,
  Mail,
  ArrowLeft,
  Briefcase,
  Clock3
} from "lucide-react";

export default function CompanyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/jobseeker/employer/public/${id}/`);
        setProfile(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch company profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent"></div>
          <p className="text-gray-500">Loading company profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <div className="rounded-full bg-red-100 p-4 text-red-600 mb-4">
          <Building2 size={32} />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Profile Not Found</h2>
        <p className="mb-6 text-gray-600">{error || "This company profile does not exist or is unavailable."}</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-4xl space-y-6 pb-12 w-full mt-8 px-4 flex-1">
        {/* Header section */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Cover image (dummy gradient) */}
          <div className="h-32 w-full bg-gradient-to-r from-cyan-600 to-blue-800 md:h-48">
            <button
              onClick={() => navigate(-1)}
              className="m-4 flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/30"
            >
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          <div className="relative px-6 pb-6 pt-0 sm:px-8 sm:pb-8">
            {/* Logo */}
            <div className="-mt-12 mb-4 flex sm:-mt-16 sm:mb-6">
              <div className="rounded-2xl border-4 border-white bg-white shadow-md">
                <img
                  src={profile.profile_picture || "https://via.placeholder.com/150"}
                  alt={profile.company_name}
                  className="h-24 w-24 rounded-xl object-contain bg-white sm:h-32 sm:w-32"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                  {profile.company_name || "Company Name"}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  {profile.industry && (
                    <span className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {profile.industry}
                    </span>
                  )}
                  {profile.address && (
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {profile.address}
                    </span>
                  )}
                  {profile.company_size && (
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {profile.company_size}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {/* Main content */}
          <div className="md:col-span-3 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-4 text-xl font-bold text-slate-800">About the Company</h2>
              {profile.intro ? (
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {profile.intro}
                </div>
              ) : (
                <p className="text-slate-500 italic">No introduction provided.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-slate-800">Contact Info</h3>
              <div className="space-y-4">
                {profile.email && (
                  <div className="flex items-start gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <Mail size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</p>
                      <p className="text-sm font-medium text-slate-800 break-words">{profile.email}</p>
                    </div>
                  </div>
                )}
                {profile.website && (
                  <div className="flex items-start gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <Globe size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Website</p>
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-cyan-600 hover:underline break-words">
                        {profile.website}
                      </a>
                    </div>
                  </div>
                )}
                {profile.contact_person && (
                  <div className="flex items-start gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <Building2 size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Contact Person</p>
                      <p className="text-sm font-medium text-slate-800 break-words">{profile.contact_person}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      {/* Open Positions */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 mt-6">
        <h2 className="mb-4 text-xl font-bold text-slate-800">Open Positions</h2>
        {profile.jobs && profile.jobs.length > 0 ? (
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
            {profile.jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="bg-white rounded-xl border border-slate-200 p-5 cursor-pointer hover:shadow-md hover:border-blue-200 transition group"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={profile.profile_picture || "/logo.png"}
                    alt={profile.company_name}
                    className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-100 shrink-0"
                    onError={(e) => { e.target.src = "/logo.png"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition truncate">
                      {job.title}
                    </h2>
                    <p className="text-sm text-slate-500 truncate">
                      {profile.company_name || "Company"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {[job.district, job.municipality].filter(Boolean).join(", ") || "Nepal"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={12} />
                    {job.employmentType || "Full-time"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock3 size={12} />
                    {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-700">
                    {job.hideSalary
                      ? "Negotiable"
                      : `${job.currency || "Rs."} ${job.salaryMin ?? ""} - ${job.salaryMax ?? ""}`}
                  </span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                    View Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 italic">No open positions available.</p>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
}
