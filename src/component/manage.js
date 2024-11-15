import React, { useEffect, useState } from "react";
import {
  browserName,
  browserVersion,
  osName,
  osVersion,
  deviceType,
} from "react-device-detect";

const Manage = () => {
  const [loginTime, setLoginTime] = useState("");
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
        // browserVersion: browserVersion,
        operatingSystem: osName,
        // osVersion: osVersion,
        // deviceType: deviceType,
        loginTime: time,
      };
      setDeviceInfo(currentDeviceInfo);

      localStorage.setItem("deviceInfo", JSON.stringify(currentDeviceInfo));
    }
  }, []);

  const deviceData = [
    { label: "Browser Name", value: deviceInfo?.browserName },
    // { label: "Browser Version", value: deviceInfo?.browserVersion },
    { label: "Operating System", value: deviceInfo?.operatingSystem },
    // { label: "OS Version", value: deviceInfo?.osVersion },
    // { label: "Device Type", value: deviceInfo?.deviceType },
    { label: "Login Time", value: deviceInfo?.loginTime },
  ];

  const renderInfoBox = (title, price, showDeviceInfo = false) => (
    <div className="w-full sm:w-1/3 flex-shrink-0 min-w-[250px] py-2 px-2">
      <div
        className="box relative flex flex-col h-full justify-start bg-white p-2 shadow-custom
         rounded-md border-t-4 border-b-4 border-[#7b2cbf] shadow-md shadow-[#7b2cbf]/70"
      >
        <div className="text-center">
          <span className="text-[#7b2cbf] font-bold text-[20px]">{title}</span>
          <div className="h-[2px] bg-[#7b2cbf] mt-1 mx-auto w-12"></div>
          <h3 className="text-center mt-2 font-semibold text-[18px]">
            {price}
          </h3>
        </div>
        {showDeviceInfo && deviceInfo && (
          <ol className="mt-3 text-gray-700 space-y-1 text-sm">
            {deviceData.map((item, index) => (
              <li key={index} className="text-start">
                {item.label}: {item.value}
              </li>
            ))}
          </ol>
        )}
        <div className="flex-grow"></div>
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            className="font-montserrat text-[#f7fff7] border-none rounded-lg py-1 px-3 cursor-pointer inline-flex items-center bg-[#7b2cbf]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  const renderPlans = () => {
    const plans = [
      { title: "Device 1" },
      { title: "Device 2" },
      { title: "Device 3" },
    ];
    return plans.map((plan, index) => {
      return renderInfoBox(plan.title, plan.price, index === 0);
    });
  };

  return (
    <div className="container mx-auto  px-4 max-h-[100vh] overflow-auto">
      <div className="flex flex-nowrap w-full overflow-x-auto pricing">
        {renderPlans()}
      </div>
    </div>
  );
};

export default Manage;
