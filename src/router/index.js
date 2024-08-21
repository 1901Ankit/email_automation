import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../view/home";
import Login from "../view/login/page";
import Sender from "../view/sender";
import Content from "../view/detail";
import Preview from "../view/Preview";
import Sidebar from "../view/sidebar";
import Smtp from "../view/smtp";
// import Header from "../view/component/header/header";


const Router = () => {
  const location = useLocation();

  return (
    <>
   {/* <Header/> */}
      <div className="d-flex">
        {location.pathname !== "/" && <Sidebar />}

        <Routes>
          <Route exact path="/" element={<Login />} />{" "}
          <Route path="/home" element={<Home />} />
          <Route path="/sender" element={<Sender />} />
          <Route path="/detail" element={<Content />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/smtp" element={<Smtp />} />
        </Routes>
      </div>
    </>
  );
};

export default Router;
