import React from "react";
import "./index.css";
const Rightside = ({ emailStatus }) => {


  return (
    <div className="sidebarw  pt-24  max-h-[100vh] overflow-auto d-flex  border-l">
      <h1 className="text-4xl font-bold mt-3 stama text-center">
        Email Status
      </h1>
      <div className="flex w-full justify-center">
        <p className="font-medium">
          Total email:<span className="mx-1">{emailStatus?.total_emails},</span>
        </p>
           <p className="font-medium">Successful sent:
        <span className="mx-1">
          {emailStatus?.successful_sends},
          </span>
          </p>
           <p className="font-medium"> Failed
        <span className="mx-1">{emailStatus?.failed_sends}
          </span>
        </p>
      </div>
      <div className="Email-status h-[80vh] overflow-y-auto">
        <ul className="Email-status justify-center text-center ">
          {emailStatus?.email_statuses?.map((item, i) => (
            <li key={i} className="Email-status1 ">
              <p className="ab">{item.email}</p>{" "}
              <p
                className={
                  item.status == "Sent successfully"
                    ? "status1"
                    : item.status.includes("Failed to send")
                    ? "status"
                    : null
                }
              >
                {item.status == "Sent successfully"
                  ? "Success"
                  : item.status.includes("Failed to send")
                  ? "Failed"
                  : "try again"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rightside;
