import React, { useState } from "react";
import * as API from "../../api/payment";
import { useNavigate } from "react-router-dom";

const Subscribe = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("razorpay"); // Default to Razorpay

  const handleRazorpayWindow = async (orderData) => {
    const options = {
      key: "rzp_test_Z7i6d0v66YQ8x5",
      amount: orderData.amount,
      currency: orderData.currency,
      name: orderData.plan_name,
      description: "Test Transaction",
      order_id: orderData.razorpay_order_id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          await API.verifyPayment({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          });
          navigate("/home");
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

  const handlePhonePePayment = async (orderData) => {
    // Add PhonePe payment integration logic here
    alert("PhonePe integration is not implemented yet.");
  };


  const handlePayment = async (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleConfirmPayment = async () => {
    // console.log("Selected Plan:", plan);
    try {
      const response = await API.createOrder({
        plan_name: selectedPlan.name,
      });

      if (paymentMethod === "razorpay") {
        console.log("Order Created:", response.data);
      handleRazorpayWindow(response.data);
      } else if (paymentMethod === "phonepe") {
        handlePhonePePayment(response.data);
      }

      setShowModal(false);
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
          {[
            {
              name: "Basic",
              price: "₹149 / onwards",
              features: [
                "No. of Emails :- 200",
                "Validity :- 30 Days",
                "1 Device",
              ],
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
            },
            {
              name: "Elite",
              price: "₹999 / onwards",
              features: [
                "Unlimited Emails",
                "Validity :- 30 Days",
                "Unlimited Devices",
              ],
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
                    onClick={() => handlePayment(plan)}
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

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {selectedPlan.name} - {selectedPlan.price}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Plan Features */}
        <div className="border-r pr-4">
          <ul className="list-none mt-2 font-medium text-gray-700 text-[16px] space-y-2">
            {selectedPlan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                ✅ {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Options */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800">Choose Payment Method</h3>
          <div className="flex justify-around mt-4">
            <button
              onClick={() => setPaymentMethod("razorpay")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${paymentMethod === "razorpay" ? "bg-[#7b2cbf] text-white" : "border border-gray-400 text-gray-800"}`}
            >
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-razorpay-logo-icon-download-in-svg-png-gif-file-formats--payment-gateway-brand-logos-icons-1399875.png" alt="Razorpay" className="w-30 h-6" /> Razorpay
            </button>
            <button
              onClick={() => setPaymentMethod("phonepe")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${paymentMethod === "phonepe" ? "bg-[#4a90e2] text-white" : "border border-gray-400 text-gray-800"}`}
            >
              <img src="https://static.thearcweb.com/images/PROD/PROD-aa944068-e222-41c1-83a1-4cf50c14444e.png" alt="PhonePe" className="w-30 h-30" /> PhonePe
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setShowModal(false)}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmPayment}
          className="px-6 py-2 bg-[#7b2cbf] text-white rounded-md hover:bg-[#5a1f8a] transition"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default Subscribe;
