import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { templates } from "../../lib/data";
import JoditEditor from "jodit-react";
import * as templateAPI from "../../api/emailTemplate";
import { IoArrowBack } from "react-icons/io5";
import { toast, Toaster } from "react-hot-toast";
import { Dialog } from "@headlessui/react";

const CategoryTemplates = () => {
  const { category } = useParams();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [templateContent, setTemplateContent] = useState("");
  const [templateName, setTemplateName] = useState("");

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  const filteredTemplates = useMemo(
    () => templates.filter((t) => t.category === category),
    [category]
  );

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setTemplateContent(template.html);
    setIsNameModalOpen(true);
  };

  const handleNameSubmit = () => {
    if (!templateName.trim()) {
      toast.error("Template name is required!");
      return;
    }
    setIsNameModalOpen(false);
    setIsEditorModalOpen(true);
  };

  const handleSaveTemplate = async () => {
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
    }
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
      <Toaster />

      <div className="flex flex-col gap-6 mb-8">
        <h1 className="text-xl md:text-3xl font-bold uppercase">
          Templates for {category}
        </h1>

        <Link
          to="/template"
          className="inline-flex items-center gap-2 px-4 py-2 w-fit text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg 
          hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transition-all duration-300 ease-in-out no-underline"
        >
          <IoArrowBack className="text-white text-2xl" />
          Back to Categories
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="relative w-full h-[380px] border rounded-md cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => handleEditTemplate(template)}
          >
            <div className="absolute h-full w-full overflow-y-auto">
              <div
                dangerouslySetInnerHTML={{ __html: template.html }}
                className="w-full h-full"
              />
            </div>
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
        open={isEditorModalOpen}
        onClose={handleCloseModals}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  max-h-[100vh] overflow-auto"
      >
        <div className="bg-white p-6 rounded-lg w-full md:max-w-[60%] md:h-full h-fit overflow-hidden">
          <h1 className="text-xl md:text-3xl font-bold uppercase">
            Template Name : {templateName}{" "}
          </h1>
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
              Save
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
    </div>
  );
};

export default CategoryTemplates;
