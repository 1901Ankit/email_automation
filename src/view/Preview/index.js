import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Preview = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [content, setContent] = useState(`Dear Ankit,

Congratulations on the successful launch of webkull! This is an exciting milestone, and I’m thrilled to see your vision come to life.

My name is Amit, from Wish Geeks Tech Serve, a leading provider of innovative web development solutions. I’m reaching out to explore potential opportunities to create a stunning website for your new business.

A business without an online presence is just like a car without fuel.

**Our Key Services:**

- Web Development: Create stunning, responsive websites.
- Mobile App Development: Build intuitive mobile apps.
- Cloud Solutions: Enhance operations with secure cloud services.
- IT Support & Maintenance: Ensure seamless performance.
- Cybersecurity: Protect your digital assets.

Why choose us? Our expert team, customer-centric approach, and reliable support make us the ideal partner for your tech needs.

Ready to elevate your business? Contact us at 8887081786 | +91 01204122558 | +91 8700133076 | +44 1444391231 or visit https://www.wishgeekstechserve.com/ to get started.

Best regards,
Amit
Wish Geeks Tech Serve
info@wishgeekstechserve.com
https://www.wishgeekstechserve.com/`);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const openModal = () => {
    const blocksFromHTML = ContentState.createFromText(content);
    setEditorState(EditorState.createWithContent(blocksFromHTML));
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const blocks = rawContent.blocks.map(block => block.text).join('\n');
    setContent(blocks); // Save plain text
    closeModal();
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const blocks = rawContent.blocks.map(block => block.text).join('\n');
    setContent(blocks); // Update text area in real-time
  };

  return (
    <>
      <div className="container-fluid max-h-[100vh] overflow-scroll">
        {loading ? (
          <div className="loders">
            <div id="loader"></div>
          </div>
        ) : (
          <div className="container">
            <form>
              <h1 className="text-3xl font-bold">Preview Campaigns</h1>
              <div className="flex mt-4">
                <div className="w-full me-6">
                  <label htmlFor="fromEmail">SENDER NAME</label>
                  <input
                    type="text"
                    id="fromEmail"
                    name="fromEmail"
                    value="Sales Enquiry"
                    className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 text-gray-400 focus:border-blue-500 focus:bg-white transition-colors duration-300"
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="displayName">SENDER EMAIL</label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value="sale@wishgeeks.com"
                    className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 text-gray-400 focus:border-blue-500 focus:bg-white transition-colors duration-300"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex mt-4">
                <div className="w-full">
                  <label htmlFor="fromEmail">SUBJECT</label>
                  <input
                    type="text"
                    id="fromEmail"
                    name="fromEmail"
                    value="Message for uttam, Welcome onboard with wish geeks."
                    className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 text-gray-400 focus:border-blue-500 focus:bg-white transition-colors duration-300"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex mt-4">
                <div className="w-full">
                  <label htmlFor="fromEmail">LIST CONTENT</label>
                  <input
                    type="text"
                    id="Subject"
                    name="Subject"
                    value="US marketing Doctor Data."
                    className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 text-gray-400 focus:border-blue-500 focus:bg-white transition-colors duration-300"
                    readOnly
                  />
                </div>
              </div>
              <div className="container-fluid max-h-[100vh] overflow-scroll p-0">
                <div className="container p-0">
                  <div>
                    <div className="flex mt-4">
                      <div className="w-full relative">
                        <label htmlFor="content">CONTENT</label>
                        <textarea
                          id="content"
                          readOnly
                          name="content"
                          className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 px-3 text-gray-400 focus:border-blue-500 focus:bg-white transition-colors duration-300 cursor-pointer"
                          rows="15"
                          value={content}
                        />
                        <FaEdit
                          onClick={openModal}
                          className="absolute top-0 right-2 text-[#7b2cbf] cursor-pointer"
                          size={25}
                        />
                      </div>
                    </div>
                    <div className="button-container mt-3">
                      <button type="button" className="preview-button">
                        SEND MESSAGE NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg w-full max-w-[50%] max-h-[90vh] overflow-auto">
                    <h2 className="text-xl font-bold mb-4">Edit Content</h2>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={handleEditorChange} // Make sure to pass the correct handler
                      toolbar={{
                        options: [
                          "inline",
                          "blockType",
                          "fontSize",
                          "list",
                          "textAlign",
                          "history",
                        ],
                        inline: {
                          options: [
                            "bold",
                            "italic",
                            "underline",
                            "strikethrough",
                          ],
                        },
                        blockType: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        history: { inDropdown: true },
                      }}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                    />
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={closeModal}
                        className="mr-2 bg-gray-300 px-4 py-2 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Preview;
