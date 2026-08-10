export function validateJobForm(data) {
  const errors = {};

  // ==========================
  // Basic Information
  // ==========================
  if (!data.title.trim()) {
    errors.title = "Job title is required.";
  }

  if (!data.mainCategory) {
    errors.mainCategory = "Please select a category.";
  }

  if (!data.employmentType) {
    errors.employmentType = "Employment type is required.";
  }

  if (!data.jobLevel) {
    errors.jobLevel = "Job level is required.";
  }

  if (!data.openings || Number(data.openings) <= 0) {
    errors.openings = "Number of openings must be greater than 0.";
  }

  // ==========================
  // Description
  // ==========================
  if (!data.shortDescription.trim()) {
    errors.shortDescription = "Short description is required.";
  }

  if (!data.description.trim()) {
    errors.description = "Job description is required.";
  }

  if (!data.responsibilities.trim()) {
    errors.responsibilities = "Responsibilities are required.";
  }

  if (!data.qualifications.trim()) {
    errors.qualifications = "Qualifications are required.";
  }

  // ==========================
  // Requirements
  // ==========================
  if (!data.experience) {
    errors.experience = "Experience level is required.";
  }

  if (!data.education) {
    errors.education = "Education level is required.";
  }

  if (!data.skills || data.skills.length === 0) {
    errors.skills = "Add at least one required skill.";
  }

  // ==========================
  // Salary
  // ==========================
  if (!data.hideSalary) {
    if (!data.salaryMin) {
      errors.salaryMin = "Minimum salary is required.";
    }

    if (!data.salaryMax) {
      errors.salaryMax = "Maximum salary is required.";
    }

    if (
      Number(data.salaryMin) > Number(data.salaryMax)
    ) {
      errors.salaryMax =
        "Maximum salary must be greater than minimum salary.";
    }
  }

  // ==========================
  // Location
  // ==========================
  if (!data.province) {
    errors.province = "Province is required.";
  }

  if (!data.district.trim()) {
    errors.district = "District is required.";
  }

  // ==========================
  // Application
  // ==========================
  if (!data.applicationDeadline) {
    errors.applicationDeadline =
      "Application deadline is required.";
  }

  if (!data.contactEmail.trim()) {
    errors.contactEmail = "Contact email is required.";
  }

  return errors;
}