import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobDetail } from "../../../lib/employeeJobApi";

export default function JobDetail() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const data = await getJobDetail(id);
      console.log("Job Details:", data);
      setJob(data);
    } catch (error) {
      console.error("Failed to load job:", error);
    }
  };

  if (!job) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow">

        <h1 className="text-3xl font-bold text-slate-800">
          {job.title}
        </h1>

        <p className="mt-3 text-slate-600">
          {job.description}
        </p>

        <div className="mt-4 flex gap-3">
          <span className="rounded-full bg-gray-100 px-3 py-1">
            Status: {job.status}
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1">
            Experience: {job.experience}
          </span>
        </div>

      </div>


      {/* Basic Information */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold">
          Basic Information
        </h2>

        <p>
          Category: {job.mainCategory || "-"}
        </p>

        <p>
          Sub Category: {job.subCategory || "-"}
        </p>

        <p>
          Employment Type: {job.employmentType || "-"}
        </p>

        <p>
          Job Level: {job.jobLevel || "-"}
        </p>

        <p>
          Openings: {job.openings || "-"}
        </p>

      </div>


      {/* Requirements */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold">
          Requirements
        </h2>

        <p>
          Education: {job.education || "-"}
        </p>

        <p>
          Skills:
          {job.skills?.length
            ? job.skills.join(", ")
            : "-"
          }
        </p>

        <p>
          Experience:
          {job.experience || "-"}
        </p>

      </div>


      {/* Salary */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold">
          Salary
        </h2>

        <p>
          Salary Range: {job.salaryRange || "-"}
        </p>

        <p>
          Currency: {job.currency || "-"}
        </p>

        <p>
          Salary Period: {job.salaryPeriod || "-"}
        </p>

      </div>


      {/* Location */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold">
          Location
        </h2>

        <p>
          Workplace: {job.workplace || "-"}
        </p>

        <p>
          District: {job.district || "-"}
        </p>

        <p>
          Municipality: {job.municipality || "-"}
        </p>

        <p>
          Location: {job.specificLocation || "-"}
        </p>

      </div>


      {/* Benefits */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold">
          Benefits
        </h2>

        <p>
          {job.benefits || "-"}
        </p>

      </div>

    </div>
  );
}