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
import Subscribe from "../pages/subscribe-plan";
import User_profile from "../component/user-profile";
import Manage from "../component/manage";
import * as TokenAPI from "../api/user_profile";
import Contact from "../pages/contact";
import Textpreview from "../component/textpreview";
import Template from "../pages/template";
import CategoryTemplates from "../pages/template/cateogorytemp";
import Privacy from "../pages/subfooter/privacy";
import Terms_condition from "../pages/subfooter/terms";
import MangeCampaigns from "../pages/manage-campaigns/MangeCampaigns";
import Subject from "../pages/subject";
import Landing from "../pages/landingpage";
const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const isTokenBlackListed = async (user) => {
    const formData = new FormData();
    formData.append("refresh_token", localStorage.getItem("refresh_token"));
    try {
      const response = await TokenAPI.isTokenBlackListed(formData);
      if (response.status === 200) {
      } else {
        throw new Error("Token is not blacklisted");
      }
    } catch (error) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    }
  };
  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken !== "") {
      isTokenBlackListed();
    }
  }, [location.pathname]);

  useEffect(() => {
    console.log("Current pathname:", location.pathname);
    console.log("Token status:", token);

    if (!token) {
      if (location.pathname.startsWith("/reset_password")) {
        sessionStorage.clear();
        localStorage.clear();
      } else if (location.pathname !== "/login") {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/login"); // Redirect to /login if not already there
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
      !["/", "/404", "/login"].includes(path) &&
      !path.startsWith("/reset_password/")
    );
  };

  const shouldShowHeader =
    !["/", "/reset_password/:uidID/:token","/login"].includes(location.pathname) &&
    !location.pathname.startsWith("/reset_password");
  return (
    <>
      <div className="d-flex">
        {shouldShowHeader && <Header />}
        {isProtectedRoute(location.pathname) && <Sidebar />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset_password/:uidID/:token" element={<Login />} />
          <Route
            path="/home"
            element={token ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/Textpreview"
            element={token ? <Textpreview /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/detail"
            element={token ? <Content /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/preview/:id"
            element={token ? <Preview /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/subject"
            element={token ? <Subject /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/contact"
            element={token ? <Contact /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/smtp"
            element={token ? <Smtp /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/template"
            element={token ? <Template /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/manage-campaigns"
            element={token ? <MangeCampaigns /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/subscribe-plan"
            element={token ? <Subscribe /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/user-profile"
            element={token ? <User_profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/manage"
            element={token ? <Manage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/template/:category"
            element={
              token ? <CategoryTemplates /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/privacy_policy"
            element={token ? <Privacy /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/terms_condition"
            element={token ? <Terms_condition /> : <Navigate to="/login" replace />}
          />
          <Route path="/404" element={<Errorpage />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </div>
    </>
  );
};

export default Router;
