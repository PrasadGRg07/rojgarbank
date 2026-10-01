import api from "./api";

// =============================
// Job posting entitlement
// =============================

/**
 * Authoritative plan + job-posting quota for the signed-in employer.
 *
 * The backend is the single source of truth: the frontend never infers
 * entitlement from localStorage, so refreshing the dashboard, opening a new
 * tab or logging back in can never disagree with the database.
 *
 * Shape:
 *   { plan, is_paid, posted_jobs, free_limit, jobs_remaining,
 *     can_post_job, requires_subscription }
 */
export const getJobPostingStatus = async () => {
  const response = await api.get("/employee/job-posting-status/");
  return response.data;
};

/**
 * True when a rejected request was a Free Plan job-post block.
 * Matches the `code` returned by the backend quota gate.
 */
export const isSubscriptionRequired = (error) =>
  error?.response?.status === 403 &&
  (error?.response?.data?.code === "subscription_required" ||
    error?.response?.data?.requires_subscription === true);
