import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const Textpreview = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    smtps: [],
  });
  const [details, setDetails] = useState({
    displayName: "",
    subject: "",
    delay_seconds: 0,
  });
  useEffect(() => {
    const retriedDetails = JSON.parse(sessionStorage?.getItem("details")) || {};
    const retriedOptions = JSON.parse(sessionStorage.getItem("options")) || {
      smtps: [],
    };

    setDetails(retriedDetails);
    setSelectedOptions(retriedOptions);
  }, []);

  return (
    <div className="container-fluid pt-32 max-h-[100vh] overflow-auto">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-black uppercase">Campaigns</h1>
      </div>
      <div className="overflow-x-auto mt-10">
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#7b2cbf] text-white">
              <tr>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                  Sender
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                  Recipient
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                  Display Name
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                  Time gap between each email (Seconds)
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                  Subject
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200 items-center justify-center">
              <tr>
                <td className="px-6 py-4 text-xs text-gray-500 border truncate text-center">
                  {selectedOptions.smtps}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 border truncate text-center">
                  {selectedOptions.smtps}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 border truncate text-center">
                  {details.displayName}{" "}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 border truncate text-center">
                  {details.delay_seconds}{" "}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 border truncate text-center">
                  {details.subject}{" "}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 border space-x-2 flex items-center justify-around">
                  <button className="text-blue-500 hover:text-blue-700 text-center">
                    <FaEdit
                      className="text-center"
                      style={{ fontSize: "20px" }}
                    />
                  </button>
                  <button className="text-red-500 hover:text-red-700 text-center">
                    <FaTrash
                      className="text-center"
                      style={{ fontSize: "20px" }}
                    />
                  </button>
                  <button className="text-black hover:text-black text-center">
                    <FaEye
                      className="text-center"
                      style={{ fontSize: "20px" }}
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Textpreview;
