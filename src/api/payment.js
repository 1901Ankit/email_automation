import API from "./index";

export const initiatePayment=(data) =>API.post("/initiate-payment/", data);
export const verifyPayment = (data) => API.post("/verify-payment/", data);
  
export default API      