import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login/page";
import Sender from "../pages/sender";
import Content from "../pages/detail";
import Preview from "../pages/Preview";
import Sidebar from "../pages/sidebar";
import Smtp from "../pages/smtp";
import Errorpage from "../pages/404";
import UserSelect from "../pages/userselect";

const Router = () => {
  const location = useLocation();
  const hideSidebarPaths = ["/", "/reset_password"];
  const is404 =
    location.pathname === "/404" ||
    !location.pathname.match(
      /^\/(home|detail|preview|smtp|reset_password).*$/
    );
  const isSidebarVisible =
    !hideSidebarPaths.includes(location.pathname) && !is404;

  return (
    <>
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/reset_password/*" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/sender" element={<Sender />} /> */}
          <Route path="/detail" element={<Content />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/smtp" element={<Smtp />} />
          {/* <Route path="/userselect" element={<UserSelect />} /> */}
          <Route path="/404" element={<Errorpage />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </div>
    </>
  );
};

export default Router;
