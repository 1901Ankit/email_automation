// src/api/user_profile.js
import API from "./index";

export const getAllUserProfile = () => API.get(`/user-profile/`);
export const getAllDevices = (id) => API.get(`/devices/`);

export default API;
