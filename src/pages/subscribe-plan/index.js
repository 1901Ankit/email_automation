import React, { useState } from "react";

const Subscribe = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleDummyPhonePePayment = () => {
    const phonePeURL =
      "https://mercury-uat.phonepe.com/transact?merchantId=MUID123&transactionId=TXN123&amount=10000&callbackUrl=https://yourwebsite.com/payment-success";
    window.open(phonePeURL, "_blank");
  };

  const handlePayment = (plan) => {
    setSelectedPlan(plan);
    handleDummyPhonePePayment();
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
              <div className="button-contain mt-4">
                <button
                  type="button"
                  onClick={() => handlePayment(plan)}
                  className="font-montserrat text-[#f7fff7] border-none rounded-[20px] py-[7.5px] px-[50px] cursor-pointer inline-flex items-center bg-[#3B82F6]"
                >
                  BUY
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
