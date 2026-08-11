import api from "./api";

export const createJob = async (data) => {
  const response = await api.post("/employee/jobs/", data);
  return response.data;
};

export const getMyJobs = async () => {
  const response = await api.get("/employee/jobs/");
  return response.data;
};

export const submitJobForReview = async (jobId) => {
  const response = await api.patch(`/employee/jobs/${jobId}/submit/`);
  return response.data;
};

export const getJobDetail = async (id) => {
  const response = await api.get(`/employee/jobs/${id}/`);
  return response.data;
};

export const updateJob = async (id, data) => {
    const response = await api.put(`/employee/jobs/${id}/`, data);
    return response.data;
};

export const saveDraft = async (id, data) => {
    const response = await api.patch(`/employee/jobs/${id}/`, data);
    return response.data;
};

// ==========================
// Applicants
// ==========================

export const getApplicants = async (jobId) => {
    const response = await api.get(
        `/employee/jobs/${jobId}/applications/`
    );

    return response.data;
};

export const getApplicantDetail = async (id) => {
    const response = await api.get(
        `/employee/applications/${id}/`
    );

    return response.data;
};

export const updateApplicantStatus = async (id, status) => {
    const response = await api.patch(
        `/employee/applications/${id}/status/`,
        { status }
    );

    return response.data;
};

export const getAllApplicants = async () => {
    const response = await api.get(
        "/employee/applications/"
    );

    return response.data;
};