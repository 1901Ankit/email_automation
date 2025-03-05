import { useState } from "react";
import { ChevronUp, LogOut } from "lucide-react";

const extractSystemInfo = (systemInfo) => {
  const parts = systemInfo.split(", ");
  return {
    browser: parts[0] && parts[0] !== "" ? parts[0] : "Unknown Browser",
    os: parts[1] && parts[1] !== "" ? parts[1] : "Unknown OS",
    date: parts[2] && parts[2] !== "" ? parts[2] : "Unknown Date",
    time: parts[3] && parts[3] !== "" ? parts[3] : "Unknown Time",
  };
};

const DeviceInfoCard = ({ device }) => {
  console.log("devv",device)
  const [expanded, setExpanded] = useState(false);
  const { browser, os, date, time } = extractSystemInfo(device.system_info);

  return (
    <div className="border border-blue-300 rounded-lg p-4 w-full max-w-md mx-auto bg-white shadow-md">
      <div className="flex items-center justify-between space-x-4">
        {/* Device Icon */}
        <div className="flex items-center space-x-3">
          <img
            src="https://cdn.pixabay.com/photo/2016/04/13/14/27/google-chrome-1326908_1280.png" // Replace with actual icon path
            alt="Laptop Icon"
            className="w-10 h-10"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{os}</span>
              <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-md">
  {localStorage.getItem("device_id") === device.device_id && (
        <span className="absolute -top-2 left-0 text-sm text-green-500 font-semibold">
          Current
        </span>
      )}
              </span>
            </div>
            <p className="text-sm text-gray-600">{browser}</p>
            <p className="text-sm text-gray-600">{device.device_name}</p>
            <p className="text-sm text-gray-600">{date} at {time}</p>
          </div>
        </div>
        
        {/* Logout Button & Chevron */}
        <div className="flex flex-col items-center space-y-2">
          <button
            className="p-2 rounded-full text-red-500 hover:bg-red-100"
          >
            <LogOut className="w-5 h-5" />
          </button>
          {/* <button onClick={() => setExpanded(!expanded)}>
            <ChevronUp className={`w-5 h-5 text-gray-400 cursor-pointer transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DeviceInfoCard;