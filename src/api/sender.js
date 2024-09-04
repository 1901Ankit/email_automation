import API from "./index";
export const getSenders=(id) =>API.get(`/senders/${id}/`);
export const getAllSenders=(user_id) =>API.post("/senders/", user_id);
export const createSenders=(senderData) =>API.post("sender/create/", senderData)   //name and email
export const editSenders=(senderData,id) =>API.put(`/senders/edit/${id}/`, senderData)  //name and email
export const deleteSenders=(id) =>API.delete(`/senders/delete/${id}/`);


export default API