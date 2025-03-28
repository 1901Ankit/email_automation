import React, { useState, useRef, useMemo, useEffect } from "react";
import { templates } from "../../lib/data";
import JoditEditor from "jodit-react";
import * as templateAPI from "../../api/emailTemplate";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa"; // Import eye icon
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import Switch from "react-switch";

const Template = ({ placeholder }) => {
  const editor = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [finalTemplate, setFinalTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [allsavedTemp, setAllsavedTemp] = useState([]);
  const [selctedTemplate, setSeectedTemplate] = useState(null);
  const [selectedTemplateContent, setSelectedTemplateContent] = useState("");
  const [IsEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [isNameModalOpen, setisNameModalOpen] = useState(false);
  const [selectedteptab, setTelectedteptab] = useState("All Templates");
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [Loading, setIsLoading] = useState(false);
  const [Error, setError] = useState("");
  const handleCategoryClick = (category) => {
    navigate(`/template/${category}`);
  };
  const categories = ["All", ...new Set(templates.map((t) => t.category))];
  const groupedTemplates = templates.reduce((acc, template) => {
    const { category } = template;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(template);
    return acc;
  }, {});
  const displayedTemplates =
    selectedCategory === "All"
      ? groupedTemplates
      : { [selectedCategory]: groupedTemplates[selectedCategory] || [] };
  const handleModalSave = async () => {
    try {
      const htmlContent = finalTemplate;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const formData = new FormData();
      formData.append("file", blob, "template.html");
      await templateAPI.createHtmlTemplate(formData);
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };
  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );
  useEffect(() => {
    const getTemp = async () => {
      try {
        const res = await templateAPI.getUserSavedTemplates();
        console.log("res_for_saved_templets", res);
        setAllsavedTemp(res.data);
      } catch (error) {
        console.log("erroor", error);
      }
    };
    getTemp();
  }, []);
  const handleUpdateTemplate = async () => {
    console.log("hey");
    console.log("dsjhgf", selctedTemplate);
    try {
      const htmlContent = selectedTemplateContent;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const fileName = `${selctedTemplate.name}`;
      const formData = new FormData();
      formData.append("file", blob, fileName);
      formData.append("name", templateName);

      const response = await templateAPI.editHtmlTemplate(
        formData,
        selctedTemplate.id
      );
      toast.success(response.data.message);
      setIsEditorModalOpen(false);
      console.log("response", response);
    } catch (error) {
      console.log("eerrr", error);
    }
  };
  const processEmailHtml = (html) => {
    const bodyMatch = /<body[^>]*>([\s\S]*)<\/body>/i.exec(html);
    if (bodyMatch && bodyMatch[1]) {
      return bodyMatch[1].trim();
    }
    return html;
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );
  const loadTemplateFromUrl = async (url) => {
    setIsLoading(true);

    try {
      const response = await fetch(url);

      console.log("url", url);
      const htmlContent = await response.text();

      setSelectedTemplateContent(htmlContent);
    } catch (err) {
      console.error("Error loading template:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const EditHelper = (template) => {
    console.log("tempp", template);
    setisNameModalOpen(true);
    setSeectedTemplate(template);
    loadTemplateFromUrl(template.file_url);
  };

  // const loadTemplateFromUrl = async (url) => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch(url);

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch template: ${response.status} ${response.statusText}`);
  //     }

  //     const htmlContent = await response.text();
  //     console.log("htmlContent", htmlContent);
  //     setSelectedTemplateContent(htmlContent);
  //   } catch (err) {
  //     console.error('Error loading template:', err);
  //     setError(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleCloseModals = () => {
    setisNameModalOpen(false);
  };

  const handleNameSubmit = () => {
    if (!templateName.trim()) {
      toast.error("Template name is required!");
      return;
    }
    setisNameModalOpen(false);
    setIsEditorModalOpen(true);
  };

  const handleSaveTemplate = () => {};
  return (
    <div className="container-fluid pt-24 max-h-[100vh] overflow-auto">
      <div className="hsyw p-0">
        {/* Category Selector */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 w-full">
  <h1 className="text-2xl md:text-3xl font-bold uppercase">Templates</h1>

  <TabGroup className="w-full md:w-auto">
    <div className="flex flex-wrap items-center justify-center md:justify-between gap-2 md:gap-4 w-full">
      {/* Tabs */}
      <div className="flex items-center gap-3">
        <span
          className={`text-sm font-medium ${
            selectedteptab === "All Templates"
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          All Templates
        </span>
        <Switch
          checked={selectedteptab === "Saved Templates"}
          onChange={() => {
            const newValue =
              selectedteptab === "All Templates"
                ? "Saved Templates"
                : "All Templates";
            setTelectedteptab(newValue);
            if (newValue === "Saved Templates") {
              setSelectedCategory("All");
            }
          }}
          onColor="#48bb78" // green-500
          offColor="#f56565" // red-500
          handleDiameter={24}
          uncheckedIcon={false}
          checkedIcon={false}
          height={28}
          width={56}
          className="react-switch"
        />
        <span
          className={`text-sm font-medium ${
            selectedteptab === "Saved Templates"
              ? "text-green-500"
              : "text-gray-500"
          }`}
        >
          Saved Templates
        </span>
      </div>

      {/* Dropdown - Only Show When "All Templates" is Selected */}
      {selectedteptab === "All Templates" && (
        <div className="flex items-center gap-3 w-auto max-w-full sm:max-w-sm md:max-w-sm lg:max-w-lg">
          <label
            htmlFor="category-select"
            className="font-medium text-sm text-gray-700"
          ></label>
          <div className="relative w-full">
            <select
              id="category-select"
              className="px-3 py-2 pr-8 w-full text-center rounded-md cursor-pointer bg-white border-[1px]
              border-blue-500 text-blue-500 focus:border-blue-500 hover:border-blue-600
              transition-colors duration-300 focus:outline-none focus:ring-0 appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option
                  key={index}
                  value={category}
                  className="bg-white text-gray-900"
                >
                  {category === "All" ? "Select Category" : category}
                </option>
              ))}
            </select>
            {/* <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-blue-500">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div> */}
          </div>
        </div>
      )}
    </div>

    <TabPanels>{/* Tab Content */}</TabPanels>
  </TabGroup>
</div>

        {/* Templates by Category */}
        {selectedteptab == "All Templates" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(displayedTemplates).map(([category, templates]) => (
              <div key={category} className="bg-white p-6 shadow-lg rounded-lg">
                {/* Category Label */}
                <h2
                  className="text-xl font-bold text-gray-800 mb-4 cursor-pointer hover:text-blue-600 transition duration-300"
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category ? null : category
                    )
                  }
                >
                  {category} {expandedCategory === category}
                </h2>

                {/* Flex Layout for Templates */}

                <div className="flex flex-wrap justify-between gap-4">
                  {(expandedCategory === category
                    ? templates
                    : [templates[0]]
                  ).map((template) => (
                    <div
                      key={template.id}
                      className={`relative w-full h-[380px] border rounded-md cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 
          ${template.id === 0 ? "opacity-70  cursor-not-allowed" : ""}`}
                      onClick={() =>
                        template.id !== 0 &&
                        handleCategoryClick(template.category)
                      }
                    >
                      {/* Image */}
                      <img
                        src={template.image}
                        alt={template.title}
                        className="w-full h-full object-contain rounded-md"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FaEye className="text-white text-3xl mb-2" />
                        <p className="text-white text-lg font-semibold">
                          View Template
                        </p>
                      </div>

                      {/* Button with Template Title */}
                      <button
                        type="button"
                        className="absolute bottom-5 left-[25%] w-1/2 bg-gradient-to-r from-blue-700 to-blue-700 
          text-white py-2 mx-3 rounded-md text-center font-bold shadow-md hover:from-blue-700 hover:to-blue-700 hover:shadow-lg transition-all duration-300"
                        disabled={template.id === 0}
                      >
                        {template.title || "Custom"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedteptab == "Saved Templates" &&
          (allsavedTemp?.length == 0 ? (
            <div class="bg-white p-6 shadow-lg rounded-lg animate-pulse">
              <div class="flex-wrap justify-between grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="relative w-full h-[380px] border rounded-md">
                  <div class="w-full h-96 bg-gray-200">
                    <button
                      type="button"
                      class="relative bottom-5  w-1/3 bg-gray-300 
            text-white py-2 mx-3 rounded-md text-center font-bold "
                    >
                      <div class="h-4   rounded"></div>
                    </button>
                  </div>
                  {/* <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
        <div class="w-12 h-12 bg-gray-200 rounded-full mb-2"></div>
        <div class="w-full h-4 bg-gray-200 rounded mt-2 mb-4"></div>
      </div> */}
                  <button
                    type="button"
                    class="relative bottom-5 left-[25%] w-1/2 bg-blue-500 
            text-white py-2 mx-3 rounded-md text-center font-bold shadow-md"
                  >
                    <div class="h-4   rounded"></div>
                  </button>
                </div>
                <div class="relative w-full h-[380px] border rounded-md">
                  <div class="w-full h-96 bg-gray-200">
                    <button
                      type="button"
                      class="relative bottom-5  w-1/3 bg-gray-300 
            text-white py-2 mx-3 rounded-md text-center font-bold  "
                    >
                      <div class="h-4   rounded"></div>
                    </button>
                  </div>
                  {/* <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
        <div class="w-12 h-12 bg-gray-200 rounded-full mb-2"></div>
        <div class="w-full h-4 bg-gray-200 rounded mt-2 mb-4"></div>
      </div> */}
                  <button
                    type="button"
                    class="relative bottom-5 left-[25%] w-1/2 bg-blue-500 
            text-white py-2 mx-3 rounded-md text-center font-bold shadow-md"
                  >
                    <div class="h-4  rounded"></div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div key={""} className="bg-white p-6 shadow-lg rounded-lg ">
              {/* Flex Layout for Templates */}

              <div className=" flex-wrap justify-between  grid grid-cols-1 md:grid-cols-2 gap-8">
                {allsavedTemp?.map((template) => (
                  <div
                    key={template.id}
                    className="relative w-full h-[380px] border rounded-md cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 overflow-y-auto"
                    onClick={() => EditHelper(template)}
                  >
                    {/* Template Preview */}
                    <div className=" w-full overflow-auto">
                      <iframe
                        src={template.file_url}
                        title="Email Template"
                        width="100%"
                        height="400vh"
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          backgroundColor: "#fff",
                        }}
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FaEye className=" to-black text-3xl mb-2" />
                      <p className="text-black text-lg font-semibold">
                        View Template
                      </p>
                    </div>

                    {/* Button with Template Title */}
                    <button
                      type="button"
                      className="relative bottom-5 left-[25%] w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 
                text-white py-2 mx-3 rounded-md text-center font-bold shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-300"
                    >
                      {template.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Modal for Editing Template */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-[60%] max-h-[100vh] overflow-hidden">
            <div className="h-[70vh] overflow-y-auto">
              <JoditEditor
                ref={editor}
                value={selectedTemplate?.html}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => setFinalTemplate(newContent)}
                onChange={(newContent) => setFinalTemplate(newContent)}
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleModalSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={isNameModalOpen}
        onClose={handleCloseModals}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
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
              Next
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
        open={IsEditorModalOpen}
        onClose={handleCloseModals}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 max-h-[100vh] overflow-auto"
      >
        <div className="bg-white p-6 rounded-lg w-full md:max-w-[60%] md:h-full h-fit overflow-hidden">
          <h1 className="text-xl md:text-3xl font-bold uppercase mb-4">
            Template Name: {templateName}
          </h1>

          <div className="h-[70vh] overflow-y-auto">
            {Loading ? (
              <div className="flex justify-center items-center h-full">
                <p>Loading template content...</p>
              </div>
            ) : (
              <JoditEditor
                ref={editorRef}
                value={selectedTemplateContent}
                config={editorConfig}
                tabIndex={1}
                onBlur={(newContent) => setSelectedTemplateContent(newContent)}
                onChange={(newContent) =>
                  setSelectedTemplateContent(newContent)
                }
              />
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleUpdateTemplate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditorModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Template;
