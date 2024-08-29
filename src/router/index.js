import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login/page";
import Sender from "../pages/sender";
import Content from "../pages/detail";
import Preview from "../pages/Preview";
import Sidebar from "../pages/sidebar";
import Smtp from "../pages/smtp";

const Router = () => {
  const location = useLocation();

  return (
    <>
      <div className="d-flex">
      {location.pathname !== "/" && 
      !location.pathname.includes("reset_password") && <Sidebar />}
        
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/reset_password/*" element={<Login />} />
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
