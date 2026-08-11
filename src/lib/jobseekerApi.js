import api from "./api";

/* ===========================
   PROFILE
=========================== */

  return api.get("/jobseeker/profile/");


/* ===========================
   SKILLS
=========================== */

  return api.get("/jobseeker/skills/");

  return api.post("/jobseeker/skills/", data);



/* ===========================
   EDUCATION
=========================== */

  return api.get("/jobseeker/education/");

  return api.post("/jobseeker/education/", data);



/* ===========================
   EXPERIENCE
=========================== */

  return api.get("/jobseeker/experience/");

  return api.post("/jobseeker/experience/", data);



/* ===========================
   CERTIFICATIONS
=========================== */

  return api.get("/jobseeker/certifications/");

  return api.post("/jobseeker/certifications/", data);



/* ===========================
   RESUME
=========================== */

  return api.get("/jobseeker/resumes/");


  return api.delete("/jobseeker/resumes/delete/");

/* ===========================
   PORTFOLIO
=========================== */

  return api.get("/jobseeker/portfolio/");




/* ===========================
   ACCOUNT SETTINGS
=========================== */

  return api.get("/jobseeker/account-settings/");

  return api.put("/jobseeker/account-settings/", data);

/* ===========================
   CHANGE PASSWORD
=========================== */

  return api.post("/auth/change-password/", data);


// ===========================
// Jobs
// ===========================
    const response = await api.get("/jobseeker/jobs/");
    return response.data;

    return response.data;

// ===========================
// Apply Job
// ===========================
    const response = await api.post(
        data,
    );

    return response.data;

// ===========================
// Applications
// ===========================
    const response = await api.get("/jobseeker/applications/");
    return response.data;

    const response = await api.get(
    );

    return response.data;

// ===========================
// Saved Jobs
// ===========================
    const response = await api.get("/jobseeker/saved-jobs/");
    return response.data;

    return response.data;

// ===========================
// Public Jobs (home page — no auth required)
// ===========================
    const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
    if (!response.ok) throw new Error("Failed to fetch public jobs");
    return response.json();

    const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
    if (!response.ok) throw new Error("Failed to fetch job details");
    return response.json();
