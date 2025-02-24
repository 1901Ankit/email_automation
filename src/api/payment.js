import API from "./index";

// Updated to send JSON data for PhonePe payment
export const initiatePayment = (data) => 
  API.post("/initiate-payment/", data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const verifyPayment = (data) => 
  API.post("/verify-payment/", data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

export default API