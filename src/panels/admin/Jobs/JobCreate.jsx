import { useState } from "react";
import { useNavigate } from "react-router-dom";

import JobForm from "../../employee/Job/components/JobForm";
import { validateJobForm } from "../../employee/Job/utils/validation";
import api from "../../../lib/api";

const INITIAL_JOB = {
  // Basic Information
  title: "",
  mainCategory: "",
  subCategory: "",
  employmentType: "",
  jobLevel: "",
  openings: "",
  workplace: "",
  department: "",
  jobCode: "",

  // Description
  shortDescription: "",
  description: "",
  responsibilities: "",
  qualifications: "",
  whyJoinUs: "",

  // Requirements
  experience: "",
  education: "",
  skills: [],
  languages: [],
  license: "",
  vehicle: "",
  gender: "",
  minAge: "",
  maxAge: "",

  // Salary
  currency: "NPR",
  salaryType: "Monthly",
  salaryMin: "",
  salaryMax: "",
  negotiable: false,
  hideSalary: false,

  // Location
  province: "",
  district: "",
  municipality: "",
  address: "",
  workMode: "Onsite",
  mapLink: "",
  travelRequired: false,

  // Benefits
  benefits: [],
  otherBenefits: "",

  // Application
  applicationDeadline: "",
  joiningDate: "",
  contactEmail: "",
  contactPhone: "",
  requiredDocuments: [],
  acceptUntilFilled: false,
  sendConfirmationEmail: true,
  allowQuickApply: true,
};

export default function JobCreate() {
  const navigate = useNavigate();

  const [job, setJob] = useState(INITIAL_JOB);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const updateJob = (patch) => {
    setJob((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  // Publish Job
  const handlePublish = async () => {
    const validationErrors = validateJobForm(job);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Validation failed. Check the console.");
      return;
    }

    try {
      setLoading(true);

      // We hit the admin panel jobs endpoint
      const response = await api.post("/admin/jobs/", job);

      alert("Job created successfully and published directly.");

      navigate("/admin/dashboard/jobs/approved"); // Or wherever the approved jobs list is
    } catch (err) {
      console.error(err);
      alert("Failed to publish job.");
    } finally {
      setLoading(false);
    }
  };

  // Save Draft (Admins usually just publish, but let's keep it functional)
  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      await api.post("/admin/jobs/", {
        ...job,
        status: "draft",
      });
      alert("Draft saved successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to save draft.");
    } finally {
      setLoading(false);
    }
  };

  // Preview
  const handlePreview = () => {
    const validationErrors = validateJobForm(job);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Validation failed. Check the console.");
      return;
    }
    navigate("/admin/dashboard/jobs/preview", { state: { job } });
  };

  const handleSchedule = () => {
    console.log("Schedule Job");
  };

  const handleCancel = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Create New Job (Admin)
        </h1>

        <p className="mt-2 text-slate-500">
          Fill in the details below to publish a new job posting directly.
        </p>
      </div>

      <JobForm
        data={job}
        errors={errors}
        loading={loading}
        onChange={updateJob}
        onPublish={handlePublish}
        onSaveDraft={handleSaveDraft}
        onPreview={handlePreview}
        onSchedule={handleSchedule}
        onCancel={handleCancel}
      />
    </div>
  );
}
