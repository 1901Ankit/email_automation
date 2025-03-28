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
export const upgradePlan = (plan) => API.put('/upgrade-plan/', plan, {
  headers: {
    'Content-Type': 'application/json'
  }
});

export const  verifyUpgradePlan = (plan) => API.put('/verify-upgrade-payment/', plan, {
  headers: {
    'Content-Type': 'application/json'
  }
})

export default API