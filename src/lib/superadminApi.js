import api from "./api";

export const getSuperAdminUsers = async () => {
  const response = await api.get("/superadmin/users/");
  return response.data;
};

export const grantSpecialAccount = async (userId) => {
  const response = await api.patch(`/superadmin/users/${userId}/grant-special/`);
  return response.data;
};

export const revokeSpecialAccount = async (userId) => {
  const response = await api.patch(`/superadmin/users/${userId}/revoke-special/`);
  return response.data;
};

export const getRoleStats = async () => {
  const response = await api.get("/superadmin/roles/stats/");
  return response.data;
};

