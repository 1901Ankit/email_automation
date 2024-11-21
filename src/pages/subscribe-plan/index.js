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
      <div className="container mx-auto pt-32 px-4 max-h-[100vh] overflow-auto">
        <div className="p-2">
          <h1 className="text-3xl font-bold uppercase">Subscription Plan</h1>
        </div>

        <div className="flex flex-wrap w-full pricing">
          <div className="w-full sm:w-1/2 flex-1 min-w-[360px] px-12">
            <div
              className="box relative flex flex-col justify-start bg-white
             p-6 shadow-custom rounded-md border-t-8 border-b-8 border-[#7b2cbf] shadow-md shadow-[#7b2cbf]/90"
            >
              <div className="text-center">
                <span className="text-[#7b2cbf] font-bold text-[28px]">
                  Basic
                </span>
                <div className="h-[2px] bg-[#7b2cbf] mt-2 mx-auto w-16"></div>
                <h3 className="text-center mt-3 font-bold text-[24px] pricing">
                  ₹1800 / onwards
                </h3>
                <ul className="list-none mt-4 font-semibold text-[15px] leading-8 pricing">
                  <li>Unlimited Emails</li>
                  <li>Validity 30 Days</li>
                  <li>1 Device</li>
                </ul>
              </div>

              <div className="button-contain ">
                <button
                  type="button"
                  onClick={() => handlePayment("basic")}
                  className="font-montserrat text-[#f7fff7] border-none rounded-[20px] py-[7.5px] px-[50px] cursor-pointer inline-flex items-center bg-[#7b2cbf]  "
                >
                  BUY
                </button>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 flex-1 min-w-[360px] px-12">
            <div
              className="box relative flex flex-col justify-start bg-white p-6 
            shadow-custom rounded-md border-t-8 border-b-8 border-[#7b2cbf] shadow-md shadow-[#7b2cbf]/90"
            >
              <div className="text-center">
                <span className="text-[#7b2cbf] font-bold text-[28px]">
                  Premium
                </span>
                <div className="h-[2px] bg-[#7b2cbf] mt-2 mx-auto w-16"></div>
                <h3 className="text-center mt-3 font-bold text-[24px] pricing">
                  ₹3500 / onwards
                </h3>
                <ul className="list-none mt-4 font-semibold text-[15px] leading-8 pricing">
                  <li>Unlimited Emails</li>
                  <li>Validity 30 Days</li>
                  <li>3 Device</li>
                </ul>
              </div>

              <div className="button-contain ">
                <button
                  type="button"
                  onClick={() => handlePayment("premium")}
                  className="font-montserrat text-[#f7fff7] border-none rounded-[20px] py-[7.5px] px-[50px] cursor-pointer inline-flex items-center bg-[#7b2cbf]  "
                >
                  BUY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
