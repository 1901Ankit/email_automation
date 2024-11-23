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
import * as TokenAPI from "../../api/user_profile";

const Preview = ({ placeholder }) => {
  const editor = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [emailStatus, setEmailStatus] = useState({
    total_emails: 0,
    successful_sends: 0,
    failed_sends: 0,
    email_statuses: [],
  });
  const [content, setContent] = useState(``);
  const [isLoading, setIsLoading] = useState(false);
  const [HTMLtemplate, setHTMLtemplate] = useState(null);
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

  const isTokenBlackListed = async (user) => {
    const formData = new FormData();
    formData.append("refresh_token", localStorage.getItem("refresh_token"));
    try {
      const response = await TokenAPI.isTokenBlackListed(formData);
      if (response.status === 200) {
      } else {
        throw new Error("Token is not blacklisted");
      }
    } catch (error) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    }
  };
  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken !== "") {
      isTokenBlackListed();
    }
  }, [location.pathname]);
  useEffect(() => {
    // Establish the WebSocket connection
    const socket = new WebSocket(
      `${process.env.REACT_APP_BACKEND_BASE_URL.replace(
        "https",
        "wss"
      )}/ws/email-status/${localStorage.getItem("id")}/`
    );

    // Event listener for when the WebSocket connection is open
    socket.onopen = () => {};

    // Event listener for receiving messages from the WebSocket
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEmailStatus((prevStatus) => {
        // Create a new updated email status object based on the previous status
        const updatedEmailStatus = {
          total_emails: (prevStatus?.total_emails || 0) + 1, // Increment total emails
          successful_sends: prevStatus?.successful_sends || 0, // Preserve successful sends
          failed_sends: prevStatus?.failed_sends || 0, // Preserve failed sends
          email_statuses: [
            ...(prevStatus?.email_statuses || []), // Preserve previous email statuses
            {
              email: data.email,
              status: data.status,
              timestamp: data.timestamp,
            },
          ],
        };

        // Update counts based on the status
        if (data.status === "Sent successfully") {
          updatedEmailStatus.successful_sends += 1; // Increment successful sends
        } else if (data.status === "Failed to send") {
          updatedEmailStatus.failed_sends += 1; // Increment failed sends
        }

        return updatedEmailStatus; // Return the new state object
      });
    };

    // socket.onclose = () => {
    // };

    return () => {
      socket.close();
    };
  }, []);

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
        setHTMLtemplate(html);
      } catch (error) {}
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
    setIsLoading(true);
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
      toast.success("Email sent successfully");
    } catch (error) {
      toast.error(
        error.response.data.message || "Upgrade now for enhanced features"
      );
    }
    setIsLoading(false);
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
      <div className="container-fluid  pt-24  max-h-[100vh] overflow-auto">
        {loading ? (
          <div className="loders">
            <div id="loader"></div>
          </div>
        ) : (
          <div className="container flex">
            <form className="w-[70%]">
              <h1 className="text-3xl font-bold ">Preview Campaigns</h1>
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

              {/* <div className="mt-4">
                <div>
                  <label htmlFor="content">UPLOADED FILE</label>
                </div>

                <div
                  className="block text-start w-full border border-red-700 mt-1 rounded-md py-2 pl-3 text-gray-600 font-bold"
                >{file.name} </div>

              </div> */}
              <div className="w-full mt-4">
                <label htmlFor="content">UPLOADED FILE </label>
                <input
                  value={file.name}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 text-gray-400 focus:border-blue-500 focus:bg-white transition-colors duration-300"
                  readOnly
                />
              </div>

              <div className="container-fluid p-0">
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
                      </div>
                    </div>
                    <div className="button-container mt-3 pb-6">
                      <button
                        disabled={isLoading}
                        onClick={handleSendEmail}
                        type="button"
                        className="preview-button"
                      >
                        {isLoading ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span class="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "SEND MESSAGE NOW"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="w-[30%]">
              <Rightside emailStatus={emailStatus} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Preview;
