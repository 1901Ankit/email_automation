import React, { memo, useState } from "react";
import { FaRegEye } from "react-icons/fa";

const CustomTooltip = ({ id, children, content, position }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="bg-blue-500 text-white p-2 rounded-md cursor-pointer flex items-center justify-center z-10 hover:bg-blue-600"
      >
        {children}
      </span>
      {visible && (
        <div
          id={id}
          className={`absolute ${position} left-1/2 transform -translate-x-1/2 mt-1 w-auto p-2 text-white rounded-lg shadow-lg z-20 bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

const MemoizedTooltipContent = memo(({ details }) => (
  <div className="bg-white text-blue-900 p-4 rounded-lg shadow-lg">
    <p className="border-b border-blue-200 pb-2 mb-2">
      <strong className="text-blue-600">Host:</strong> {details.host}
    </p>
    <p className="border-b border-blue-200 pb-2 mb-2">
      <strong className="text-blue-600">Port:</strong> {details.port}
    </p>
    <p className="border-b border-blue-200 pb-2 mb-2">
      <strong className="text-blue-600">Username:</strong> {details.username}
    </p>
    <p>
      <strong className="text-blue-600">Use TLS:</strong>{" "}
      {details.use_tls ? "Yes" : "No"}
    </p>
  </div>
));

const SMTPTooltipList = ({ selectedOptions, smtpDetailsByEmail }) => {
  return (
    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 border border-gray-300 rounded-md p-2 w-full">
      {selectedOptions?.smtps?.map((smtp, index) => {
        const details = smtpDetailsByEmail[smtp.label];
        return (
          <div
            key={index}
            className={`flex flex-col items-center p-4 border-gray-300 w-full text-center 
            ${index % 3 !== 0 ? "border-l" : ""} 
             `} 
          >
            <span className="text-sm font-medium mb-1 break-words">{smtp.label}</span>
            <div className="w-full my-1"></div>

            <CustomTooltip
              id={`tooltip-${smtp.label}`}
              content={
                details ? (
                  <MemoizedTooltipContent details={details} />
                ) : (
                  <p>No details available</p>
                )
              }
              position="top-full"
            >
              <FaRegEye size={18} />
            </CustomTooltip>
          </div>
        );
      })}
    </div>
  );
};

export default SMTPTooltipList;
