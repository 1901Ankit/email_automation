import API from "./index";
export const getAllSenders=() =>API.get("/smtp-servers/");
export const getSenders=(id) =>API.get(`/smtp-servers/${id}/`);
export const createSenders=(smtpData) =>API.post("smtp-servers/create/", smtpData)   //name and host,port,user,password, use_tls, use_ssl
export const editSenders=(smtpData) =>API.put(`/smtp-servers/edit/${id}/`, smtpData)  //name and host,port,user,password, use_tls, use_ssl
export const deleteSenders=(id) =>API.delete(`/smtp-servers/delete/${id}/`);


export default API