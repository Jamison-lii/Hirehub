export const BASE_URL = "https://resume-deployment.onrender.com";

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Signup 
    LOGIN: "/api/auth/login", // Authenticate user & return JWT token
    GET_PROFILE: "/api/auth/profile", // Get logged-in user details
  },

  RESUME: {
    CREATE: "/api/resume",               // POST - Create a new resume
    GET_ALL: "/api/resume",              // GET - Get all resumes of logged-in user
    GET_BY_ID: (id) => `/api/resume/${id}`, // GET - Get a specific resume
    UPDATE: (id) => `/api/resume/${id}`,    // PUT - Update a resume
    DELETE: (id) => `/api/resume/${id}`,    // DELETE - Delete a resume
    UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,    // PUT - Upload Thumbnail and Resume profile img
  },

  IMAGE: {
    UPLOAD_IMAGE: "api/auth/upload-image",
  },
  FAPSHI: {
    API_USER : "39eb5c0a-7ea9-4af7-86c8-6094d4ea8c79",
    API_KEY : "FAK_be9001145c9d2ea44c8c0c49f3b78983", 
    BASE_URL : "https://live.fapshi.com"
  }
};
