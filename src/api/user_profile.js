// src/api/user_profile.js
import API from "./index";

export const getAllUserProfile = () => API.get(`/user-profile/`);
export const getAllDevices = (id) => API.get(`/devices/`);
export const isTokenBlackListed = (token) =>
  API.post(`/blacklisted-token/`, token);
export const get2FAStatus = () => {
  return API.get("/get-2fa-status/");
};
export const enable2FA = () => {
  return API.post("/enable-2fa/");
};
export const disable2FA = () => {
  return API.post("/disable-2fa/");
};
export default API;
