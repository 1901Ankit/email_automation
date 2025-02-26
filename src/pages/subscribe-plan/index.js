import React, { useState } from "react";
import { initiatePayment, verifyPayment, upgradePlan } from "../../api/payment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Subscribe = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (plan) => {
    try {
      setLoading(true);
      setSelectedPlan(plan);

      // Generate a unique transaction ID
      const transactionId = `TXN_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}`;

      // Prepare payment data
      const paymentData = {
        transactionId,
        name: "John Doe",
        amount: getPlanAmount(plan.name),
        mobile: "9768686859",
        plan_name: plan.name,
        address_line1: "Line1 street MG road, Building, sight, park",
        address_line2: "new park, old park, medium railway station",
        city: "3rd class city",
        state: "tier 3 state",
        zip_code: "123456",
        country: "India",
      };

      const response = await initiatePayment(paymentData);

      if (response.data && response.data.redirect_url) {
        // Open PhonePe payment page in new window
        window.location.href = response.data.redirect_url;
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.error || "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get plan amount in numbers
  const getPlanAmount = (planName) => {
    const amounts = {
      Basic: 149,
      Standard: 300,
      Premium: 499,
      Elite: 999,
    };
    return amounts[planName] || 0;
  };

  const handleUpgrade = async (plan) => {
    try {
      const res = await upgradePlan({ plan_name: plan.name });
      console.log(res);
      if (res.data) {
        toast.success("Plan upgraded successfully");
      } else {
        toast.error("Failed to upgrade plan");
      }
    } catch (error) {
      console.error("Error upgrading plan:", error);
      toast.error(error.response?.data?.error || "Failed to upgrade plan");
    }
  };
  return (
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
            <div className="box flex flex-col justify-between h-full bg-white p-4 shadow-custom rounded-md border-t-8 border-b-8 border-[#3B82F6] shadow-md shadow-[#3B82F6]/90">
              <div className="text-center">
                <span className="text-[#3B82F6] font-bold text-[28px]">
                  {plan.name}
                </span>
                <div className="h-[2px] bg-[#3B82F6] mt-2 mx-auto w-16"></div>
                <h3 className="text-center mt-3 font-bold text-[24px]">
                  {plan.price}
                </h3>
                <ul className="list-none mt-4 font-semibold text-[15px] leading-8">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="button-contain">
                <button
                  type="button"
                  onClick={() => handlePayment(plan)}
                  disabled={loading}
                  className={`font-montserrat text-[#f7fff7] border-none rounded-[20px] py-[7.5px] px-[50px] cursor-pointer inline-flex items-center ${
                    loading ? "bg-gray-400" : "bg-[#3B82F6]"
                  }`}
                >
                  {loading ? "Processing..." : "Buy Now"}
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleUpgrade(plan)}
                disabled={loading}
                className={`font-montserrat text-[#f7fff7] border-none rounded-[20px] py-[7.5px] px-[50px] mt-3 cursor-pointer inline-flex items-center  ${
                  loading ? "bg-gray-400" : "bg-green-500"
                }`}
              >
                {loading ? "Processing..." : "Upgrade Plan "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
