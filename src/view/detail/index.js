import React, { useEffect, useState, useRef } from "react";
import Csv from "../component/csv/csv";
import "react-image-crop/dist/ReactCrop.css";
import "./index.css";
import jshs from "../../image/IMG.jpg";
import EmailEditor from "react-email-editor";

const Content = () => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const emailEditorRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const templates = [
    {
      id: 1,
      json: {
        body: {
          rows: [
            {
              columns: [
                {
                  contents: [
                    {
                      type: "image",
                      data: {
                        url: "https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/3.jpg", // Example image URL
                        width: 600,
                        height: 300,
                      },
                    },
                    {
                      type: "text",
                      data: {
                        text: "This is Template 1",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      title: "Template 1",
    },
    {
      id: 2,
      json: {
        body: {
          rows: [
            {
              columns: [
                {
                  contents: [
                    {
                      type: "image",
                      data: {
                        url: "https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/3.jpg", // Example image URL
                        width: 600,
                        height: 300,
                      },
                    },
                    {
                      type: "text",
                      data: {
                        text: "This is Template 2",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      title: "Template 2",
    },
    {
      id: 3,
      json: {
        body: {
          rows: [
            {
              columns: [
                {
                  contents: [
                    {
                      type: "image",
                      data: {
                        url: "https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/3.jpg", // Example image URL
                        width: 600,
                        height: 300,
                      },
                    },
                    {
                      type: "text",
                      data: {
                        text: "This is Template 3",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      title: "Template 3",
    },
    {
      id: 4,
      json: {
        body: {
          rows: [
            {
              columns: [
                {
                  contents: [
                    {
                      type: "image",
                      data: {
                        url: "https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/3.jpg", // Example image URL
                        width: 600,
                        height: 300,
                      },
                    },
                    {
                      type: "text",
                      data: {
                        text: "This is Template 4",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      title: "Template 4",
    },
  ];

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template.json);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSave = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      console.log("Template saved with HTML content:", html);
      // You can save the HTML or the JSON representation here
    });
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div className="container-fluid max-h-[100vh] overflow-scroll mt-2">
      {loading ? (
        <div className="loders">
          <div id="loader"></div>
        </div>
      ) : (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold">Manage Campaigns</h1>
            <div className="flex mt-4">
              <div className="w-full me-6">
                <label htmlFor="Subject">Subject</label>
                <input
                  type="text"
                  id="Subject"
                  name="Subject"
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
              <div className="w-full me-6">
                <label htmlFor="displayName">Sender</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
              <div className="w-full">
                <label htmlFor="secondsInput">Time Stamp (Seconds)</label>
                <input
                  type="number"
                  id="secondsInput"
                  name="secondsInput"
                  min="0"
                  max="59"
                  step="1"
                  placeholder="Seconds"
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="container hsyw p-0">
              <h1 className="text-2xl font-bold mt-2">Template</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {templates.map((item) => (
                  <div
                    key={item.id}
                    className="relative mt-3 h-[300px] border rounded-md p-4 cursor-pointer"
                    onClick={() => handleTemplateClick(item)}
                  >
                    {/* <img src={jshs} /> */}
                    <div className="absolute h-[300px] overflow-hidden"></div>
                    <p className="absolute w-full left-0 bottom-2 font-bold text-[25px] text-center uppercase text-black">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <h1 className="text-3xl font-bold">Upload list</h1>
              <Csv />
            </div>

            <div className="mt-5 text-right">
              <button type="submit" className="preview-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white mt-5 rounded-lg modal-content1">
            <button className="modal-close1" onClick={handleModalClose}>
              X
            </button>
            <h2 className="text-xl font-bold mb-1">Edit Template</h2>
            <EmailEditor
              ref={emailEditorRef}
              onLoad={() => {
                if (selectedTemplate) {
                  emailEditorRef.current.editor.loadDesign(selectedTemplate);
                }
              }}
            />
            <div className="text-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleModalSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
