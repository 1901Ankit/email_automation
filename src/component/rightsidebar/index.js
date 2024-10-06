import React from "react";
import "./index.css";
const Rightside = () => {
  return (
    <div className="sidebarw d-flex mt-4 border-l">
      <h1 className="text-center stama mt-3">Email Status</h1>
      <div className="Email-status h-[80vh] overflow-y-auto">
        <ul className="Email-status">
          <li className="Email-status1">
            <span className="ab">hel12@gmail.com</span>{" "}
            <p className="status">fail</p>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Rightside;
