import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contactui = () => {
  return (
    <div className="container mx-auto mt-5 px-4 md:px-20" id="contactui">
      <div className="flex flex-wrap mb-4">
        <div className="w-full sm:w-1/2 pr-8">
          <div>
            <h5 className="text-[#338DFB] font-extrabold text-2xl md:text-4xl mt-3 leading-snug tracking-tight">
              Enquiry Form
            </h5>
            <p className="block mt-4 mb-10 text-[#000] font-semibold w-10/12 text-base md:text-lg leading-snug tracking-tight">
              Please fill out the form below to submit your enquiry. We will get
              back to you as soon as possible.
            </p>
            <div className="container-fluid mt-4 p-0">
              <ul className="space-y-6">
                <li className="flex items-start md:items-center gap-4 md:gap-6">
                  <div className="min-w-[40px] h-10 flex items-center justify-center bg-[#338DFB] rounded-full">
                    <FaMapMarkerAlt className="text-white text-[20px]" />
                  </div>
                  <span className="text-[#828080] font-semibold text-base leading-6 md:leading-7">
                    12A02 Tower C 13th Floor, Iconic Corenthum, Sector-62,
                    Noida, UP, India - 201301
                  </span>
                </li>
                <li className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#338DFB] rounded-full">
                    <FaPhoneAlt className="text-white text-[20px]" />
                  </div>
                  <span className="text-[#828080] font-semibold text-base ">
                    <a
                      href="tel:+918009006321"
                      title="Give me a call"
                      className="text-[#828080] font-semibold text-base no-underline"
                    >
                      +91 8009006321
                    </a>
                  </span>
                </li>

                {/* Email */}
                <li className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#338DFB] rounded-full">
                    <FaEnvelope className="text-white text-[20px]" />
                  </div>
                  <span className="text-[#828080] font-semibold text-base ">
                    <a
                      href="mailto:Wishgeekstechserve.com"
                      title="Send me an email"
                      className="text-[#828080] font-semibold text-base no-underline"
                    >
                      Wishgeekstechserve.com{" "}
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 mt-5 md:mt-0 ">
          <form className="border-2 border-blue-300 shadow-lg shadow-blue-500 rounded-t-lg rounded-b-lg">
            <h5 className="text-black font-extrabold text-base md:text-xl leading-snug tracking-tight">
              Fill this form for Enquiry
            </h5>
            <div className=" mt-4">
              <div className="relative mb-6">
                <input
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="border-solid border-2 border-blue-300 rounded-lg pl-2  py-2 w-full"
                  required
                />
              </div>
              <div className="relative mb-6">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="border-solid border-2 border-blue-300 rounded-lg pl-2  py-2 w-full"
                  required
                />
              </div>
              <div className="relative mb-6">
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  className="border-solid border-2 border-blue-300 rounded-lg pl-2  py-2 w-full"
                  required
                  maxLength={10}
                />
              </div>
              <div className="relative mb-6">
                <input
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Subject"
                  className="border-solid border-2 border-blue-300 rounded-lg pl-2  py-2 w-full"
                  required
                />
              </div>

              <div className="relative mb-6">
                <textarea
                  rows="4"
                  cols="50"
                  type="text"
                  id="message"
                  name="message"
                  placeholder="Message"
                  className="border-solid border-2 border-blue-300 rounded-lg pl-2  py-2 w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#0094D3] text-white rounded-lg py-2 px-10 text-[1.2rem] font-bold w-full text-center flex items-center justify-center"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactui;
