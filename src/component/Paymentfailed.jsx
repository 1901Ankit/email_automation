import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      <div className="text-center">
        {/* Cross Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-red-500 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>

        {/* Payment Failed Text */}
        <p className="mt-4 text-xl font-semibold text-gray-700">Payment Failed</p>
        <p className="mt-2 text-lg text-gray-600">Something went wrong. Please try again.</p>

        {/* Retry Button */}
        <button
          className="mt-6 px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
          onClick={() => navigate("/subscribe-plan")}
        >
          Retry Payment
        </button>

        {/* Go Home Button */}
        <button
          className="mt-3 px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition ml-2"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
