import api from "./api";


// Get all users
  const response = await api.get(
    "/admin/users/"
  );

  return response.data;


// Get single user
  return response.data;

// Create user
  const response = await api.post(
    "/admin/users/",
    data
  );

  return response.data;


// Update user
  const response = await api.put(
    data
  );

  return response.data;


// Delete user
  const response = await api.delete(
  );

  return response.data;

// ==============================
// Pending Jobs
// ==============================
  const response = await api.get("/admin/jobs/pending/");
  return response.data;

// ==============================
// Approved Jobs
// ==============================
  const response = await api.get("/admin/jobs/approved/");
  return response.data;

// ==============================
// Rejected Jobs
// ==============================
  const response = await api.get("/admin/jobs/rejected/");
  return response.data;

// ==============================
// Approve Job
// ==============================
  return response.data;

// ==============================
// Reject Job
// ==============================
    reason,

  return response.data;

// ==============================
// Employees
// ==============================
  const response = await api.get("/admin/employees/");
  return response.data;
