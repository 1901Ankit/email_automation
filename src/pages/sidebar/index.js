import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { BiMessageAltDetail } from "react-icons/bi";
import { VscPreview } from "react-icons/vsc";
import { VscServerEnvironment } from "react-icons/vsc";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineLogin } from "react-icons/ai";
import { toast } from "react-toastify";
import { RiSendPlaneFill } from "react-icons/ri";

const Sidebar = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthentication());
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    {
      name: "Analytics",
      path: "/home",
      icon: <IoHomeOutline style={{ fontSize: "24px" }} />,
    },
    {
      name: "Plan",
      path: "/subscribe-plan",
      icon: <RiSendPlaneFill style={{ fontSize: "24px" }} />,
    },
    {
      name: "SMTP Setup",
      path: "/smtp",
      icon: <VscServerEnvironment style={{ fontSize: "24px" }} />,
    },
    {
      name: "Content",
      path: "/detail",
      icon: <BiMessageAltDetail style={{ fontSize: "24px" }} />,
    },

    {
      name: "Preview",
      path: "/preview",
      icon: <VscPreview style={{ fontSize: "24px" }} />,
    },
    {
      name: "Log out",
      path: "",
      icon: <AiOutlineLogin style={{ fontSize: "24px" }} />,
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const index = tabs.findIndex((tab) => tab.path === currentPath);
    if (index !== -1) {
      setActiveTabIndex(index);
    } else {
      setActiveTabIndex(0);
    }
  }, [location.pathname, tabs]);

 


  useEffect(() => {
    
    setIsAuthenticated(checkAuthentication());
  }, []);

  function checkAuthentication() {
    return !!localStorage.getItem("access_token");
  }

  const handleTabChange = async (index) => {
    if (index === tabs.length - 1) {
      try {
        const authToken = localStorage.getItem("access_token");
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/logout/`,
          { refresh: localStorage.getItem("refresh_token"), device_id: localStorage.getItem("device_id")},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("id");
        localStorage.clear();
        sessionStorage.clear();
        toast.success("Logout successfully");
        setIsAuthenticated(false);
        navigate("/");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      setActiveTabIndex(index);
      navigate(tabs[index].path);
    }
  };

  return (
    <div className="layout">
      <div className="flex flex-col sidebar shadow-lg">
        {/* <div className="logo-wrapper">
          <img src={logo} alt="Logo" />
        </div> */}
        <ul className="sidebar-menu">
          {tabs.map((tab, index) => (
            <li key={index}>
              <div
                className={`nav-link ${
                  activeTabIndex === index ? "active" : ""
                }`}
                onClick={() => handleTabChange(index)}
              >
                <span className="icon">{tab.icon}</span>
                {tab.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
