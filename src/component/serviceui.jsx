import React from "react";
import analysis from "../../src/assests/image/analysis.png";
import multiple from "../../src/assests/image/multiple.png";
import real from "../../src/assests/image/real.png";
import custom from "../../src/assests/image/custom.png";
import smtp from "../../src/assests/image/smtp.png";
import campaign from "../../src/assests/image/campaign.png";
import factor from "../../src/assests/image/two-factor.png";
import manage from "../../src/assests/image/manage.png";
import background from "../assests/image/banner/serviceui.png";
const benefits = [
  {
    title: "Analytics",
    image: analysis,
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet..",
  },
  {
    title: "Multiple Contact Storage",
    image: multiple,
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    title: "Real Time Tracking",
    image: real,
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    title: "Custom Templates",
    image: custom,
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    title: "Multiple SMTP Server",
    image: smtp,
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    title: "Campaign Creation",
    image: campaign,
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    title: "Two Factor Authentication",
    image: factor,
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    title: "Manage Campaigns",
    image: manage,
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
];

const Service_ui = () => {
  return (
    <div
      className="relative container-fluid py-5 px-4 mx-auto "
      id="serviceui"
    >
      {/* Background Image */}
      <div
        className=" absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})`, zIndex: -1 }}
      ></div>

      {/* Content on top of Background */}
      <div className=" container mx-auto px-3 md:px-20 relative text-center">
        <h5 className="text-black font-bold text-3xl md:text-4xl mb-10 leading-snug tracking-tight">
          BENEFITS <span className="text-blue-500 mx-2">WE PROVIDE</span>
        </h5>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden p-3 border-2 border-[#338dfb] bg-opacity-90"
          >
            <div className="text-3xl text-blue-500 mb-3">
              <img src={benefit.image} className="w-14" />
            </div>

            {/* Title with horizontal lines */}
            <div className="flex items-start mb-4 justify-start">
              <h3 className="text-lg font-semibold text-gray-800">
                {benefit.title}
              </h3>
            </div>

            {/* Blue horizontal line below the title */}
            <div className="border-b-2 border-blue-500"></div>

            {/* Dynamic description */}
            <p className="text-gray-600 text-sm mt-2">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service_ui;
