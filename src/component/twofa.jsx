import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  get2FAStatus,
  enable2FA,
  disable2FA,
} from "../../src/api/user_profile";
import "react-toastify/dist/ReactToastify.css";
const getToken = () => {
  return localStorage.getItem("access_token");
};

const TwoFAStatus = () => {
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch2FAStatus = async () => {
      const token = getToken();

      if (!token) {
        toast.error("You must be logged in to view this page.");
        return;
      }

      try {
        setLoading(true);
        const response = await get2FAStatus();
        const twoFa = response.data["2fa_status"] === "enabled" ? true : false;
        setIs2faEnabled(twoFa);
      } catch (err) {
        setIs2faEnabled(is2faEnabled);
        console.error("Error:", err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetch2FAStatus();
  }, []);

  const handleToggle2FA = async () => {
    const token = getToken();

    if (!token) {
      toast.error("You must be logged in to change 2FA status.");
      return;
    }

    try {
      setLoading(true);

      if (is2faEnabled) {
        const response = await disable2FA();

        if (response.data) {
          setIs2faEnabled(false);
          toast.success("2FA Disabled successfully");
        }
      } else {

        const response = await enable2FA();

        if (response.data) {
          setIs2faEnabled(true);
          toast.success("2FA Enabled successfully");
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <div className="text-gray-600 text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="text-center">
          {/* 2FA Status Display */}
          <div className="flex items-center justify-center mb-4">
            <span className="mr-3 text-sm md:text-xl font-semibold text-gray-800">
              2FA Status: {is2faEnabled ? "Enabled" : "Disabled"}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={is2faEnabled}
                onChange={handleToggle2FA}
              />
              <div
                className={`w-16 h-8 ${
                  is2faEnabled ? "bg-green-600" : "bg-gray-300"
                } rounded-full transition-all duration-500 ease-in-out shadow-md`}
              >
                <div
                  className={`w-8 h-8 bg-white border border-gray-400 rounded-full transition-all duration-500 ease-in-out transform ${
                    is2faEnabled ? "translate-x-8" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoFAStatus;
