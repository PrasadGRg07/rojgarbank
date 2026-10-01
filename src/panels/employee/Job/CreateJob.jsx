import { useState } from "react";
import { useNavigate } from "react-router-dom";

import JobForm from "./components/JobForm";
import { validateJobForm } from "./utils/validation";
import api from "../../../lib/api";
import { isSubscriptionRequired } from "../../../lib/subscriptionApi";
import { useSubscriptionGateContext } from "../subscription/useSubscriptionGate";

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

export default function CreateJob() {
  const navigate = useNavigate();

  // Subscription gate from the dashboard layout. Lets a successful post raise
  // the upgrade prompt, and a blocked post re-raise it immediately.
  const gate = useSubscriptionGateContext();

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
    console.log("Publish button clicked");

    const validationErrors = validateJobForm(job);
    console.log("Validation Errors:", validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Validation failed. Check the console.");
      return;
    }

    try {
      setLoading(true);

      console.log("Publishing:", job);

      // "pending" is a real job post, so it is subject to the plan quota.
      const response = await api.post("/employee/jobs/", {
        ...job,
        status: "pending",
      });

      console.log(response.data);

      alert("Job created successfully.");

      // The Free Plan job may now be spent - re-check the backend and let the
      // gate decide whether the upgrade prompt is due.
      await gate?.notifyJobPosted();

      navigate("/employee/dashboard/jobs");
    } catch (err) {
      console.error(err);
      console.log(err.response?.data);

      if (isSubscriptionRequired(err)) {
        // Quota exhausted: re-raise the upgrade prompt.
        gate?.notifyPostBlocked(err);
        alert(
          err.response?.data?.message ||
            "Your free job post has been used. Upgrade to a subscription plan to continue posting unlimited jobs."
        );
        return;
      }

      alert("Failed to publish job.");
    } finally {
      setLoading(false);
    }
  };
  // Save Draft
  const handleSaveDraft = async () => {
    try {
      setLoading(true);

      // Drafts are private work-in-progress and do not consume the plan quota.
      await api.post("/employee/jobs/", {
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
const handlePreview = async () => {
  console.log("Preview button clicked");

  const validationErrors = validateJobForm(job);
  console.log("Validation Errors:", validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    alert("Validation failed. Check the console.");
    return;
  }

  try {
    setLoading(true);

    console.log("Sending job:", job);

    // Saved as a draft so previewing never consumes the job-post quota.
    const response = await api.post("/employee/jobs/", {
      ...job,
      status: "draft",
    });

    console.log("API Response:", response.data);

    navigate("/employee/dashboard/jobs/preview", {
      state: {
        job: response.data,
      },
    });
  } catch (err) {
    console.error("API Error:", err);
    console.log(err.response?.data);
    alert("Failed to generate preview.");
  } finally {
    setLoading(false);
  }
};
  // Schedule
  const handleSchedule = () => {
    console.log("Schedule Job");
  };

  // Cancel
  const handleCancel = () => {
    navigate("/employee/dashboard/jobs");
  };

  return (
    <div className="mx-auto max-w-7xl p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Create New Job
        </h1>

        <p className="mt-2 text-slate-500">
          Fill in the details below to publish a new job posting.
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