import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import * as templateAPI from "../api/emailTemplate";
const EmailEditor = ({
  selectedTemplatedDetails,
  setViewModalOpen,
  setSelectedTemplatedDetails,
  placeholder,
}) => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [finalTemplate, setFinalTemplate] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

    useEffect(() => {
        const getHTMLtemplate = async () => {
            if (!selectedTemplatedDetails) return;
            try {
                const response = await fetch(selectedTemplatedDetails.file_url);
                const html = await response.text();
                setSelectedTemplate(html);
            } catch (error) {
                alert("Sorry Please Try Again!")
            }
        }
        getHTMLtemplate();
    }, [selectedTemplatedDetails])


  const handleImageClickEditorOpen = () => {
    setIsEditorOpen(true);
  };
  const handleUpdateTemplate = async () => {
    try {
      const htmlContent = finalTemplate;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const fileName = `${selectedTemplatedDetails.name}.html`;
      //   const templateName =
      const formData = new FormData();
      formData.append("file", blob, fileName);
      

      const response = await templateAPI.editHtmlTemplate(
        formData,
        selectedTemplatedDetails.id
      );
      console.log("response", response);
      setSelectedTemplatedDetails(null);
   
      setViewModalOpen(false);
    } catch (error) {

    }
  };
  const handleModalClose = () => setIsEditorOpen(false);
  const handelSelectTemplate = () => {
    sessionStorage.setItem(
      "key",
      JSON.stringify(selectedTemplatedDetails.name)
    );
    setViewModalOpen(false);
    setIsEditorOpen(false);
  };
  const handleEditingModalClose = () => {
    setIsEditorOpen(false);
    setViewModalOpen(false);
    navigate("/detail");
  };

  return (
    <>
      {isEditorOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="bg-white rounded-lg modal-content1 max-w-[75vw] max-h-[95vh]">
            <button className="modal-close1" onClick={handleModalClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <JoditEditor
              ref={editor}
              value={selectedTemplate}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setFinalTemplate(newContent)}
              onChange={(newContent) => setFinalTemplate(newContent)}
            />

            <div className="flex justify-end p-4">
              <button
                onClick={handleUpdateTemplate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleEditingModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-xl	 mx-auto shadow-lg relative">
            <h2 className="text-xl font-bold mb-4 text-center">
              See your saved template
            </h2>
            <div className=" w-[80vw] max-w-[100%] h-[70vh] mb-4">
              <iframe
                src={selectedTemplatedDetails.file_url}
                // alt="Selected"
                height={"100%"}
                width={"100%"}
              />
            </div>
            <button
              className="modal-close"
              //   className="font-montserrat absolute top-3 right-3  border rounded-full cursor-pointer px-2  inline-flex items-center"
              onClick={() => setViewModalOpen(false)}
            >
              X
            </button>
            <div className="flex justify-around">
              <button
                className="font-montserrat bg-none text-black hover:text-[#f7fff7] rounded-full cursor-pointer inline-flex items-center border py-[7.5px] px-[50px] hover:bg-[#7b2cbf] "
                onClick={handleImageClickEditorOpen}
              >
                Edit
              </button>
              <button
                className="preview-button"
                onClick={() => {
                  handelSelectTemplate();
                  window.location.reload();
                }}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailEditor;
