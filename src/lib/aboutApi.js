import api from "./api";

const collectionUrl = (collection, id) =>
  `/content/about/${collection}/${id ? `${id}/` : ""}`;

const listItems = async (collection) =>
  (await api.get(collectionUrl(collection))).data;

const createItem = async (collection, formData) =>
  (await api.post(collectionUrl(collection), formData)).data;

const updateItem = async (collection, id, formData) =>
  (await api.put(collectionUrl(collection, id), formData)).data;

// Partial update, for the row-level actions (reorder, show/hide) that must not
// resend the whole record.
const patchItem = async (collection, id, data) =>
  (await api.patch(collectionUrl(collection, id), data)).data;

const deleteItem = async (collection, id) =>
  (await api.delete(collectionUrl(collection, id))).data;

// ============================
// Public About page (single call)
// ============================
export const getPublicAbout = async () => {
  const response = await api.get("/content/about/");
  return response.data;
};

// ============================
// Admin: whole page, including hidden items
// ============================
export const getManageAbout = async () => {
  const response = await api.get("/content/about/manage/");
  return response.data;
};

// ============================
// Admin: About page copy
// ============================
export const updateAboutPage = async (data) => {
  const response = await api.patch("/content/about/manage/", data);
  return response.data;
};

// ============================
// Achievements (the stat cards)
// ============================
export const getAchievements = () => listItems("achievements");
export const createAchievement = (formData) =>
  createItem("achievements", formData);
export const updateAchievement = (id, formData) =>
  updateItem("achievements", id, formData);
export const patchAchievement = (id, data) =>
  patchItem("achievements", id, data);
export const deleteAchievement = (id) => deleteItem("achievements", id);

// ============================
// Leadership
// ============================
export const getLeaders = () => listItems("leadership");
export const createLeader = (formData) => createItem("leadership", formData);
export const updateLeader = (id, formData) =>
  updateItem("leadership", id, formData);
export const patchLeader = (id, data) => patchItem("leadership", id, data);
export const deleteLeader = (id) => deleteItem("leadership", id);

// ============================
// Pillars (Mission / Vision / Why us)
// ============================
export const getPillars = () => listItems("pillars");
export const createPillar = (formData) => createItem("pillars", formData);
export const updatePillar = (id, formData) =>
  updateItem("pillars", id, formData);
export const patchPillar = (id, data) => patchItem("pillars", id, data);
export const deletePillar = (id) => deleteItem("pillars", id);

// ============================
// Team
// ============================
export const getTeamMembers = () => listItems("team");
export const createTeamMember = (formData) => createItem("team", formData);
export const updateTeamMember = (id, formData) =>
  updateItem("team", id, formData);
export const patchTeamMember = (id, data) => patchItem("team", id, data);
export const deleteTeamMember = (id) => deleteItem("team", id);
