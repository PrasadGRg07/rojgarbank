import api from "./api";

// =============================
// Contact Messages
// =============================

// Public: submitted from the "Talk to Us" page
export const createContactMessage = async (data) => {
  const response = await api.post("/contact/messages/", data);
  return response.data;
};

// Admin only
export const getContactMessages = async () => {
  const response = await api.get("/contact/messages/");
  return response.data;
};

export const updateContactMessage = async (id, data) => {
  const response = await api.patch(`/contact/messages/${id}/`, data);
  return response.data;
};

export const deleteContactMessage = async (id) => {
  const response = await api.delete(`/contact/messages/${id}/`);
  return response.data;
};
