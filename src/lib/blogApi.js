import api from "./api";

// ============================
// Get all blogs
// ============================
export const getBlogs = async () => {
  const response = await api.get("/blog/articles/");
  return response.data;
};

// ============================
// Get single blog
// ============================
export const getBlog = async (id) => {
  const response = await api.get(`/blog/articles/${id}/`);
  return response.data;
};

// ============================
// Create blog
// ============================
export const createBlog = async (formData) => {
  const response = await api.post("/blog/articles/", formData);
  return response.data;
};

// ============================
// Update blog
// ============================
export const updateBlog = async (id, formData) => {
  const response = await api.put(`/blog/articles/${id}/`, formData);
  return response.data;
};

// ============================
// Delete blog
// ============================
export const deleteBlog = async (id) => {
  const response = await api.delete(`/blog/articles/${id}/`);
  return response.data;
};
