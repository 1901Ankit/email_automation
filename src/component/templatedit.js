import React, { useState, useRef, useEffect } from "react";
import img1 from "../assests/image/3d.jpg";
import img2 from "../assests/image/3d.jpg";
import img3 from "../assests/image/3d.jpg";

const Editing = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const images = [
    { id: 1, src: img1, alt: "Image 1" },
    { id: 2, src: img2, alt: "Image 2" },
    { id: 3, src: img3, alt: "Image 3" },
  ];

  const handleImageClick = (src) => {
    setSelectedImage(src);
    setModalOpen(true);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleModalClose = () => setModalOpen(false);

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
      <div className="flex mt-4">
        <div className="w-6/12">
          <label htmlFor="dropdown">Editing template</label>
          <div className="relative" ref={dropdownRef}>
            <div
              id="dropdown"
              onClick={toggleDropdown}
              className="block text-start w-full mt-1 border border-[#93C3FD] rounded-md py-2 pl-3 text-gray-400 cursor-pointer"
            >
              See your saved template
            </div>
            {dropdownOpen && (
              <div className="absolute left-0 w-full bg-white border border-[#93C3FD] rounded-md mt-1 z-10">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleImageClick(image.src)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-10 h-10 object-cover mr-2"
                    />
                    <span>{image.alt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg mx-auto shadow-lg relative">
            <h2 className="text-xl font-bold mb-4 text-center">
              See your saved template
            </h2>
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full h-auto mb-4"
            />
            <button className="preview-button" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editing;
