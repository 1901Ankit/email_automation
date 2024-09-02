import API from "./index";

// Exporting multiple API functions
export const login = (loginData) =>API.post("/login/", loginData);
export const register = (registerData) => API.post("/register/", registerData);
export const forgotPassword = (email) => API.post("/reset-password/", email);
export const verifyOtp = (verificationData) => API.post("/verify-otp/",verificationData);
export const resetPassword = (uidbId,token,passwordData) =>
  API.post(`/reset-password/${uidbId}/${token}/`, passwordData);


export default API;