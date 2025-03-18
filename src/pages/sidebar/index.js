import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import { BiMessageAltDetail } from "react-icons/bi";
import { VscServerEnvironment } from "react-icons/vsc";
import { IoHomeOutline } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoIosContacts } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { LuLayoutTemplate } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";
import { FaBullhorn } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
      name: "Manage Campaigns",
      path: "/manage-campaigns",
      icon: <FaBullhorn style={{ fontSize: "22px" }} />,
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Create Campaign",
          path: "/detail",
          icon: <FaRegSquarePlus style={{ fontSize: "18px" }} />,
        },
        {
          name: "View All Campaigns",
          path: "/manage-campaigns",
          icon: <BiMessageAltDetail style={{ fontSize: "18px" }} />,
        },
      ],
    },
    // {
    //   name: "Campaigns",
    //   path: "/detail",
    //   icon: <BiMessageAltDetail style={{ fontSize: "22px" }} />,
    // },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const index = tabs.findIndex((tab) => tab.path === currentPath);
    if (index !== -1) {
      setActiveTabIndex(index);
     
    }
  }, [location.pathname, tabs]);

  useEffect(() => {
    setIsAuthenticated(checkAuthentication());
  }, []);

  function checkAuthentication() {
    return !!localStorage.getItem("access_token");
  }

  const handleTabChange = (index) => {
    if (tabs[index].hasDropdown) {
      // Toggle dropdown - if it's already expanded, collapse it
      setExpandedTab(expandedTab === index ? null : index);
    } else {
      // For regular tabs, navigate to the path
      setActiveTabIndex(index);
      navigate(tabs[index].path);
      setExpandedTab(null);
      if (window.innerWidth < 768) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const handleDropdownItemClick = (tabIndex, itemPath) => {
    setActiveTabIndex(tabIndex);
    navigate(itemPath);
 
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="h-screen flex layout absolute md:relative">
      <div className="md:hidden z-50 items-center justify-end mx-2 mt-4">
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
        isMobileMenuOpen ? "w-60" : "w-0 md:w-56"
      } overflow-hidden md:overflow-visible`}
      >
        <ul className="space-y-2 sidebar-menu">
          {tabs.map((tab, index) => (
            <React.Fragment key={index}>
              <li
                onClick={() => handleTabChange(index)}
                className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition-all font-semibold text-[15px]
                ${
                  activeTabIndex === index && !tab.hasDropdown
                    ? "bg-[#3B82F6] text-white"
                    : expandedTab === index
                    ? "bg-gray-200"
                    : "hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.name}</span>
                </div>
                {tab.hasDropdown && (
                  <span className="text-xl">
                    {expandedTab === index ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </span>
                )}
              </li>

              {/* Dropdown items */}
              {tab.hasDropdown && expandedTab === index && (
                <div className=" mt-2 space-y-2">
                  {tab.dropdownItems.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      onClick={() => handleDropdownItemClick(index, item.path)} 
                      className={`flex items-center gap-3 cursor-pointer p-2 font-semibold rounded-lg text-sm transition-all
                      ${
                        location.pathname === item.path
                          ? "bg-[#3B82F6] text-white"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                    </li>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
