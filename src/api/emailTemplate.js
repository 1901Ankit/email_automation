import API from "./index";
export const getEmailTemplate = (id) => API.get(`/email-template/${id}/`);
export const getEmailList = (total_emails) =>
  API.get("/email-status-analytics/", { params: { total_emails } });
export const getdaterange = (start_date, end_date) =>
  API.get("/date-range/", { params: { start_date, end_date } });
export const getSavedEmailTemplates = (user_id) =>
  API.get("/uploaded-files/", user_id);
export const createHtmlTemplate = (htmlFile) =>
  API.post("upload-html/", htmlFile);
export const editHtmlTemplate = (htmlFile, id) =>
  API.put(`/uploaded-files/update/${id}/`, htmlFile);
// export const deleteHtmlTemplates=(id) =>API.delete(`/smtp-servers/delete/${id}/`);

export const getUserSavedTemplates = ( ) =>
  API.get("/uploaded-files/");

export default API;
