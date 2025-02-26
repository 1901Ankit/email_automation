import React, { useState, useEffect, useRef } from "react";
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
import { IoMdContacts } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi"; // Toggle button ke icons
import { LuLayoutTemplate } from "react-icons/lu";

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
      icon: <IoHomeOutline style={{ fontSize: "18px" }} />,
    },
    {
      name: "Plan",
      path: "/subscribe-plan",
      icon: <RiSendPlaneFill style={{ fontSize: "18px" }} />,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <IoMdContacts style={{ fontSize: "18px" }} />,
    },
    {
      name: "SMTP Setup",
      path: "/smtp",
      icon: <VscServerEnvironment style={{ fontSize: "18px" }} />,
    },
    {
      name: "Template",
      path: "/template",
      icon: <LuLayoutTemplate style={{ fontSize: "18px" }} />,
    },
    {
      name: "Campaigns",
      path: "/detail",
      icon: <BiMessageAltDetail style={{ fontSize: "18px" }} />,
    },
    {
      name: "Manage  Campaigns",
      path: "/manage-campaigns",
      icon: <BiMessageAltDetail style={{ fontSize: "18px" }} />,
    },

     

    {
      name: "Log out",
      path: "",
      icon: <AiOutlineLogin style={{ fontSize: "18px" }} />,
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

  const handleTabChange = async (index, subTabPath = null) => {
    if (index === tabs.length - 1) {
      try {
        const authToken = localStorage.getItem("access_token");
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/logout/`,
          {
            refresh: localStorage.getItem("refresh_token"),
            device_id: localStorage.getItem("device_id"),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(res)

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.clear();
        sessionStorage.clear();
        toast.success("Logout successfully");
        setIsAuthenticated(false);
        navigate("/");
      } catch (error) {
        console.log(error);
        
        toast.error(error.response.data.message);
      }
    } else {
      setActiveTabIndex(index);
      navigate(subTabPath || tabs[index].path);

      // 🔥 Close sidebar if on mobile
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
      ${isMobileMenuOpen ? "w-60" : "w-0 md:w-52"
          } overflow-hidden md:overflow-visible`}
      >
        <ul className="space-y-2 sidebar-menu">
          {tabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => handleTabChange(index)}
              className={`flex items-center gap-4 cursor-pointer p-2 rounded-lg transition-all font-semibold text-base
              ${activeTabIndex === index
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
