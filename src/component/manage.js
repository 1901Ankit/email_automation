import React, { useEffect, useState } from "react";
import {
  browserName,
  browserVersion,
  osName,
  osVersion,
  deviceType,
} from "react-device-detect";

const getUserEmail = () => "user@example.com";

const Manage = () => {
  const [loginTime, setLoginTime] = useState("");
  const [userEmail, setUserEmail] = useState(getUserEmail());
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const time = new Date().toLocaleString();
    setLoginTime(time);

    const storedDeviceInfo = localStorage.getItem("deviceInfo");

    if (storedDeviceInfo) {
      setDeviceInfo(JSON.parse(storedDeviceInfo));
    } else {
      const currentDeviceInfo = {
        browserName: browserName,
        browserVersion: browserVersion,
        operatingSystem: osName,
        osVersion: osVersion,
        deviceType: deviceType,
        loginTime: time,
      };
      setDeviceInfo(currentDeviceInfo);

      localStorage.setItem("deviceInfo", JSON.stringify(currentDeviceInfo));
    }
  }, []);

  const deviceData = [
    { label: "Browser Name", value: deviceInfo?.browserName },
    { label: "Browser Version", value: deviceInfo?.browserVersion },
    { label: "Operating System", value: deviceInfo?.operatingSystem },
    { label: "OS Version", value: deviceInfo?.osVersion },
    { label: "Device Type", value: deviceInfo?.deviceType },
    { label: "Login Time", value: deviceInfo?.loginTime },
  ];

  const renderInfoBox = (title, price, showDeviceInfo = false) => (
    <div className="w-full sm:w-1/3 flex-shrink-0 min-w-[330px] py-3 px-3">
      <div
        className="box relative flex flex-col h-full justify-start bg-white p-2 shadow-custom
       rounded-md border-t-8 border-b-8 border-[#7b2cbf] shadow-md shadow-[#7b2cbf]/90"
      >
        <div className="text-center">
          <span className="text-[#7b2cbf] font-bold text-[28px]">{title}</span>
          <div className="h-[2px] bg-[#7b2cbf] mt-2 mx-auto w-16"></div>
          <h3 className="text-center mt-3 font-bold text-[24px]">{price}</h3>
        </div>
        {showDeviceInfo && deviceInfo && (
          <ol className="mt-4 text-gray-700 space-y-2">
            {deviceData.map((item, index) => (
              <li key={index} className="text-start">
                {item.label}: {item.value}
              </li>
            ))}
          </ol>
        )}
        <div className="flex-grow"></div>
        <div className="mt-auto">
          <button
            type="button"
            className="font-montserrat text-[#f7fff7] border-none rounded-[20px] py-[7.5px] px-[50px] cursor-pointer inline-flex items-center bg-[#7b2cbf]"
          >
            BUY
          </button>
        </div>
      </div>
    </div>
  );
  const renderPlans = () => {
    const plans = [
      { title: "Basic", price: "₹4990 / onwards" },
      { title: "Standard", price: "₹5990 / onwards" },
      { title: "Premium", price: "₹6990 / onwards" },
    ];
    return plans.map((plan, index) => {
      return renderInfoBox(plan.title, plan.price, index === 0);
    });
  };

  return (
    <div className="container mx-auto pt-24 px-4 max-h-[100vh] overflow-auto">
      <div className="p-2">
        <h1 className="text-3xl font-bold">Manage Device</h1>
      </div>
      <div className="flex flex-nowrap w-full overflow-x-auto pricing">
        {renderPlans()}
      </div>
    </div>
  );
};

export default Manage;
