import React from "react";

const Manage = () => {
  const newLocal = (
    <ol className="mt-4 list-decimal list-inside text-gray-700 space-y-2">
      <li className="text-start">Feature 1</li>
      <li className="text-start">Feature 2</li>
      <li className="text-start">Feature 3</li>
    </ol>
  );
  return (
    <div className="container mx-auto pt-24 px-4 max-h-[100vh] overflow-auto">
      <div className="p-2">
        <h1 className="text-3xl font-bold"> Manage Device</h1>
      </div>
      <div className="flex flex-nowrap w-full overflow-x-auto pricing">
        <div className="w-full sm:w-1/3 flex-shrink-0 min-w-[330px] py-3 px-4">
          <div
            className="box relative flex flex-col h-full justify-start bg-white p-10 shadow-custom rounded-md border-t-8 border-b-8
   border-[#7b2cbf] shadow-md shadow-[#7b2cbf]/90"
          >
            <div className="text-center">
              <span className="text-[#7b2cbf] font-bold text-[28px]">
                Basic
              </span>
              <div className="h-[2px] bg-[#7b2cbf] mt-2 mx-auto w-16"></div>
              <h3 className="text-center mt-3 font-bold text-[24px]">
                ₹4990 / onwards
              </h3>
            </div>
            {newLocal}
            <div className="flex-grow"></div>
            <div className="mt-auto">
              <button
                type="button"
                className="font-montserrat text-[#f7fff7] border-none rounded-[20px] py-[7.5px] px-[50px] cursor-pointer 
        inline-flex items-center bg-[#7b2cbf]"
              >
                BUY
              </button>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/3 flex-shrink-0 min-w-[330px] py-3 px-4">
          <div
            className="box relative flex flex-col h-full justify-start bg-white p-10 shadow-custom rounded-md 
  border-t-8 border-b-8 border-[#7b2cbf] shadow-md shadow-[#7b2cbf]/90"
          >
            <div className="text-center">
              <span className="text-[#7b2cbf] font-bold text-[28px]">
                Basic
              </span>
              <div className="h-[2px] bg-[#7b2cbf] mt-2 mx-auto w-16"></div>
              <h3 className="text-center mt-3 font-bold text-[24px]">
                ₹4990 / onwards
              </h3>
            </div>
            <ol className="mt-4 list-decimal list-inside text-gray-700 space-y-2">
              <li className="text-start">Feature 1</li>
              <li className="text-start">Feature 2</li>
              <li className="text-start">Feature 3</li>
            </ol>
            <div className="flex-grow"></div>
            <div className="mt-auto">
              <button
                type="button"
                className="font-montserrat text-[#f7fff7] border-none rounded-[20px] py-[7.5px] px-[50px] 
        cursor-pointer inline-flex items-center bg-[#7b2cbf]"
              >
                BUY
              </button>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/3 flex-shrink-0 min-w-[330px] py-3 px-4">
          <div
            className="box relative flex flex-col h-full justify-start bg-white p-10 shadow-custom rounded-md border-t-8 
  border-b-8 border-[#7b2cbf] shadow-md shadow-[#7b2cbf]/90"
          >
            <div className="text-center">
              <span className="text-[#7b2cbf] font-bold text-[28px]">
                Basic
              </span>
              <div className="h-[2px] bg-[#7b2cbf] mt-2 mx-auto w-16"></div>
              <h3 className="text-center mt-3 font-bold text-[24px]">
                ₹4990 / onwards
              </h3>
            </div>
            <ol className="mt-4 list-decimal list-inside text-gray-700 space-y-2">
              <li className="text-start">Feature 1</li>
              <li className="text-start">Feature 2</li>
              <li className="text-start">Feature 3</li>
            </ol>
            <div className="flex-grow"></div>

            <div className="mt-auto">
              <button
                type="button"
                className="font-montserrat text-[#f7fff7] border-none rounded-[20px] py-[7.5px] px-[50px] cursor-pointer
         inline-flex items-center bg-[#7b2cbf]"
              >
                BUY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manage;
