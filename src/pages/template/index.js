import React, { useState, useRef, useMemo } from "react";
import { templates } from "../../lib/data";
import JoditEditor from "jodit-react";
import * as templateAPI from "../../api/emailTemplate";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa"; // Import eye icon
const Template = ({ placeholder }) => {
  const editor = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [finalTemplate, setFinalTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const navigate = useNavigate();

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

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  return (
    <div className="container-fluid pt-24 max-h-[100vh] overflow-auto">
      <div className="hsyw p-0">
        {/* Category Selector */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold uppercase">Templates</h1>

          <select
            className="px-4 py-2 rounded-lg cursor-pointer bg-white border border-blue-500 text-gray-800 
  focus:border-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 
  shadow-md hover:shadow-lg appearance-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option
                key={index}
                value={category}
                className="bg-white text-gray-900"
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Templates by Category */}
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
                {category} {expandedCategory === category ? "▲" : "▼"}
              </h2>

              {/* Flex Layout for Templates */}

              <div className="flex flex-wrap justify-between gap-4">
                {(expandedCategory === category
                  ? templates
                  : [templates[0]]
                ).map((template) => (
                  <div
                    key={template.id}
                    className="relative w-full  h-[380px] border rounded-md cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => handleCategoryClick(template.category)}
                  >
                    {/* Template Preview */}
                    <div className="absolute h-full w-full overflow-y-auto">
                      <div
                        dangerouslySetInnerHTML={{ __html: template.html }}
                        className="w-full h-full"
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
                      className="absolute bottom-5 left-[25%] w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 
        text-white py-2 mx-3 rounded-md text-center font-bold shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-300"
                    >
                      {template.title}
                    </button>
                  </div>
                ))}
              </div>


              
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
    </div>
  );
};

export default Template;
