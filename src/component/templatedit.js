import React, { useState, useRef, useEffect, useMemo } from "react";
import * as templateAPI from "../api/emailTemplate";
import img1 from "../assests/image/3d.jpg";
import img2 from "../assests/image/3d.jpg";
import img3 from "../assests/image/3d.jpg";
import ImageComponent from "./ImageComponent";
import html2canvas from 'html2canvas';
import DOMPurify from 'dompurify';
import { useNavigate } from "react-router-dom";
import EmailEditor from "./EmailEditor";

const Editing = ({ placeholder }) => {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const dropdownRef = useRef(null);
  const editor = useRef(null);
  const [selectedTemplatedDetails, setSelectedTemplatedDetails] = useState(null);

  const [imageURLs, setImageURLs] = useState({});
  const [htmlContents, setHtmlContents] = useState({});
  const [selectedTemplateKey, setSelectedTemplateKey] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedTemplateFileName, setSelectedTemplateFileName] = useState(JSON.parse(localStorage.getItem("key")) || null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typing...',
    }),
    [placeholder]
  );

  useEffect(() => {
    const generateImages = async () => {
      const newImageURLs = {};
      const htmlContents = {};

      for (const item of templates) {
        try {
          const response = await fetch(item.file_url);
          const html = await response.text();
          // const sanitizedHTML = DOMPurify.sanitize(html);
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;
          htmlContents[item.id] = html;
          document.body.appendChild(tempDiv);
          // Wait for all images to load
          const images = tempDiv.getElementsByTagName('img');
          const imageLoadPromises = Array.from(images).map((img) => {
            return new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = () => {
                console.error('Image failed to load:', img.src);
                resolve(); // Resolve even on error to continue
              };
            });
          });

          // Wait for all images to load
          await Promise.all(imageLoadPromises);
          await new Promise((resolve) => setTimeout(resolve, 100));
          // Use html2canvas to convert the div to an image
          const canvas = await html2canvas(tempDiv, { useCORS: true });
          newImageURLs[item.id] = canvas.toDataURL();

          document.body.removeChild(tempDiv);
        } catch (error) {
          console.log(error);
        }
      }
      setHtmlContents(htmlContents);
      setImageURLs(newImageURLs);
    };

    generateImages();
  }, [templates]);

  useEffect(() => {
    const fetchUserAllSavedTemplate = async () => {
      try {
        const response = await templateAPI.getSavedEmailTemplates();
        setTemplates(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserAllSavedTemplate();
  }, [viewModalOpen]);

  const handleImageClick = async (src, id) => {
    try {
      setSelectedImage(src);
      setSelectedTemplateId(id);
      setViewModalOpen(true);
      setDropdownOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

 

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="flex justify-between mt-4">
        <div className="w-6/12">
          <label htmlFor="dropdown">Saved template</label>
          <div className="relative" ref={dropdownRef}>
            <div
              id="dropdown"
              onClick={toggleDropdown}
              className="block text-start w-full mt-1 border border-[#93C3FD] rounded-md py-2 pl-3 text-gray-400 cursor-pointer"
            >
              See your saved template and choose one
            </div>
            {dropdownOpen && (
              <div className="absolute left-0 w-full bg-white border border-[#93C3FD] rounded-md mt-1 z-10 overflow-y-auto h-96">
                {templates.length < 1 ? (
                  <p className=" mt-5 text-center"> You have no saved template.</p>
                ) : (
                  <>
                    {templates.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 cursor-pointer hover:bg-gray-100 my-1"
                        onClick={() => {
                          handleImageClick(imageURLs[item.id], item.id);
                          setSelectedTemplateKey(item.name);
                          setSelectedTemplatedDetails(item)
                        }}
                      >
                        {/* Display the generated image */}
                        {imageURLs[item.id] ? (
                          <iframe
                            src={imageURLs[item.id]}
                            height={"100%"} width={"100%"}
                            // alt={item.name}
                            // style={{ width: "70%", height: '70%', margin: '0 auto' }}
                            className="mr-2"
                          />
                        ) : (
                          <div style={{ width: '100px', height: '200px', backgroundColor: '#f0f0f0' }} className="mr-2" />
                        )}
                        <hr />
                        <p>{item.name}</p>
                        <hr />
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="w-5/12 h-full ">
          <label> Selected template</label>
          <div
            className="block text-start w-full border border-red-700 mt-1 rounded-md py-2 pl-3 text-gray-600 font-bold"
          >
            {selectedTemplateFileName || "No template is selected"}
          </div>
        </div>
      </div>

      {viewModalOpen && (
        <EmailEditor selectedTemplatedDetails={selectedTemplatedDetails} setSelectedTemplatedDetails={setSelectedTemplatedDetails} setViewModalOpen={setViewModalOpen} />
      )}
    </div>
  );
};

export default Editing;