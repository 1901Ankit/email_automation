import API from "./index";
export const getEmailTemplate=(id) =>API.get(`/email-template/${id}/`);
export const getSavedEmailTemplates=(user_id) =>API.get("/uploaded-files/",user_id);
export const createHtmlTemplate=(htmlFile) =>API.post("upload-html/", htmlFile)   
export const editHtmlTemplate=(htmlFile,id) =>API.put(`/uploaded-files/update/${id}/`, htmlFile) 
// export const deleteHtmlTemplates=(id) =>API.delete(`/smtp-servers/delete/${id}/`);


export default API