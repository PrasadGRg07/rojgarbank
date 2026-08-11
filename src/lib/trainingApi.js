import api from "./api";

// =============================
// Training Sessions
// =============================

export const getTrainingSessions = async () => {
  const response = await api.get("/training/sessions/");
  return response.data;
};

export const getTrainingSession = async (id) => {
  const response = await api.get(`/training/sessions/${id}/`);
  return response.data;
};

export const createTraining = async (data) => {
  const response = await api.post("/training/sessions/", data);
  return response.data;
};

export const updateTraining = async (id, data) => {
  const response = await api.put(`/training/sessions/${id}/`, data);
  return response.data;
};

export const deleteTraining = async (id) => {
  const response = await api.delete(`/training/sessions/${id}/`);
  return response.data;
};

// =============================
// Training Enrollments
// =============================

export const getEnrollments = async (sessionId) => {
  const response = await api.get(`/training/sessions/${sessionId}/enroll/`);
  return response.data;
};

export const createEnrollment = async (sessionId, data) => {
  const response = await api.post(`/training/sessions/${sessionId}/enroll/`, data);
  return response.data;
};
