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
    title: "Advanced Analytics",
    image: analysis,
    description:
      "Get deep insights into your email campaign performance with detailed reports on open rates, click-through rates, bounce rates, and conversions. Our analytics help you track audience engagement, optimize email content, and improve future campaigns.",
  },
  {
    title: "Multiple Contact Storage",
    image: multiple,
    description:
      "Store and manage a large database of contacts efficiently. Our platform allows seamless segmentation and categorization, making it easier to personalize email campaigns and target specific customer groups.",
  },
  {
    title: "Real Time Tracking",
    image: real,
    description:
      "Monitor your emails in real-time to see when and where they are opened, which links are clicked, and how recipients interact with your messages. This data-driven approach helps refine marketing strategies for better engagement.",
  },
  {
    title: "Custom Templates",
    image: custom,
    description:
      "Save time and enhance branding with our professionally designed, ready-to-use email templates. Easily customize colors, fonts, and layouts to match your brand identity and create visually appealing emails.",
  },
  {
    title: "Multiple SMTP Server",
    image: smtp,
    description:
      "Increase email deliverability and reduce the risk of emails landing in spam folders. Our platform supports multiple SMTP servers, ensuring high email-sending efficiency and uninterrupted marketing campaigns.",
  },
  {
    title: "Campaign Creation",
    image: campaign,
    description:
      "Design and automate email campaigns effortlessly. Our intuitive campaign builder lets you create newsletters, promotional emails, and drip campaigns that align with your marketing goals.",
  },
  {
    title: "Two Factor Authentication",
    image: factor,
    description:
      "Secure your email marketing platform with an extra layer of protection. With two-factor authentication (2FA), unauthorized access is prevented, keeping your account and customer data safe.",
  },
  {
    title: "Manage Campaigns",
    image: manage,
    description:
      "Gain full control over your email marketing strategy. Schedule campaigns, track performance, automate follow-ups, and refine messaging—all from a single, easy-to-use dashboard.",
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
