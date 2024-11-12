import API from "./index";

export const createOrder=(data) =>API.post("/create-order/", data);
export const verifyPayment = (data) => API.post("/payment-callback/", data);
  
export default API