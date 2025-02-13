import React, { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <footer className="border-2 border-blue-500 shadow-xl sm:py-0 md:py-2 bg-[#3B82F6]">
      <div className="container-fluid mx-auto sm:px-0 md:px-4 ">
        <div className="flex flex-col md:flex-row items-center justify-between  text-center md:text-left">
          <div className="flex flex-row items-center justify-between gap-4 py-1">
            <span className="text-white text-xs md:text-sm font-semibold">
              <a href="/privacy_policy" className="text-white no-underline">
                Privacy Policy
              </a>
            </span>
            <span className="text-white text-xs md:text-sm font-semibold">
              <a href="/terms_codition" className="text-white no-underline">
                Terms & Conditions
              </a>
            </span>
          </div>

          <span className="text-white text-xs md:text-sm font-semibold mb-2 md:mb-0">
            Copyright ©{" "}
            <span className="font-semibold text-white">
              <a href="/" className="text-white no-underline text-sm">
                Wish Geeks Techserve
              </a>
            </span>
            <span className="mx-1">2025 All Rights Reserved</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
