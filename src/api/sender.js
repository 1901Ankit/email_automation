import API from "./index";
export const getAllSenders=() =>API.get("/senders/");
export const getSenders=(id) =>API.get(`/senders/${id}/`);
export const createSenders=(senderData) =>API.post("senders/create/", senderData)   //name and email
export const editSenders=(senderData) =>API.put(`/senders/edit/${id}/`, senderData)  //name and email
export const deleteSenders=(id) =>API.delete(`/senders/delete/${id}/`);


export default API