import React from "react";
import Techserve from "../assests/image/banner/Techserve.png";
import { SiTicktick } from "react-icons/si";

const Plan_ui = () => {
  const plans = [
    {
      name: "Basic",
      description: "Starter pack to help you to get started",
      price: "Free",
      features: [
        "Employee directory",
        "Task management",
        "Calendar integration",
        "File storage",
        "Communication tools",
        "Reporting and analytics",
      ],
      image: Techserve,
      recommended: false,
    },
    {
      name: "Pro",
      description: "Starter pack to help you get started",

      price: "$20 / month",
      features: [
        "Employee directory",
        "Task management",
        "Calendar integration",
        "File storage",
        "Communication tools",
        "Reporting and analytics",
      ],
      image: Techserve,
      recommended: true,
    },
    {
      name: "Basic",
      description: "Starter pack to help you get started",
      price: "Free",
      features: [
        "Employee directory",
        "Task management",
        "Calendar integration",
        "File storage",
        "Communication tools",
        "Reporting and analytics",
      ],
      image: Techserve,
      recommended: false,
    },
    {
      name: "Pro",
      description: "Starter pack to help you get started",

      price: "$20 / month",
      features: [
        "Employee directory",
        "Task management",
        "Calendar integration",
        "File storage",
        "Communication tools",
        "Reporting and analytics",
      ],
      image: Techserve,
      recommended: true,
    },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-white"
      id="planui"
    >
      {/* Header */}
      <h5 className="text-black font-bold text-3xl md:text-4xl mb-10 leading-snug tracking-tight">
        OUR <span className="text-blue-500 mx-2">PLANS</span>
      </h5>

      {/* Pricing Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-lg shadow-lg p-6 text-center flex flex-col ${
              plan.recommended
                ? "bg-[#93C5FD] text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {/* Recommended Badge */}
            {plan.recommended && (
              <div className="border-b-2 border-white absolute top-0 left-1/2 -translate-x-1/2 bg-[#93C5FD] text-white text-lg font-bold p-2 px-3 rounded-b-md w-full">
                Recommended
              </div>
            )}

            <img
              src={plan.image}
              alt={plan.name}
              className={`mb-4 w-20 object-contain mx-auto mt-5 ${
                plan.recommended ? "invert fill-transparent" : ""
              }`}
            />

            <h3 className="font-bold text-3xl">{plan.name}</h3>
            <p className=" text-base text-start p-0">{plan.description}</p>
            <div className="items-start justify-start flex">
              <h4 className="mt-4 font-bold text-xl ">Features</h4>
            </div>
            <div className="items-start justify-start flex flex-1">
              <ul className="mt-2 text-left leading-[35px] font-medium min-h-[150px]">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className=" mr-2">
                      <SiTicktick />
                    </span>{" "}
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <h3 className="font-bold  text-xl mt-4">{plan.price}</h3>
            <button
              className="border border-blue-500 rounded-lg p-2 font-semibold flex items-center justify-center
                  cursor-pointer bg-white text-blue-500 w-full mt-3"
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan_ui;
