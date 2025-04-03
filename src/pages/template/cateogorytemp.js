import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { templates } from "../../lib/data";
import JoditEditor from "jodit-react";
import * as templateAPI from "../../api/emailTemplate";
import { IoArrowBack } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import service1 from "../../assests/image/cate/Services1.png";
import service2 from "../../assests/image/cate/Services2.png";
const CategoryTemplates = () => {
  const { category } = useParams();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [templateContent, setTemplateContent] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [pendingSave, setPendingSave] = useState(false);
  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  const [modalSize, setModalSize] = useState({ width: "90%", height: "90%" });

  const [scale, setScale] = useState(1);

  // Handle responsive modal sizing
  useEffect(() => {
    const handleResize = () => {
      // Set appropriate modal size based on screen width
      if (window.innerWidth < 640) {
        // Mobile
        setModalSize({ width: "95%", height: "85%" });
        setScale(0.8);
      } else if (window.innerWidth < 1024) {
        // Tablet
        setModalSize({ width: "90%", height: "90%" });
        setScale(0.9);
      } else {
        // Desktop
        setModalSize({ width: "85%", height: "90%" });
        setScale(1);
      }
    };

    // Set initial size
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle preview click - show modal with HTML content
  const handlePreviewClick = (e, template) => {
    console.log("Preview clicked for template:", template);
    console.log("Template HTML:", template.html);
    e.stopPropagation();
    console.log("Preview clicked");
    setPreviewTemplate(template);

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closePreview = () => {
    setPreviewTemplate(null);
    // Restore body scrolling
    document.body.style.overflow = "auto";
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closePreview();
    }
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2));
  };

  // Handle zoom out
  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const filteredTemplates = useMemo(
    () => templates.filter((t) => t.category === category),
    [category]
  );

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setTemplateContent(template.html);
    setIsEditorModalOpen(true);
  };

  const handleNameSubmit = async () => {
    if (!templateName.trim()) {
      toast.error("Template name is required!");
      return;
    }
    setIsNameModalOpen(false);

    if (pendingSave) {
      try {
        const blob = new Blob([templateContent], { type: "text/html" });
        const formData = new FormData();
        formData.append("file", blob, "template.html");
        formData.append("name", templateName);

        await templateAPI.createHtmlTemplate(formData);
        toast.success("Template saved successfully!");
        handleCloseModals();
      } catch (error) {
        toast.error("Failed to save template");
        console.error("Error saving template:", error);
      } finally {
        setPendingSave(false);
      }
    }
  };

  const handleName = () => {
    setIsNameModalOpen(true);
  };
  const handleSaveTemplate = async () => {
    handleName();
    setPendingSave(true);
  };

  const handleCloseModals = () => {
    setIsNameModalOpen(false);
    setIsEditorModalOpen(false);
    setSelectedTemplate(null);
    setTemplateName("");
    setTemplateContent("");
  };

  return (
    <div className="container-fluid pt-32 max-h-[100vh] overflow-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {/* Heading */}
        <h1 className="text-xl md:text-3xl font-bold uppercase text-blue-600  ">
          {category}
        </h1>

        {/* Back Button */}
        <Link
          to="/template"
          className="inline-flex items-center gap-2 px-6 py-3 w-fit text-white bg-gradient-to-r from-blue-500 to-blue-600 
    rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl 
    transition-all duration-300 ease-in-out no-underline"
        >
          <IoArrowBack className="text-white text-2xl" />
          <span className="text-sm md:text-base font-medium">
            Back to Categories
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="relative w-full h-[380px]   rounded-md cursor-pointer   transition-all duration-300"
            onClick={() => handleEditTemplate(template)}
          >
             <button
  type="button"
  className="absolute top-2 right-20 bg-black hover:bg-gray-200 text-white 
             p-2 rounded-full shadow-md z-10 transition-all duration-300"
  onClick={(e) => handlePreviewClick(e, template)}
  aria-label="Preview template"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
</button>

            <div className="absolute h-full w-full overflow-y-hidden">
              <div
                dangerouslySetInnerHTML={{ __html: template.html }}
                className="w-full h-full"
              />
            </div>
            <button
              type="button"
              className="absolute bottom-5 left-1/2 transform -translate-x-1/2 p-2 shadow-md
             bg-gradient-to-r from-blue-500 to-blue-600 text-white 
             rounded-md text-center font-bold  
             hover:from-blue-600 hover:to-blue-700 hover:shadow-lg 
             transition-all duration-300"
            >
              Edit Template
            </button>
          </div>
        ))}
      </div>

      <Dialog
        open={isNameModalOpen}
        onClose={handleCloseModals}
        className="fixed inset-0 flex items-center z-50 justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Enter Template Name
          </h2>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={handleNameSubmit}
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              onClick={handleCloseModals}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={isEditorModalOpen}
        onClose={handleCloseModals}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  max-h-[100vh] overflow-auto"
      >
        <div className="bg-white p-6 rounded-lg w-full md:max-w-[60%] md:h-full h-fit overflow-hidden">
          {/* <h1 className="text-xl md:text-3xl font-bold uppercase">
            Template Name : {templateName}{" "}
          </h1> */}
          <div className="h-[70vh] overflow-y-auto">
            <JoditEditor
              value={templateContent}
              config={editorConfig}
              tabIndex={1}
              onBlur={setTemplateContent}
              onChange={setTemplateContent}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleSaveTemplate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
            <button
              onClick={handleCloseModals}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
      {previewTemplate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div
            className="bg-white rounded-lg shadow-xl flex flex-col max-h-full"
            style={{ width: modalSize.width, height: modalSize.height }}
          >
            {/* Modal Header */}
            <div className="p-2 sm:p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-base sm:text-lg font-medium truncate">
                {previewTemplate.title} - Preview
              </h3>
              <div className="flex items-center space-x-2">
                {/* Zoom controls */}
                <button
                  onClick={zoomOut}
                  className="text-gray-600 hover:text-gray-800 p-1 bg-gray-100 rounded-full"
                  aria-label="Zoom out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <button
                  onClick={zoomIn}
                  className="text-gray-600 hover:text-gray-800 p-1 bg-gray-100 rounded-full"
                  aria-label="Zoom in"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <button
                  onClick={closePreview}
                  className="text-gray-500 hover:text-gray-700 p-1 bg-gray-100 rounded-full"
                  aria-label="Close preview"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content - Image-like display */}
            <div className="flex-1 overflow-auto p-4 bg-gray-100">
              <div className="flex items-center justify-center min-h-full">
                <div
                  className="bg-white shadow-lg transform-gpu origin-center border"
                  style={{
                    transform: `scale(${scale})`,
                    transition: "transform 0.2s ease",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: previewTemplate.html }}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTemplates;
