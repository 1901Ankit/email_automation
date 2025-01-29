import React, { useState, useRef, useMemo } from "react";
import { templates } from "../../lib/data";
import JoditEditor from "jodit-react";
import * as templateAPI from "../../api/emailTemplate";
const Template = ({ placeholder }) => {
  const editor = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [finalTemplate, setFinalTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(templates.map((t) => t.category))];
  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((template) => template.category === selectedCategory);
  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setModalOpen(true);
  };
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
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );
  return (
    <div className="container-fluid pt-32 max-h-[100vh] overflow-auto">
      <div className=" hsyw p-0">
        {/* Category Selector */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Templates</h1>
          
          <select
            className="px-4 py-2 rounded-md cursor-pointer text-start bg-white border-[1px] border-violet-500 text-gray-800 
          focus:border-violet-500 transition-colors duration-300 focus:outline-none focus:ring-0 appearance-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option
                key={index}
                value={category}
                className={`${
                  category === selectedCategory
                    ? "bg-violet-600 text-white"
                    : "bg-transparent text-gray-800"
                }`}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
        {/* Templates by Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="relative mt-3 h-[380px] border rounded-md cursor-pointer"
              onClick={() => handleTemplateClick(template)}>
              <div className="absolute h-full w-full overflow-y-auto">
                <div
                  dangerouslySetInnerHTML={{ __html: template.html }}
                  className="w-full h-full" />
              </div>
              <button
                type="button"
                className="absolute bottom-5 left-[25%] w-1/2
                   bg-[#7b2cbf] text-white py-2 mx-3 rounded-md text-center font-bold">
                {template.title}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for Editing Template */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-[60%] max-h-[100vh] overflow-hidden">
            <div className="h-[70vh] overflow-y-auto">
              <JoditEditor
                ref={editor}
                value={selectedTemplate.html}
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
    </div>
  );
};

export default Template;
