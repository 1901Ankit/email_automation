import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import { BiMessageAltDetail } from "react-icons/bi";
import { VscServerEnvironment } from "react-icons/vsc";
import { IoHomeOutline } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoIosContacts } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi"; // Toggle button ke icons
import { LuLayoutTemplate } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";
import { FaBullhorn } from "react-icons/fa";

const Sidebar = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthentication());
  const [expandedTab, setExpandedTab] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    {
      name: "Analytics",
      path: "/home",
      icon: <IoHomeOutline style={{ fontSize: "22px" }} />,
    },
    {
      name: "Plan",
      path: "/subscribe-plan",
      icon: <RiSendPlaneFill style={{ fontSize: "22px" }} />,
    },
    {
      name: "Subject",
      path: "/subject",
      icon: <GiNotebook style={{ fontSize: "22px" }} />,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <IoIosContacts style={{ fontSize: "22px" }} />,
    },
    {
      name: "SMTP Setup",
      path: "/smtp",
      icon: <VscServerEnvironment style={{ fontSize: "22px" }} />,
    },
    {
      name: "Template",
      path: "/template",
      icon: <LuLayoutTemplate style={{ fontSize: "22px" }} />,
    },
    {
      name: "Manage  Campaigns",
      path: "/manage-campaigns",
      icon: <FaBullhorn  style={{ fontSize: "22px" }} />,
    },
    {
      name: "Campaigns",
      path: "/detail",
      icon: <BiMessageAltDetail style={{ fontSize: "22px" }} />,
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

  const handleTabChange = (index, subTabPath = null) => {
    if (index === tabs.length - 0) {
      return;
    } else {
      setActiveTabIndex(index);
      navigate(subTabPath || tabs[index].path);

      if (window.innerWidth < 768) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const toggleExpand = (index) => {
    setExpandedTab(expandedTab === index ? null : index);
  };

  return (
    <div className="h-screen flex layout absolute md:relative">
      <div className="md:hidden  z-50 items-center justify-end mx-2 mt-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 border-2 border-[#3B82F6] text-[#3B82F6] rounded-md"
        >
          {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      <div
        className={`bg-gray-100 h-full shadow-lg fixed md:static transition-all duration-300 sidebar z-10
      ${
        isMobileMenuOpen ? "w-60" : "w-0 md:w-52"
      } overflow-hidden md:overflow-visible`}
      >
        <ul className="space-y-2 sidebar-menu">
          {tabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => handleTabChange(index)}
              className={`flex items-center gap-4 cursor-pointer p-2 rounded-lg transition-all font-semibold text-base
              ${
                activeTabIndex === index
                  ? "bg-[#3B82F6] text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="">{tab.name}</span>{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
