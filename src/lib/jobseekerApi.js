import api from "./api";

/* ===========================
   PROFILE
=========================== */

export const getProfile = () => {
  return api.get("/jobseeker/profile/");
};

export const updateProfile = (data) => {
  return api.patch("/jobseeker/profile/", data, {
    headers: {
    },
  });
};

/* ===========================
   SKILLS
=========================== */

export const getSkills = () => {
  return api.get("/jobseeker/skills/");
};

export const createSkill = (data) => {
  return api.post("/jobseeker/skills/", data);
};

export const updateSkill = (id, data) => {
  return api.put(`/jobseeker/skills/${id}/`, data);
};

export const deleteSkill = (id) => {
  return api.delete(`/jobseeker/skills/${id}/`);
};

/* ===========================
   EDUCATION
=========================== */

export const getEducations = () => {
  return api.get("/jobseeker/education/");
};

export const createEducation = (data) => {
  return api.post("/jobseeker/education/", data);
};

export const updateEducation = (id, data) => {
  return api.put(`/jobseeker/education/${id}/`, data);
};

export const deleteEducation = (id) => {
  return api.delete(`/jobseeker/education/${id}/`);
};

/* ===========================
   EXPERIENCE
=========================== */

export const getExperiences = () => {
  return api.get("/jobseeker/experience/");
};

export const createExperience = (data) => {
  return api.post("/jobseeker/experience/", data);
};

export const updateExperience = (id, data) => {
  return api.put(`/jobseeker/experience/${id}/`, data);
};

export const deleteExperience = (id) => {
  return api.delete(`/jobseeker/experience/${id}/`);
};

/* ===========================
   CERTIFICATIONS
=========================== */

export const getCertifications = () => {
  return api.get("/jobseeker/certifications/");
};

export const createCertification = (data) => {
  return api.post("/jobseeker/certifications/", data);
};

export const updateCertification = (id, data) => {
  return api.put(`/jobseeker/certifications/${id}/`, data);
};

export const deleteCertification = (id) => {
  return api.delete(`/jobseeker/certifications/${id}/`);
};

/* ===========================
   RESUME
=========================== */

export const getResume = () => {
  return api.get("/jobseeker/resumes/");
};

export const uploadResume = (data) => {
  return api.patch("/jobseeker/resumes/upload/", data, {
  });
};

export const deleteResume = () => {
  return api.delete("/jobseeker/resumes/delete/");
};

/* ===========================
   PORTFOLIO
=========================== */

export const getPortfolio = () => {
  return api.get("/jobseeker/portfolio/");
};

export const createPortfolio = (data) => {
  return api.post("/jobseeker/portfolio/", data, {
    headers: {
    },
  });
};

export const updatePortfolio = (id, data) => {
  return api.put(`/jobseeker/portfolio/${id}/`, data, {
    headers: {
    },
  });
};

export const deletePortfolio = (id) => {
  return api.delete(`/jobseeker/portfolio/${id}/`);
};

/* ===========================
   ACCOUNT SETTINGS
=========================== */

export const getAccountSettings = () => {
  return api.get("/jobseeker/account-settings/");
};

export const updateAccountSettings = (data) => {
  return api.put("/jobseeker/account-settings/", data);
};

/* ===========================
   CHANGE PASSWORD
=========================== */

export const changePassword = (data) => {
  return api.post("/auth/change-password/", data);
};


// ===========================
// Jobs
// ===========================
export const getJobs = async () => {
    const response = await api.get("/jobseeker/jobs/");
    return response.data;
};

export const getJob = async (id) => {
    const response = await api.get(`/jobseeker/jobs/${id}/`);
    return response.data;
};

// ===========================
// Apply Job
// ===========================
export const applyJob = async (id, data) => {
    const response = await api.post(
        `/jobseeker/jobs/${id}/apply/`,
        data,
        {
            headers: {
            },
        }
    );

    return response.data;
};

// ===========================
// Applications
// ===========================
export const getMyApplications = async () => {
    const response = await api.get("/jobseeker/applications/");
    return response.data;
};

export const getApplication = async (id) => {
    const response = await api.get(
        `/jobseeker/applications/${id}/`
    );

    return response.data;
};

// ===========================
// Saved Jobs
// ===========================
export const getSavedJobs = async () => {
    const response = await api.get("/jobseeker/saved-jobs/");
    return response.data;
};

export const toggleSavedJob = async (jobId) => {
    const response = await api.post(`/jobseeker/jobs/${jobId}/save/`);
    return response.data;
};

// ===========================
// Public Jobs (home page — no auth required)
// ===========================
export const getPublicJobs = async () => {
    const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
    const response = await fetch(`${baseURL}/jobseeker/jobs/public/`);
    if (!response.ok) throw new Error("Failed to fetch public jobs");
    return response.json();
};

export const getPublicJobDetails = async (id) => {
    const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
    const response = await fetch(`${baseURL}/jobseeker/jobs/public/${id}/`);
    if (!response.ok) throw new Error("Failed to fetch job details");
    return response.json();
};