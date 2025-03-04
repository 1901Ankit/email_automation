import wish from "../assests/image/wishi.png";
import instagram from "../assests/image/social/instagram.png";
import facebook from "../assests/image/social/facebook.png";
import linkedin from "../assests/image/social/linkdin.png";
import skype from "../assests/image/social/skype.png";
import trust from "../assests/image/trust/trust.svg";
import good from "../assests/image/trust/good.png";
import dm from "../assests/image/trust/dm.png";
import clutch from "../assests/image/trust/clutch.png";
import { PiPhoneCall } from "react-icons/pi";
import { TbMail } from "react-icons/tb";
import { Link } from "react-router-dom";
import Countries from "./countries";
const links = [
  { name: "Digital Marketing", url: "/digital-marketing-services" },
  { name: "SEO Optimization", url: "/seo-services" },
  { name: "PPC Advertising", url: "/pay-per-click-services" },
  { name: "Email Marketing", url: "/email-marketing-services" },
  { name: "Social Media Marketing", url: "/social-media-marketing-services" },
  { name: "Content Writing", url: "/content-writing-service" },
  { name: "Video Production", url: "/Video-Production-services" },
  { name: "E-commerce Marketing", url: "/ecommerce-marketing-services" },
  {
    name: "Analytics & Reporting",
    url: "/web-analytics-and-reporting-services",
  },
];

const services = [
  { name: "Web Development", url: "/web-development-services" },
  { name: "App Development", url: "/mobile-app-development-services" },
  { name: "Software Development", url: "/software-development-services" },
  { name: "Block Chain Development", url: "/blockchain-development-services" },
  { name: "Data Analysis", url: "/data-analysis-services" },
  { name: "Cyber Security", url: "/cyber-security-services" },
  { name: "UI & UX Designing", url: "/ui-ux-design-services" },
];

const Footerfile = () => {
  return (
    <footer className="text-black pt-8 relative">
      <div className="container-fluid ">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pb-12">
          {/* First Column */}
          <div className="col-span-1 sm:col-span-1 lg:border-r border-gray-300 px-2">
            <h3 className="text-2xl mb-8 font-semibold uppercase">
              <Link to="/">
                <img
                  src={wish}
                  alt="Wish Geeks Logo"
                  width={192}
                  height={75}
                  className="w-48"
                />
              </Link>
            </h3>
            <p className="text-base font-inter font-semibold cursor-pointer">
              Wish Geeks Techserve is one of the best software development &
              Digital Marketing company in India...
              <span>
                <br />
                <a href="/about" className="text-blue-900 no-underline">
                  {" "}
                  Read More...
                </a>
              </span>
            </p>
            <div className="mt-3">
              <p className="text-sm text-black-600 font-semibold">
                GSTN:{" "}
                <span className=" text-base font-bold">09AADCW8521A1ZH</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 items-center">
              <Link to="https://www.goodfirms.co/company/wish-geeks-techserve">
                <img src={good} className="h-auto w-24" alt="Trust Image" />
              </Link>
              <Link to="https://www.trustpilot.com/review/www.wishgeekstechserve.com">
                <img src={trust} className="h-auto w-24" alt="Trust Image" />
              </Link>
              <Link to="https://www.dmca.com/Protection/Status.aspx?id=417e248e-1bff-47ff-8efa-1e9e28d44061&refurl=https%3a%2f%2fwww.wishgeekstechserve.com%2f&rlo=true">
                <img src={dm} className="h-auto w-24" alt="Trust Image" />
              </Link>
              <Link to="https://clutch.co/profile/wish-geeks-techserve">
                <img src={clutch} className="h-auto w-20" alt="Trust Image" />
              </Link>
            </div>
          </div>
          {/* Second Column */}
          <div className="col-span-1 sm:col-span-1 lg:border-r border-gray-300 px-4">
            <h4 className="text-lg font-extrabold mb-4 uppercase">
              Digital Marketing
            </h4>
            <div className="">
              {links.map((link) => (
                <div key={link.name} className="py-2 flex items-center">
                  <Link to={link.url} className="no-underline">
                    <span className="text-black text-base hover:text-blue-700 font-semibold flex">
                      {link.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Third Column */}
          <div className="col-span-1 sm:col-span-1 lg:border-r border-gray-300 px-4">
            <h4 className="text-lg font-extrabold mb-4 uppercase">
              Development Services
            </h4>
            <div>
              {services.map((service) => (
                <div key={service.name} className="py-2 flex items-center">
                  <Link to={service.url} className="no-underline">
                    <span className="text-black text-base hover:text-blue-700 font-semibold">
                      {service.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Fourth Column */}
          <div className="col-span-1 sm:col-span-1 px-2">
            <h4 className="text-lg font-extrabold mb-4 uppercase">Contact</h4>
            <span className="text-base font-bold uppercase">
              HEADQUARTERED IN:
            </span>
            <p className="text-base font-inter font-semibold cursor-pointer mt-2">
              12A02 Tower C 13th Floor Iconic Corenthum Sector-62, Noida,
              <br />
              Uttar Pradesh India, 201301 <br />
              <br />
              <span className="font-semibold flex justify-start items-center">
                <PiPhoneCall className="text-[20px]" />
                <Link to="tel:+918009006321" className="no-underline">
                  <span className="text-black  ml-1 font-semibold no-underline">
                    +91 8009006321
                  </span>
                </Link>
              </span>
              <br />
              <span className="font-semibold flex justify-start items-center">
                <TbMail className="text-[20px]" />
                <Link to="mailto:info@wishgeekstechserve.com" className="no-underline">
                  <span className="text-black ml-1">
                    info@wishgeekstechserve.com
                  </span>
                </Link>
              </span>
            </p>

            <div className="flex items-center justify-around mt-5">
              <Link to="https://www.facebook.com/wishgeekstechserve">
                <img
                  src={facebook}
                  alt="facebook icon"
                  className="w-10 h-auto"
                />
              </Link>
              <Link to="https://www.instagram.com/wishgeekstechserve">
                <img
                  src={instagram}
                  alt="instagram icon"
                  className="w-10 h-auto"
                />
              </Link>
              <Link to="https://www.linkedin.com/company/wishgeekstechserve">
                <img
                  src={linkedin}
                  alt="linkedin icon"
                  className="w-10 h-auto"
                />
              </Link>
              <Link to="skype:live:.cid.73628076fa84e06f?call">
                <img src={skype} alt="Skype Logo" className="w-10 h-auto" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Countries/>

      <div
        className=" py-2 px-4"
        style={{
          backgroundColor: "rgb(35, 130, 220)",
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-around items-center text-white">
          <p className="text-xs uppercase text-center md:text-left mb-2 md:mb-0">
            Copyright ©
            <a href="/" className="font-extrabold mx-1 text-white no-underline">
              Wish Geeks Techserve
            </a>
            2024 All Rights Reserved
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end space-x-2">
            <a href="/terms-and-conditions" className="text-xs uppercase text-white no-underline">
              Terms & Conditions
            </a>
            <span className="hidden md:inline">|</span>
            <a href="/privacy-policy"  className="text-xs uppercase text-white no-underline">
              Privacy Policy
            </a>
            <span className="hidden md:inline">|</span>
            <a href="/refund-policy"  className="text-xs uppercase text-white no-underline">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footerfile;
