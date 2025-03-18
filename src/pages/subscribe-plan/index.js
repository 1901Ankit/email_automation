import React, { useState, useEffect } from "react";
import { initiatePayment, verifyPayment, upgradePlan } from "../../api/payment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllUserProfile } from "../../api/user_profile";
import { SiTicktick } from "react-icons/si";
import { IoMdReturnRight } from "react-icons/io";

const Subscribe = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "₹149 / onwards",
      features: ["No. of Emails :- 200", "Validity :- 30 Days", "1 Device"],
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
  ];

  const getPlanIndex = (planName) => {
    return plans.findIndex((p) => p.name === planName);
  };

  // Check if plan is upgradable (higher than current plan)
  const isUpgradablePlan = (plan) => {
    if (!userData || !userData.plan_name) return true; // If no current plan, all plans can be purchased

    const currentPlanIndex = getPlanIndex(userData.plan_name);
    const selectedPlanIndex = getPlanIndex(plan.name);

    return selectedPlanIndex > currentPlanIndex;
  };

  // Check if plan is the current active plan
  console.log("USerData", userData);
  const isCurrentPlan = (plan) => {
    return (
      userData &&
      userData.plan_name === plan.name &&
      userData?.plan_status != "Expired"
    );
  };

  // Check if user has any subscription
  const hasSubscription = () => {
    return userData && userData.plan_name && userData.plan_status != "Expired";
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) navigate(-1);

        const response = await getAllUserProfile({
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          user: localStorage.getItem("id"),
        });

        if (response.data) {
          setUserData(response.data);
        } else {
          setUserData(null);
        }
      } catch (error) {
        setUserData(null);
        toast.error("Failed to get user details. Please try again!");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handlePayment = async (plan) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [plan.name]: true }));
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
      setLoadingStates((prev) => ({ ...prev, [plan.name]: false }));
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
      setLoadingStates((prev) => ({ ...prev, [plan.name]: true }));
      const res = await upgradePlan({ plan_name: plan.name });
      // console.log("res_from_api", res);
      if (res.data && res.data.redirect_url) {
        // Open PhonePe payment page in new window
        window.location.href = res.data.redirect_url;
      } else {
        toast.error("Failed to initiate payment");
      }

      if (res.data) {
        // toast.success("Plan upgraded successfully");
        // Refresh user data after successful upgrade
        const accessToken = localStorage.getItem("access_token");
        const response = await getAllUserProfile({
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          user: localStorage.getItem("id"),
        });

        if (response.data) {
          setUserData(response.data);
        }
      } else {
        toast.error("Failed to initiate payment to upgrade plan");
      }
    } catch (error) {
      console.error("Error upgrading plan:", error);
      toast.error(error.response?.data?.error || "Failed to upgrade plan");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [plan.name]: false }));
    }
  };

  return (
    <div className="container-fluid mx-auto pt-28 pb-10 px-4 max-h-[100vh] overflow-auto">
      <div className="p-2">
        <h1 className="text-3xl font-bold uppercase">Subscription Plan</h1>
        {hasSubscription() && (
          <p className="text-green-600 font-medium mt-2">
            Current Plan: {userData.plan_name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {plans.map((plan, index) => (
          <div key={index} className="w-full">
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
                  <span className="font-bold text-lg items-start justify-start flex mx-4 mb-2">
                    Features
                  </span>
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <SiTicktick className="text-blue-500 text-lg" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="button-contain mt-4 w-full">
                {isCurrentPlan(plan) ? (
                  <button
                    type="button"
                    disabled={true}
                    className="font-montserrat font-bold text-green-500 border border-green-500 rounded-lg py-2 px-4 cursor-not-allowed inline-flex items-center justify-center bg-gray-100 w-full text-sm"
                  >
                    Active Plan(Current)
                  </button>
                ) : hasSubscription() ? (
                  // User has a subscription, show only Upgrade button for higher plans
                  isUpgradablePlan(plan) ? (
                    <button
                      type="button"
                      onClick={() => handleUpgrade(plan)}
                      disabled={loadingStates[plan.name]}
                      className={`font-montserrat text-white border-none rounded-lg py-2 px-4 w-full cursor-pointer ${
                        loadingStates[plan.name]
                          ? "bg-gray-400"
                          : "bg-green-500"
                      }`}
                    >
                      {loadingStates[plan.name] ? "Processing..." : "Upgrade"}
                    </button>
                  ) : (
                    // Lower tier plans cannot be downgraded
                    <button
                      type="button"
                      disabled={true}
                      className="font-montserrat text-blue-500 border border-blue-500 rounded-lg py-2 px-4 cursor-not-allowed inline-flex items-center justify-center bg-gray-100 w-full text-sm"
                    >
                      Already Activated or Upgraded
                    </button>
                  )
                ) : (
                  // User has no subscription, show Buy button
                  <button
                    type="button"
                    onClick={() => handlePayment(plan)}
                    disabled={loadingStates[plan.name]}
                    className={`font-montserrat text-white border-none rounded-lg py-2 px-4 w-full cursor-pointer ${
                      loadingStates[plan.name] ? "bg-gray-400" : "bg-[#3B82F6]"
                    }`}
                  >
                    {loadingStates[plan.name] ? "Processing..." : "BUY"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
