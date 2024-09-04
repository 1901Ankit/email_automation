import API from "./index";
export const getSMTPs=(id) =>API.get(`/smtp-servers/${id}/`);
export const getAllSMTPs=(user_id) =>API.post("/smtp-servers/",user_id);
export const createSMTPs=(smtpData) =>API.post("smtp-server/create/", smtpData)   //name and host,port,user,password, use_tls, use_ssl
export const editSMTPs=(smtpData,id) =>API.put(`/smtp-servers/edit/${id}/`, smtpData)  //name and host,port,user,password, use_tls, use_ssl
export const deleteSMTPs=(id) =>API.delete(`/smtp-servers/delete/${id}/`);


export default API