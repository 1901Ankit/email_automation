import React, { useState } from "react";
import * as API from "../../api/payment";
import { useNavigate } from "react-router-dom";
const Subscribe = () => {
  const nevigate = useNavigate();
  const handleRazorpayWindow = async (orderData) => {
    const options = {
      key: "rzp_test_VQZyoUi1lald9c",
      amount: orderData.amount,
      currency: orderData.currency,
      name: orderData.plan_name,
      description: "Test Transaction",
      order_id: orderData.razorpay_order_id,
      handler: async (response) => {
        console.log(response);
        try {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;
          await API.verifyPayment({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          });
          nevigate("/home");
        } catch (error) {
          console.error("Payment verification error:", error);
          alert("Payment verification failed.");
        }
      },
      prefill: {
        name: "Ankit Sharma",
        email: "ankit.sharma@example.com",
        contact: "8440186412",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399CC",
      },
    };
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };
  const handlePayment = async (plan) => {
    try {
      const response = await API.createOrder({
        plan_name: plan,
      });
      handleRazorpayWindow(response.data);
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };
  return (
    <>
      <div className="container-fluid mx-auto pt-28 pb-10 px-4 max-h-[100vh] overflow-auto">
        <div className="p-2">
          <h1 className="text-3xl font-bold uppercase">Subscription Plan</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
          {" "}
          {[
            {
              name: "Basic",
              price: "₹149 / onwards",
              features: [
                "No. of Emails :- 200",
                "Validity :- 30 Days",
                "1 Device",
              ],
              onClick: () => handlePayment("basic"),
            },
            {
              name: "Standard",
              price: "₹300 / onwards",
              features: [
                "No. of Emails :- 360",
                "(with extra 50 emails)",
                "Validity :- 30 Days",
                "3 Devices",
              ],
              onClick: () => handlePayment("standard"),
            },
            {
              name: "Premium",
              price: "₹499 / onwards",
              features: [
                "No. of Emails :- 600",
                "(with extra 90 emails)",
                "Validity :- 30 Days",
                "5 Devices",
              ],
              onClick: () => handlePayment("premium"),
            },
            {
              name: "Elite",
              price: "₹999 / onwards",
              features: [
                "Unlimited Emails",
                "Validity :- 30 Days",
                "Unlimited Devices",
              ],
              onClick: () => handlePayment("elite"),
            },
          ].map((plan, index) => (
            <div key={index} className="w-full md:w-1/4 flex-1 min-w-[250px]">
              <div
                className="box flex flex-col justify-between h-full bg-white
          p-4 shadow-custom rounded-md border-t-8 border-b-8 border-[#7b2cbf] shadow-md shadow-[#7b2cbf]/90"
              >
                <div className="text-center">
                  <span className="text-[#7b2cbf] font-bold text-[28px]">
                    {plan.name}
                  </span>
                  <div className="h-[2px] bg-[#7b2cbf] mt-2 mx-auto w-16"></div>
                  <h3 className="text-center mt-3 font-bold text-[24px]">
                    {plan.price}
                  </h3>
                  <ul className="list-none mt-4 font-semibold text-[15px] leading-8">
                    {plan.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="button-contain mt-4">
                  <button
                    type="button"
                    onClick={plan.onClick}
                    className="font-montserrat text-[#f7fff7] border-none rounded-[20px] py-[7.5px] px-[50px] cursor-pointer inline-flex items-center bg-[#7b2cbf]"
                  >
                    BUY
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Subscribe;
