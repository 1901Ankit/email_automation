// src/api/user_profile.js
import API from "./index";

export const getAllUserProfile = (user) => API.get(`/user-profile/`);

export default API;
