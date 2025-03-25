import React, { useEffect, useState } from "react";
import Linechart from "../../component/linechart";
import Barchart from "../../component/chart";
import Footer from "../../component/footer/footer";
import people from "../../assests/image/people.png";
import grph from "../../assests/image/grph.png";
import cube from "../../assests/image/cube.png";
import { useNavigate } from "react-router-dom";
import TokenAPI from "../../api/user_profile";

const Home = () => {
  const [emailStats, setEmailStats] = useState({
    total: 0,
    successful: 0,
    failed: 0,
  });

  useEffect(() => {
    const storedStats = JSON.parse(localStorage.getItem("emailStats"));
    if (storedStats) {
      setEmailStats(storedStats);
    }
  }, []);

  const emailData = [
    {
      id: 1,
      title: "Total Emails",
      count: emailStats.total_emails,
      image: grph,
    },
    {
      id: 2,
      title: "Successful Emails",
      count: emailStats.successful_sends,
      image: people,
    },
    {
      id: 3,
      title: "Failed Emails",
      count: emailStats.failed_sends,
      image: cube,
    },
  ];

  return (
    <div className="flex flex-col max-h-[100vh] overflow-auto w-full ">
      <div className="container-fluid pt-32 flex-grow overflow-auto">
        <div className="p-2">
          <h1 className="text-3xl font-bold uppercase">Analytics</h1>
        </div>

        <div className="mt-3">
          <div className="container-fluid mx-auto md:px-4 px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {emailData.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl shadow-xl ${
                    item.id === 1
                      ? "bg-blue-100 text-blue-600"
                      : item.id === 2
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">
                      {item.title}
                    </h2>
                    <img src={item.image} alt={item.title} className="w-10" />
                  </div>
                  <h3 className="text-3xl font-bold">{item.count}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <Barchart data={emailStats.labels || []} />
            </div>
            <div className=" w-full">
              <Linechart
                data={emailStats.lineChart || []}
                data1={emailStats.lineChart2022 || []}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
