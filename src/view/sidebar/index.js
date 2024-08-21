import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import { GrCircleInformation } from "react-icons/gr";
import { BiMessageAltDetail } from "react-icons/bi";
import { VscPreview } from "react-icons/vsc";
import { VscServerEnvironment } from "react-icons/vsc";
import { IoHomeOutline } from "react-icons/io5";
import logo from "../../image/wishi.png";
import { AiOutlineLogin } from "react-icons/ai";

const Sidebar = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    {
      name: "Analytics",
      path: "/home",
      icon: <IoHomeOutline style={{ fontSize: "24px" }} />,
    },
    {
      name: "Information",
      path: "/sender",
      icon: <GrCircleInformation style={{ fontSize: "24px" }} />,
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
      path: "/Log_out",
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

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
    navigate(tabs[index].path);
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
