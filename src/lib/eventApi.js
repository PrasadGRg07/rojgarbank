import api from "./api";

// ============================
// Get all events
// ============================
export const getEvents = async () => {
  const response = await api.get("/events/");
  return response.data;
};

// ============================
// Get single event
// ============================
export const getEvent = async (id) => {
  const response = await api.get(`/events/${id}/`);
  return response.data;
};

// ============================
// Create event
// ============================
export const createEvent = async (formData) => {
  const response = await api.post(
    "/events/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ============================
// Update event
// ============================
export const updateEvent = async (id, formData) => {
  const response = await api.put(
    `/events/${id}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ============================
// Delete event
// ============================
export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}/`);
  return response.data;
};