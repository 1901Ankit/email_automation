import API from "./index";

// Exporting multiple API functions
export const login = (loginData) => API.post("/login/", loginData);
export const register = (registerData) => API.post("/register/", registerData);
export const forgotPassword = (email) => API.post("/reset_password/", email);
export const verifyOtp = (verificationData) => API.post("/verify-otp/", verificationData);
export const verifyOtpTwoFA = (verificationData) => API.post("/2FA-otp/", verificationData);
export const logout = (data) => API.post("/logout/", data);
export const logoutOTPSend = (data) => API.post("/device-otp/", data);
export const logoutOTP = (data) => API.post("/logout-device/", data);
export const  getContactList = () => API.get("/user-contacts/");
export const  getSubjectList = () => API.get("/subject-file-list/");
export const  getSingleContactList = (file_id) => API.get(`/contact-list/?file_id=${file_id}`);
export const  getSingleSubjectList = (file_id) => API.get(`/subject-file/${file_id}/`);
export const   deleteSingleContactList = (file_id) => API.delete(`/delete-contact-list/?file_id=${file_id}`);
export const   deleteSingleSubjectList = (file_id) => API.delete(`/delete-file/${file_id}/`);
export const   deleteSingleSubjectListRow = (file_id,row_id) => API.delete(`/subject-file/${file_id}/row/${row_id}/`);
export const updateSingleContact= (file_id, formdata)=>API.put(`/contact-update/${file_id}`, formdata);
export const resetPassword = (uidbId, token, passwordData) =>
  API.post(`/reset_password/${uidbId}/${token}/`, passwordData);
export const  uploadContacts = (data) => API.post("/upload-contacts/", data);
export const  uploadSubjects = (data) => API.post("/upload-subject-file/", data);
export const createCampainion= (data)=>API.post("/campaign/",data);
export const getAllCampigns= ()=>API.get("/campaigns-list/");
export const deleteCampigns= (id)=>API.delete(`/campaigns/${id}/`)
export const getSingleCampigns= (id)=>API.get(`/campaigns/${id}/`)
export const  updateCampaign= (id,data)=>API.put(`/campaigns/${id}/`,data);
export default API;