import React from "react";
import { data } from "../../assests/data";
import Linechart from "../../component/linechart";
import Barchart from "../../component/chart";
import "./index.css";
// import Rightsidebar from "../../component/rightsidebar/index";


const Home = () => {

  return (
    <div className="container mx-auto pt-32 px-4 max-h-[100vh] overflow-auto">
      <div className="p-2">
        <h1 className="text-3xl font-bold uppercase">Analytics</h1>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <Barchart data={data.labels} />
          </div>
          <div className="w-full">
            <Linechart data={data.lineChart} data1={data.lineChart2022} />
          </div>
        </div>
        {/* <Rightsidebar /> */}
      </div>
    </div>
  );
};

export default Home;
