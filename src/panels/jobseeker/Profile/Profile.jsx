import React, { useEffect, useState } from "react";
import { getProfile, getCertifications, getEducations, getExperiences, getPortfolio } from "../../../lib/jobseekerApi";
import { useAuth } from "../../../context/AuthContext";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  Edit,
  Award,
  GraduationCap,
  Briefcase,
  FolderGit2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [profileRes, certRes, eduRes, expRes, portRes] = await Promise.allSettled([
      getProfile(),
      getCertifications(),
      getEducations(),
      getExperiences(),
      getPortfolio(),
    ]);
    if (profileRes.status === "fulfilled") setProfile(profileRes.value.data);
    if (certRes.status === "fulfilled") setCertifications(certRes.value.data);
    if (eduRes.status === "fulfilled") setEducations(eduRes.value.data);
    if (expRes.status === "fulfilled") setExperiences(expRes.value.data);
    if (portRes.status === "fulfilled") setPortfolios(portRes.value.data);
    setLoading(false);
  };

  // ── Completion calculation ──────────────────────────────────────────────────
  const getCompletionItems = (profile, educations, experiences, portfolios) => [
    {
      key: "photo",
      label: "Profile Picture",
      done: !!profile?.profile_picture,
      link: "/jobseeker/dashboard/profile/edit",
    },
    {
      key: "bio",
      label: "Bio / About",
      done: !!profile?.bio,
      link: "/jobseeker/dashboard/profile/edit",
    },
    {
      key: "phone",
      label: "Phone Number",
      done: !!profile?.phone,
      link: "/jobseeker/dashboard/profile/edit",
    },
    {
      key: "address",
      label: "Address",
      done: !!profile?.address,
      link: "/jobseeker/dashboard/profile/edit",
    },
    {
      key: "skills",
      label: "Skills (at least one)",
      done: (profile?.skills ?? []).length > 0,
      link: "/jobseeker/dashboard/profile/skills",
    },
    {
      key: "education",
      label: "Education",
      done: educations.length > 0,
      link: "/jobseeker/dashboard/profile/education",
    },
    {
      key: "experience",
      label: "Work Experience",
      done: experiences.length > 0,
      link: "/jobseeker/dashboard/profile/experience",
    },
    {
      key: "portfolio",
      label: "Portfolio Project",
      done: portfolios.length > 0,
      link: "/jobseeker/dashboard/profile/portfolio",
    },
    {
      key: "resume",
      label: "Resume Uploaded",
      done: !!profile?.resume,
      link: "/jobseeker/dashboard/profile/resume",
    },
  ];
  // ───────────────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  

  return (
    <div className="space-y-6">

      {/* ================= HERO ================= */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">

        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div className="flex gap-6">

            <img
              src={
                profile?.profile_picture ||
                `https://ui-avatars.com/api/?name=${user?.first_name}+${user?.last_name}&background=06b6d4&color=fff&size=200`
              }
              alt=""
              className="w-32 h-32 rounded-full border-4 border-cyan-100 object-cover"
            />

            <div>

              <h1>
  {profile?.first_name} {profile?.last_name}
</h1>

              <p className="text-cyan-600 font-semibold mt-2">
                Full Stack Developer
              </p>

              <p className="text-gray-500 mt-3 leading-7">
               {profile?.bio || "No bio added yet."}
              </p>

            </div>

          </div>

          <div>

            <Link
              to="/jobseeker/dashboard/profile/edit"
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-xl"
            >
              <Edit size={18} />
              Edit Profile
            </Link>

          </div>

        </div>

      </div>

      {/* ================= CONTACT ================= */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl shadow-md border p-6">

          <h2 className="text-xl font-bold mb-5">
            Contact Information
          </h2>

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <Mail className="text-cyan-600" />

              <span>{profile?.email}</span>

            </div>

            <div className="flex items-center gap-3">

              <Phone className="text-cyan-600" />

              <span>{profile?.phone || "Not provided"}</span>

            </div>

            <div className="flex items-center gap-3">

              <MapPin className="text-cyan-600" />

              <span>{profile?.address || "Not provided"}</span>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-md border p-6">

          <h2 className="text-xl font-bold mb-5">
            Portfolio
          </h2>

          <div className="space-y-4">

            <a
              href={profile?.linkedin || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-cyan-600"
            >
              <Globe size={18} />
              LinkedIn
            </a>

            <a
              href={profile?.github || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-cyan-600"
            >
              <Globe size={18} />
              GitHub
            </a>

            <a
              href={profile?.portfolio || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-cyan-600"
            >
              <Globe size={18} />
              Portfolio Website
            </a>

          </div>

              </div>
                    {/* ================= SKILLS ================= */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {(profile?.skills ?? []).length === 0 ? (
            <p className="text-gray-400 text-sm">No skills added yet.</p>
          ) : (
            (profile?.skills ?? []).map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-cyan-50 text-cyan-700 px-4 py-2 text-sm font-medium border border-cyan-100"
              >
                {typeof skill === "object" ? skill.name : skill}
              </span>
            ))
          )}
        </div>

      </div>


      {/* ================= EDUCATION ================= */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

        <div className="flex items-center gap-3 mb-6">

          <GraduationCap className="text-cyan-600" size={24} />

          <h2 className="text-xl font-bold text-gray-800">
            Education
          </h2>

        </div>

        <div className="space-y-5">
          {educations.length === 0 ? (
            <p className="text-gray-400 text-sm">No education added yet.</p>
          ) : (
            educations.map((edu) => (
              <div key={edu.id} className="border-l-4 border-cyan-500 pl-5 py-1">
                <h3 className="font-semibold text-lg text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <span className="text-sm text-gray-400">
                  {edu.start_year} — {edu.end_year || "Present"}
                </span>
              </div>
            ))
          )}
        </div>

      </div>


      {/* ================= EXPERIENCE ================= */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

        <div className="flex items-center gap-3 mb-6">

          <Briefcase className="text-cyan-600" size={24} />

          <h2 className="text-xl font-bold text-gray-800">
            Experience
          </h2>

        </div>

        <div className="space-y-6">
          {experiences.length === 0 ? (
            <p className="text-gray-400 text-sm">No experience added yet.</p>
          ) : (
            experiences.map((exp) => (
              <div key={exp.id} className="rounded-2xl border border-gray-200 p-5 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-cyan-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-400">{exp.employment_Type} • {exp.location}</p>
                  </div>
                  <span className="text-sm text-gray-400">{exp.start_date} — {exp.end_date || "Present"}</span>
                </div>
                <p className="mt-4 text-gray-600 leading-7">{exp.description}</p>
              </div>
            ))
          )}
        </div>

      </div>

          </div>
      {/* ================= PORTFOLIO PROJECTS ================= */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FolderGit2 className="text-cyan-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Portfolio Projects</h2>
          </div>
          <Link
            to="/jobseeker/dashboard/profile/portfolio"
            className="text-cyan-600 hover:text-cyan-700 font-medium"
          >
            Manage
          </Link>
        </div>

        {portfolios.length === 0 ? (
          <p className="text-gray-400 text-sm">No portfolio projects added yet.</p>
        ) : (
          <div className="space-y-4">
            {portfolios.map((project) => (
              <div key={project.id} className="rounded-2xl border border-gray-200 p-5 hover:shadow-md transition">
                <div className="flex gap-4">
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-16 h-16 rounded-xl object-cover" />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-800">{project.title}</h3>
                    <p className="text-sm text-cyan-600">{project.project_type}</p>
                    <p className="text-sm text-gray-500">{project.technologies}</p>
                    <p className="text-sm text-gray-400">{project.start_date} — {project.end_date || "Present"}</p>
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-cyan-600 mt-2"
                      >
                        Live Demo <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ================= RESUME ================= */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-3">
              <FileText className="text-cyan-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">
                Resume
              </h2>
            </div>

            <Link
              to="/jobseeker/dashboard/profile/resume"
              className="text-cyan-600 hover:text-cyan-700 font-medium"
            >
              Manage
            </Link>

          </div>

          <div className="border rounded-2xl p-5 bg-gray-50">

            <h3 className="font-semibold text-gray-800">
              Resume.pdf
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Last updated: Today
            </p>

            <div className="mt-5">

              <a
                href={profile?.resume || "#"}
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-xl"
              >
                <FileText size={18} />
                View Resume
              </a>

            </div>

          </div>

        </div>


        {/* ================= CERTIFICATIONS ================= */}

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

          <div className="flex items-center gap-3 mb-6">

            <Award className="text-cyan-600" size={24} />

            <h2 className="text-xl font-bold text-gray-800">
              Certifications
            </h2>

          </div>

          <div className="space-y-4">

            {certifications.length === 0 ? (
              <p className="text-gray-400 text-sm">No certifications added yet.</p>
            ) : (
              certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-xl border border-gray-200 px-5 py-4 flex items-center justify-between hover:border-cyan-300 transition"
                >
                  <div>
                    <p className="font-medium text-gray-700">{cert.title}</p>
                    <p className="text-sm text-gray-400">{cert.organization}</p>
                  </div>
                  <Award className="text-yellow-500" />
                </div>
              ))
            )}

          </div>

        </div>

      </div>


      {/* ================= PROFILE COMPLETION ================= */}
      {(() => {
        const items = getCompletionItems(profile, educations, experiences, portfolios);
        const done = items.filter((i) => i.done).length;
        const total = items.length;
        const pct = Math.round((done / total) * 100);
        const incomplete = items.filter((i) => !i.done);
        const barColor =
          pct === 100 ? "bg-emerald-400" : pct >= 66 ? "bg-cyan-300" : pct >= 33 ? "bg-yellow-300" : "bg-red-400";

        return (
          <div className="bg-gradient-to-br from-cyan-600 via-sky-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-8">

              {/* Left — headline */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Profile Completion</h2>
                <p className="mt-1 text-cyan-100 text-sm">
                  Complete your profile to increase visibility to employers.
                </p>

                {/* Progress bar */}
                <div className="mt-5">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-sm text-cyan-100 font-medium">{done} of {total} sections complete</span>
                    <span className="text-3xl font-extrabold">{pct}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className={`${barColor} h-full rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right — checklist */}
              <div className="lg:w-72 bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                <p className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                  {incomplete.length === 0 ? "🎉 All done!" : "Still needed"}
                </p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.key} className="flex items-center gap-2 text-sm">
                      {item.done ? (
                        <CheckCircle2 size={16} className="text-emerald-300 shrink-0" />
                      ) : (
                        <AlertCircle size={16} className="text-yellow-300 shrink-0" />
                      )}
                      {item.done ? (
                        <span className="text-white/70 line-through">{item.label}</span>
                      ) : (
                        <Link
                          to={item.link}
                          className="text-white hover:text-yellow-200 underline underline-offset-2 transition"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}