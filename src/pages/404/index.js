import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FcHome } from "react-icons/fc";

const Errorpage = () => {
  return (
    <div className="container p-0 ">
      <div className="page_404">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>

                <p>The page you are looking for not avaible!</p>
                <p>
                  {" "}
                  Please click the button below to go back to the homepage.
                </p>
                <div className="mt-1 flex justify-center ">
                  <Link to={"/"}>
                    <button
                      type="submit"
                      className="bg-[#7b2cbf] text-white px-4 py-2 rounded mt-2 transition-colors duration-300 flex items-center gap-2 text-decoration-line: none;"
                    >
                      Home
                      <FcHome
                        style={{
                          fontSize: "20px",
                        }}
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Errorpage;
