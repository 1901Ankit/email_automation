import React, { useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { templates } from "../../lib/data";
import JoditEditor from "jodit-react";
import * as templateAPI from "../../api/emailTemplate";

const CategoryTemplates = ({ placeholder }) => {
  const { category } = useParams();
  const editor = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [finalTemplate, setFinalTemplate] = useState(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    [placeholder]
  );

  // Function to open modal with selected template
  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setFinalTemplate(template.html); // Ensure the editor starts with the correct content
    setModalOpen(true);
  };

  // Save the edited template
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

  // Filter templates based on the selected category
  const filteredTemplates = templates.filter((t) => t.category === category);

  return (
    <div className="container mx-auto pt-32">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Templates for {category}
      </h1>

      {/* Back Button */}
      <Link
        to="/template"
        className="inline-flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg shadow-lg 
        hover:from-violet-600 hover:to-purple-700 hover:shadow-xl transition-all duration-300 ease-in-out"
      >
        <span className="text-lg">←</span> Back to Categories
      </Link>

      {/* Modal for Editing Template */}
      {modalOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-[60%] max-h-[100vh] overflow-hidden">
            <div className="h-[70vh] overflow-y-auto">
              <JoditEditor
                ref={editor}
                value={finalTemplate} // Ensure editor starts with correct content
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

      {/* Templates Grid */}
      <div className="flex flex-wrap justify-between gap-4 mt-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="relative w-full sm:w-[48%] md:w-[48%] lg:w-[48%] xl:w-[48%] h-[380px] border rounded-md cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => handleEditTemplate(template)} // Open modal for selected template
          >
            <div className="absolute h-full w-full overflow-y-auto">
              <div
                dangerouslySetInnerHTML={{ __html: template.html }}
                className="w-full h-full"
              />
            </div>

            {/* Button with Template Title */}
            <button
              type="button"
              className="absolute bottom-5 left-[25%] w-1/2 bg-[#7b2cbf] 
              text-white py-2 mx-3 rounded-md text-center font-bold"
            >
              {template.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTemplates;
