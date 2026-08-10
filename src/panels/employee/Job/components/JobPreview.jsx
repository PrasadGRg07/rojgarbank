import {
  ArrowLeft,
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  Wallet,
  Users,
  Clock,
  GraduationCap,
  BadgeCheck,
  Eye,
  Pencil,
} from "lucide-react";
import { submitJobForReview } from "../../../../lib/employeeJobApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function JobPreview() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const job = state?.job;

  if (!job) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-xl border bg-white p-10 shadow">
          <h2 className="text-2xl font-bold text-slate-700">
            No Preview Available
          </h2>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
const handleSubmitReview = async () => {
  try {
      await submitJobForReview(job.id);
      console.log("Job received:", job);
      console.log("Job ID:", job.id);

    alert("Job submitted for admin review successfully.");

    navigate("/employee/dashboard/jobs");
  } catch (error) {
    console.error(error);

    alert("Failed to submit the job for review.");
  }
};
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

           <button
  onClick={() =>
    navigate("/employee/dashboard/jobs/edit", {
      state: { job }
    })
  }
  className="flex items-center gap-2 rounded-lg border px-5 py-3"
>
  <Pencil size={18} />
  Edit
</button>

            <div>

              <h1 className="text-3xl font-bold">
                Job Preview
              </h1>

              <p className="text-slate-500">
                This is how applicants will view your job.
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-lg border px-5 py-3"
            >
              <Pencil size={18} />

              Edit
            </button>

            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white">

              <Eye size={18} />

              Publish

            </button>

          </div>

        </div>

      </div>

      {/* Hero */}

      <div className="mx-auto mt-8 max-w-7xl px-6">

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <div className="flex flex-col justify-between gap-6 lg:flex-row">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <Building2 className="text-blue-600" />

                <span className="font-semibold text-blue-600">
                  Your Company Name
                </span>

              </div>

              <h2 className="text-4xl font-bold text-slate-800">

                {job.title || "Job Title"}

              </h2>

              <p className="mt-4 max-w-3xl text-slate-600">

                {job.shortDescription ||
                  "Short description will appear here."}

              </p>

            </div>

            <div className="rounded-xl border bg-slate-50 p-6">

              <div className="text-sm text-slate-500">
                Job Status
              </div>

              <div className="mt-2 inline-flex rounded-full bg-yellow-100 px-4 py-2 font-medium text-yellow-700">

                Preview

              </div>

            </div>

          </div>

        </div>        {/* Overview */}

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl bg-white p-5 shadow-sm">

            <Briefcase className="mb-3 text-blue-600" />

            <p className="text-sm text-slate-500">
              Employment Type
            </p>

            <h3 className="mt-2 font-semibold">
              {job.employmentType || "-"}
            </h3>

          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">

            <MapPin className="mb-3 text-red-500" />

            <p className="text-sm text-slate-500">
              Location
            </p>

            <h3 className="mt-2 font-semibold">

              {job.district}, {job.province}

            </h3>

          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">

            <Wallet className="mb-3 text-green-600" />

            <p className="text-sm text-slate-500">
              Salary
            </p>

            <h3 className="mt-2 font-semibold">

              {job.hideSalary
                ? "Negotiable"
                : `${job.currency} ${job.salaryMin} - ${job.salaryMax}`}

            </h3>

          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">

            <Users className="mb-3 text-purple-600" />

            <p className="text-sm text-slate-500">
              Vacancies
            </p>

            <h3 className="mt-2 font-semibold">

              {job.openings}

            </h3>

          </div>

        </div>        {/* Job Description */}

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">

            Job Description

          </h2>

          <p className="leading-8 text-slate-600 whitespace-pre-line">

            {job.description || "No description provided."}

          </p>

        </div>      {/* Main Content */}

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Left Side */}

        <div className="space-y-8 lg:col-span-2">

          {/* Responsibilities */}

          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
              <BadgeCheck className="text-blue-600" />
              Responsibilities
            </h2>

            <p className="whitespace-pre-line leading-8 text-slate-600">
              {job.responsibilities || "No responsibilities provided."}
            </p>

          </div>

          {/* Qualifications */}

          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
              <GraduationCap className="text-green-600" />
              Qualifications
            </h2>

            <p className="whitespace-pre-line leading-8 text-slate-600">
              {job.qualifications || "No qualifications provided."}
            </p>

          </div>

          {/* Skills */}

          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold">
              Required Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {job.skills?.length ? (
                job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-slate-500">
                  No skills added.
                </p>
              )}

            </div>

          </div>

          {/* Benefits */}

          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold">
              Benefits & Perks
            </h2>

            <div className="flex flex-wrap gap-3">

              {job.benefits?.length ? (
                job.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700"
                  >
                    {benefit}
                  </span>
                ))
              ) : (
                <p className="text-slate-500">
                  No benefits added.
                </p>
              )}

            </div>

            {job.otherBenefits && (
              <div className="mt-6 rounded-xl bg-slate-50 p-4">
                <p className="whitespace-pre-line text-slate-600">
                  {job.otherBenefits}
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Sidebar */}

        <div className="space-y-6">

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-bold">
              Job Overview
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-sm text-slate-500">
                  Experience
                </p>

                <p className="font-semibold">
                  {job.experience || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Education
                </p>

                <p className="font-semibold">
                  {job.education || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Job Level
                </p>

                <p className="font-semibold">
                  {job.jobLevel || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Workplace
                </p>

                <p className="font-semibold">
                  {job.workMode || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Openings
                </p>

                <p className="font-semibold">
                  {job.openings || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Application Deadline
                </p>

                <p className="font-semibold">
                  {job.applicationDeadline || "-"}
                </p>
              </div>

            </div>

          </div>

          {/* Contact */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-bold">
              Contact Information
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="font-semibold">
                  {job.contactEmail || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Phone
                </p>

                <p className="font-semibold">
                  {job.contactPhone || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Address
                </p>

                <p className="font-semibold">
                  {job.address || "-"}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>        {/* Bottom Actions */}

        <div className="mt-10 mb-10 rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <h2 className="text-xl font-bold">
                Ready to publish this job?
              </h2>

              <p className="mt-1 text-slate-500">
                Review all information before making this job visible to applicants.
              </p>

            </div>


            <div className="flex flex-wrap gap-3">


              {/* Back */}

              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 rounded-lg border px-5 py-3 hover:bg-slate-100"
              >

                <ArrowLeft size={18} />

                Back

              </button>


              {/* Edit */}

              <button
                onClick={() =>
                  navigate("/employee/dashboard/jobs/edit", {
                    state: { job }
                  })
                }
                className="flex items-center gap-2 rounded-lg border border-blue-600 px-5 py-3 text-blue-600 hover:bg-blue-50"
              >

                <Pencil size={18} />

                Edit Job

              </button>


              {/* Save Draft */}

              <button

                className="rounded-lg border px-5 py-3 hover:bg-slate-100"

              >

                Save Draft

              </button>



              {/* Publish */}

             <button
  onClick={handleSubmitReview}
  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
>
  <Eye size={18}/>
  Submit For Review
</button>


            </div>

          </div>


        </div>



      </div>


    </div>

  );
}