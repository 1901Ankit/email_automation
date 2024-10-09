import React, { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login/page";
import Content from "../pages/detail";
import Preview from "../pages/Preview";
import Sidebar from "../pages/sidebar";
import Smtp from "../pages/smtp";
import Errorpage from "../pages/404";
import Header from "../component/header/header";

const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      if (location.pathname.startsWith("/reset_password")) {
        sessionStorage.clear();
        localStorage.clear();
      } else {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
      }
    }
  }, [token, navigate, location.pathname]);

  useEffect(() => {
    if (
      token &&
      (location.pathname === "/" ||
        location.pathname.startsWith("/reset_password"))
    ) {
      navigate("/home");
    }
  }, [token, location.pathname, navigate]);

  const isProtectedRoute = (path) => {
    return (
      !["/", "/404"].includes(path) && !path.startsWith("/reset_password/")
    );
  };


  const shouldShowHeader =
    !["/", "/reset_password/:uidID/:token"].includes(location.pathname) &&
    !location.pathname.startsWith("/reset_password");

  return (
    <div className="d-flex">
      {shouldShowHeader && <Header />}
      {isProtectedRoute(location.pathname) && <Sidebar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset_password/:uidID/:token" element={<Login />} />
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/detail"
          element={token ? <Content /> : <Navigate to="/" replace />}
        />
        <Route
          path="/preview"
          element={token ? <Preview /> : <Navigate to="/" replace />}
        />
        <Route
          path="/smtp"
          element={token ? <Smtp /> : <Navigate to="/" replace />}
        />
        <Route path="/404" element={<Errorpage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </div>
  );
};

export default Router;
