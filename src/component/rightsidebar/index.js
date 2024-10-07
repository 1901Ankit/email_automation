import React from "react";
import "./index.css";
const Rightside = ({ emailStatus }) => {
  console.log(emailStatus?.email_statuses[0].email);

  return (
    <div className="sidebarw d-flex mt-4 border-l">
      <h1 className="text-center stama mt-3">Email Status</h1>
      <div className="flex w-full">
        <p>Total email:<span>{emailStatus?.total_emails}</span></p>
        <p>Successful sent:{emailStatus?.successful_sends}</p>
        <p> Failed{emailStatus?.failed_sends}</p>

      </div>
      <div className="Email-status h-[80vh] overflow-y-auto">
        <ul className="Email-status">
          {emailStatus?.email_statuses?.map((item, i) => (
            <li key={i} className="Email-status1 ">
              <p className="ab">{item.email}</p>{" "}
              <p className={item.status == "Sent successfully" ? "status1" : item.status.includes("Failed to send") ? "status" : null}>
                {item.status == "Sent successfully" ? "Success" : item.status.includes("Failed to send") ? "Failed" : "try again"}
              </p>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default Rightside;
