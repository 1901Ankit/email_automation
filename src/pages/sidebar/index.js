import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { GrCircleInformation } from "react-icons/gr";
import { BiMessageAltDetail } from "react-icons/bi";
import { VscPreview } from "react-icons/vsc";
import { VscServerEnvironment } from "react-icons/vsc";
import { IoHomeOutline } from "react-icons/io5";
import logo from "../../assests/image/wishi.png";
import { AiOutlineLogin } from "react-icons/ai";
import { toast } from "react-toastify";
import { LuSend } from "react-icons/lu";


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
      name: "Template Info",
      path: "/sender",
      icon: <GrCircleInformation style={{ fontSize: "24px" }} />,
    },
    {
      name: "Sender Info",
      path: "/userselect",
      icon: <LuSend  style={{ fontSize: "24px" }} />,
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
    return !!localStorage.getItem("authToken");
  }

  const handleTabChange = async (index) => {
    if (index === tabs.length - 1) {
      try {
        const authToken = localStorage.getItem("access_token");
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/logout/`,
          { refresh: localStorage.getItem("refresh_token") },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        toast.success(res.data.message);
        setIsAuthenticated(false);
        navigate("/ ");
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
      <div className="sidebar">
        <div className="logo-wrapper">
          <img src={logo} alt="Logo" />
        </div>
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
