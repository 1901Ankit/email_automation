import API from "./index";

// Exporting multiple API functions
export const login = (loginData) => API.post("/login/", loginData);
export const register = (registerData) => API.post("/register/", registerData);
export const forgotPassword = (email) => API.post("/reset_password/", email);
export const verifyOtp = (verificationData) => API.post("/verify-otp/", verificationData);
export const logout = (data) => API.post("/logout/", data);
export const logoutOTP = (data) => API.post("/device-otp/", data);
export const logoutDevice = (data) => API.post("/logout-device/", data);
export const resetPassword = (uidbId, token, passwordData) =>
  API.post(`/reset_password/${uidbId}/${token}/`, passwordData);


export default API;