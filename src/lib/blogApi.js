import api from "./api";

// Get all blogs
export const getBlogs = async () => {
  const response = await api.get("/blog/articles/");
  return response.data;
};

// Get single blog
export const getBlog = async (slug) => {
  const response = await api.get(`/blog/articles/${slug}/`);
  return response.data;
};

// Create blog
export const createBlog = async (data) => {
  const response = await api.post("/blog/articles/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update blog
export const updateBlog = async (slug, data) => {
  const response = await api.put(`/blog/articles/${slug}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete blog
export const deleteBlog = async (slug) => {
  const response = await api.delete(`/blog/articles/${slug}/`);
  return response.data;
};