import API from "./index";

export const sendEmail=(data) =>API.post("send-emails/", data);
export default API