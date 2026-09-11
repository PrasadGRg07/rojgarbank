import api from "./api";


// Get all users
export const getUsers = async () => {
  const response = await api.get(
    "/admin/users/"
  );

  return response.data;
};


// Get single user
export const getUser = async (id) => {
  const response = await api.get(`/admin/users/${id}/`);
  return response.data;
};

// Create user
export const createUser = async (data) => {
  const response = await api.post(
    "/admin/users/",
    data
  );

  return response.data;
};


// Update user
export const updateUser = async (id, data) => {
  const response = await api.put(
    `/admin/users/${id}/`,
    data
  );

  return response.data;
};


// Delete user
export const deleteUser = async (id) => {
  const response = await api.delete(
    `/admin/users/${id}/`
  );

  return response.data;
};

// ==============================
// All Jobs (single list)
// ==============================
export const getAllAdminJobs = async () => {
  const [pending, approved, rejected] = await Promise.all([
    api.get("/admin/jobs/pending/"),
    api.get("/admin/jobs/approved/"),
    api.get("/admin/jobs/rejected/"),
  ]);
  return [...pending.data, ...approved.data, ...rejected.data];
};

// ==============================
// Single Job
// ==============================
export const getAdminJob = async (id) => {
  const response = await api.get(`/admin/jobs/${id}/`);
  return response.data;
};

// ==============================
// Pending Jobs
// ==============================
export const getPendingJobs = async () => {
  const response = await api.get("/admin/jobs/pending/");
  return response.data;
};

// ==============================
// Approved Jobs
// ==============================
export const getApprovedJobs = async () => {
  const response = await api.get("/admin/jobs/approved/");
  return response.data;
};

// ==============================
// Rejected Jobs
// ==============================
export const getRejectedJobs = async () => {
  const response = await api.get("/admin/jobs/rejected/");
  return response.data;
};

// ==============================
// Update Job (admin)
// ==============================
export const updateAdminJob = async (id, data) => {
  const response = await api.patch(`/admin/jobs/${id}/`, data);
  return response.data;
};

// ==============================
// Delete Job
// ==============================
export const deleteAdminJob = async (id) => {
  const response = await api.delete(`/admin/jobs/${id}/`);
  return response.data;
};

// ==============================
// Approve Job
// ==============================
export const approveJob = async (jobId) => {
  const response = await api.patch(`/admin/jobs/${jobId}/approve/`);
  return response.data;
};

// ==============================
// Reject Job
// ==============================
export const rejectJob = async (jobId, reason) => {
  const response = await api.patch(`/admin/jobs/${jobId}/reject/`, {
    reason,
  });

  return response.data;
};

// ==============================
// Employees
// ==============================
export const getEmployees = async () => {
  const response = await api.get("/admin/employees/");
  return response.data;
};