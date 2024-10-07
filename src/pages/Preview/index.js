import React, { useState, useEffect, useMemo, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import JoditEditor from "jodit-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as sendEmailAPI from "../../api/sendEmail";
import html2canvas from "html2canvas";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Rightside from "../../component/rightsidebar";

const Preview = ({ placeholder }) => {
  const editor = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [content, setContent] = useState(``);
  const [imageURL, setImageURL] = useState("");
  const [HTMLtemplate, setHTMLtemplate] = useState(null)
  const [details, setDetails] = useState({});
  const [options, setOptions] = useState({ smtps: [] });
  const [file, setFile] = useState(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  useEffect(() => {
    if (location.state && location.state.file) {
      setFile(location.state.file);
    } else {
      toast.error("You must have to provide csv file list");
      setFile(null);
      navigate("/detail", { replace: true });
    }
    setDetails(JSON.parse(sessionStorage.getItem("details")));
    setOptions(JSON.parse(sessionStorage.getItem("options")));
    const fileData = JSON.parse(sessionStorage.getItem("csv"));

    const selectedHTMLFile = async () => {
      try {
        const response = await fetch(
          `https://emailbulkshoot.s3.amazonaws.com/${JSON.parse(
            sessionStorage.getItem("key")
          )}`
        );
        const html = await response.text();
        setHTMLtemplate(html)

        // const tempDiv = document.createElement("div");
        // tempDiv.innerHTML = html;
        // document.body.appendChild(tempDiv);
        // // Wait for all images to load
        // const images = tempDiv.getElementsByTagName("img");
        // const imageLoadPromises = Array.from(images).map((img) => {
        //   return new Promise((resolve, reject) => {
        //     img.onload = resolve;
        //     img.onerror = () => {
        //       console.error("Image failed to load:", img.src);
        //       resolve(); // Resolve even on error to continue
        //     };
        //   });
        // });

        // // Wait for all images to load
        // await Promise.all(imageLoadPromises);
        // await new Promise((resolve) => setTimeout(resolve, 100));
        // const canvas = await html2canvas(tempDiv, { useCORS: true });
        // const selectedHTMLImageURL = canvas.toDataURL();
        // setImageURL(selectedHTMLImageURL);
        // document.body.removeChild(tempDiv);
      } catch (error) {
        console.log(error);
      }
    };
    selectedHTMLFile();
    const formData = new FormData();
    formData.append("file", fileData);

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
    const blocks = rawContent.blocks.map((block) => block.text).join("\n");
    setContent(blocks);
    closeModal();
  };
  const handleSendEmail = async () => {
    const formData = new FormData();

    options?.smtps?.forEach((element) => {
      formData.append("smtp_server_ids", Number(element.value));
    });
    formData.append("delay_seconds", details.delay_seconds);
    formData.append("subject", details.subject);
    formData.append(
      "uploaded_file_key",
      JSON.parse(sessionStorage.getItem("key"))
    );
    formData.append("display_name", details.displayName);
    formData.append("email_list", file);

    try {
      const response = await sendEmailAPI.sendEmail(formData);
      toast.success("Email sent successfully")
      console.log("Emails sent successfully:", response.data);

    } catch (error) {
      console.error(
        "Error sending emails:",
        error.response?.data || error.message
      );
    }
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const blocks = rawContent.blocks.map((block) => block.text).join("\n");
    setContent(blocks);
  };

  return (
    <>
      <div className="container-fluid max-h-[100vh] overflow-scroll">
        {loading ? (
          <div className="loders">
            <div id="loader"></div>
          </div>
        ) : (
          <div className="container flex">
            <form className="w-[70%]">
              <h1 className="text-3xl font-bold">Preview Campaigns</h1>
              <div className="flex mt-4">
                <div className="w-full me-6">
                  <label htmlFor="fromEmail">DISPLAY NAME</label>
                  <input
                    type="text"
                    id=""
                    name="fromEmail"
                    value={details.displayName}
                    className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 text-gray-400 focus:border-blue-500 focus:bg-white transition-colors duration-300"
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="fromEmail">SUBJECT</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={details.subject}
                    className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 text-gray-400 focus:border-blue-500 focus:bg-white transition-colors duration-300"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex mt-4">
                <div className="w-full">
                  <label htmlFor="fromEmail">SMTPS LIST </label>
                  <input
                    type="text"
                    id="SMTPS"
                    name="SMTPS"
                    value={options?.smtps
                      ?.map((sender) => sender.label)
                      .join(", ")}
                    className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 text-gray-400 focus:border-blue-500 focus:bg-white transition-colors duration-300"
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-4">
                <div>
                  <label htmlFor="content">UPLOADED FILE</label>
                </div>

                <div
                  className="block text-start w-full border border-red-700 mt-1 rounded-md py-2 pl-3 text-gray-600 font-bold"
                >{file.name} </div>

              </div>
              <div className="w-full mt-4">
                <label htmlFor="content">UPLOADED FILE </label>
                <input
                  value={file.name}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 text-gray-400 focus:border-blue-500 focus:bg-white transition-colors duration-300"
                  readOnly
                />
              </div>

              <div className="container-fluid max-h-[100vh] overflow-scroll p-0">
                <div className="container p-0 h-full">
                  <div className="h-full">
                    <div className="flex mt-4 h-full">
                      <div className="w-full min-h-[55vh] relative">
                        <label htmlFor="content">CONTENT</label>

                        <div className="absolute h-full w-full overflow-y-auto">
                          <div
                            dangerouslySetInnerHTML={{ __html: HTMLtemplate }}
                            className="w-full h-full"
                          />
                        </div>
                        {/* <iframe
                          src={`https://emailbulkshoot.s3.amazonaws.com/${JSON.parse(sessionStorage.getItem('key'))}`}
                          // alt="Selected"
                          height={"100%"} width={"100%"}
                        /> */}
                        {/* <img src={imageURL} alt="" /> */}
                      </div>
                    </div>
                    <div className="button-container mt-3">
                      <button
                        onClick={handleSendEmail}
                        type="button"
                        className="preview-button"
                      >
                        SEND MESSAGE NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg w-full max-w-[50%] max-h-[90vh] overflow-auto">
                    <h2 className="text-xl font-bold mb-4">Edit Content</h2>
                   
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
              )} */}
            </form>
            <div className="w-[30%]">
              <Rightside />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Preview;
