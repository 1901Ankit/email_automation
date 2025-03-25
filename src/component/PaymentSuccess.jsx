import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/subscribe-plan"); // Redirect after 4 seconds
    }, 4000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-xl font-semibold text-gray-700">
          Your payment is being processed...
        </p>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Please don't refresh, we're redirecting you. Thank you!
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
