import React from "react";

const EmailStats = ({ emailStats }) => {
  return (
    <div className="mt-6 container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Successful Emails */}
        <div className="p-6 rounded-2xl shadow-xl bg-green-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Successful Emails
            </h2>
          </div>
          <h3 className="text-3xl font-bold text-green-600">
            {emailStats.successful}
          </h3>
        </div>

        {/* Failed Emails */}
        <div className="p-6 rounded-2xl shadow-xl bg-red-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Failed Emails
            </h2>
          </div>
          <h3 className="text-3xl font-bold text-red-600">
            {emailStats.failed}
          </h3>
        </div>

        {/* Total Emails */}
        <div className="p-6 rounded-2xl shadow-xl bg-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Total Emails
            </h2>
          </div>
          <h3 className="text-3xl font-bold text-blue-600">
            {emailStats.total}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default EmailStats;
