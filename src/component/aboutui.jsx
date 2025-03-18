import React from "react";
import mail from "../assests/image/banner/mail.webp";
import gmail from "../assests/image/banner/gmail.webp";
import thunderbird from "../assests/image/banner/thunderbird.webp";
import location from "../assests/image/banner/location.webp";
import user from "../assests/image/banner/user.webp";
import about from "../assests/image/banner/about.webp";
const About_ui = () => {
  return (
    <div className="container mx-auto md:py-8  px-3 md:px-20" id="aboutui">
      <div className="row justify-center items-center">
        <div className="col-sm-6 pr-10">
          <h5 className="text-black font-bold text-3xl md:text-4xl mt-3 leading-snug tracking-tight">
            ABOUT <span className="text-blue-500 mx-2">US</span>
          </h5>
          <p className="text-medium text-black mt-3 text-sm md:text-lg text-justify">
            At Wish Geeks Techserve, we merge innovation, technology, and
            strategic planning to offer exceptional digital marketing solutions.
            Our approach blends creative thinking with cutting-edge technology
            to craft effective marketing strategies that drive results. By
            integrating these elements, we deliver high-quality services that
            cater to our clients' unique needs and help them achieve their
            marketing goals.
          </p>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <p className="w-9/12 text-justify font-semibold">
                Email Marketing
              </p>
              <p className="w-9/12 text-justify font-semibold">Track changes</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="w-9/12 text-justify font-semibold">
                Email Automation
              </p>
              <p className="w-9/12 text-justify font-semibold">
                Inbuilt templates
              </p>
            </div>
          </div>

          {/* Learn More Button */}
          <button className="border border-blue-500 rounded-lg p-2 font-semibold flex items-center justify-center cursor-pointer bg-white text-blue-500 w-4/12 mt-3">
            Learn More
          </button>
        </div>
        <div
          className="col-sm-6 mt-5 pl-10"
          style={{
            background: "linear-gradient(-65deg, #f9f9f9 74%, transparent 74%)",
          }}
        >
          <div className="flex justify-end items-center">
            <img
              src={about}
              className="w-[50%] h-full object-cover relative z-30 -mb-28"
              alt="About Us"
            />
          </div>
          <div className="w-10/12 p-4 cursor-grab relative flex items-center gap-4">
            <div className="relative flex flex-col h-full justify-between p-4 rounded-md shadow-lg bg-white z-20 w-full">
              <div className="flex flex-col items-start text-start">
                <img
                  src={user}
                  className="w-16 h-full object-cover"
                  alt="User"
                />
                <h2 className="text-[#1877F3] font-semibold text-lg mt-2">
                  Email Automation
                </h2>
                <span className="text-[#494a4d] font-normal text-sm leading-tight tracking-tight">
                  Use the data you have to power advanced automations
                </span>
              </div>
            </div>
          </div>

          <div className="w-10/12 p-4 cursor-grab relative flex items-center gap-4">
            <div className="relative flex flex-col h-full justify-between p-4 rounded-md shadow-lg bg-white z-20 w-full">
              <div className="flex flex-col items-start text-start">
                <img
                  src={location}
                  className="w-16 h-full object-cover"
                  alt="User"
                />
                <h2 className="text-[#1877F3] font-semibold text-lg mt-2">
                  Real-Time Tracking
                </h2>
                <span className="text-[#494a4d] font-normal text-sm leading-tight tracking-tight">
                  Accelerating your business and raising the bar.
                </span>
              </div>
            </div>
          </div>
          {/* <div className=" gap-4 justify-center items-center mt-5">
                <img src={mail} className="w-10 h-full object-contain" />
                <img src={thunderbird} className="w-10 h-full object-contain" />
                <img src={gmail} className="w-10 h-full object-contain" />
              </div> */}
        </div>
      </div>
    </div>
  );
};

export default About_ui;
