import React, { useEffect, useState, useMemo, useRef } from "react";
import "react-image-crop/dist/ReactCrop.css";
import "./index.css";
import Editing from "../../component/templatedit";
import JoditEditor from "jodit-react";
import Select from "react-select";
import * as SMTPAPI from "../../api/smtp";
import * as templateAPI from "../../api/emailTemplate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as API from "../../api/user";
const Content = ({ placeholder }) => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({
    displayName: "",
    subject: "",
    delay_seconds: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [options, setOptions] = useState({ smtps: [] });
  const emailEditorRef = useRef(null);
  const [finalTemplate, setFinalTemplate] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    smtps: [],
  });
  const [contacts, setContacts] = useState([]);
  const [csvFile, setCsvFile] = useState();

  useEffect(() => {
    const retriedDetails = JSON.parse(sessionStorage?.getItem("details")) || {};
    const retriedOptions = JSON.parse(sessionStorage.getItem("options")) || {
      smtps: [],
    };

    setDetails(retriedDetails);
    setSelectedOptions(retriedOptions);
  }, []);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await API.getContactList();
        console.log("res",response);
        setContacts(response.data.user_contact_files);  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to load contacts.");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []); 
  useEffect(() => {
    const loadData = async () => {
      const smtpResponse = await SMTPAPI.getAllSMTPs({
        user_id: localStorage.getItem("id"),
      });
      if (smtpResponse?.data?.servers.length < 0) {
        toast.error("You do not have smtps information ");
        navigate("/smtp");
        return;
      }
      const modifiedSMTPsResponse = smtpResponse?.data?.servers?.map((obj) => {
        return { label: obj.username, value: obj.id };
      });

      setOptions({
        smtps: modifiedSMTPsResponse,
      });
      setLoading(false);
    };
    loadData();
  }, [selectedTemplate]);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template.html);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const saveEnteredDetails = async () => {
    if (
      details.yourName === "" ||
      details.subject === "" ||
      details.delay_seconds === ""
    ) {
      toast.error("Please fill all the required fields");
      return;
    }
    sessionStorage.setItem("details", JSON.stringify(details));
    if (selectedOptions.smtps.length < 1) {
      toast.error("Please select at least one SMTP host Info");
      return;
    }
    sessionStorage.setItem("options", JSON.stringify(selectedOptions));
  };

  const handleModalSave = async () => {
    if (emailEditorRef.current?.editor) {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { html } = data;
      });
    }
    try {
      const htmlContent = finalTemplate;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const formData = new FormData();
      formData.append("file", blob, "mail_format_1.html");
      const response = await templateAPI.createHtmlTemplate(formData);
      setModalOpen(false);
      // window.location.reload();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {}
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // check variations
    saveEnteredDetails();
    if (!JSON.parse(sessionStorage.getItem("csv"))) {
      toast.error("Please upload your CSV file list");
      return;
    }
    if (!csvFile) {
      toast.error("Please upload your CSV file list");
      return;
    }

    // if (csvFile) {
    navigate("/preview", { state: { file: csvFile } });
    // }
  };

  const handleChange = (selectedOption, type) => {
    const updatedSelectedOptions = { ...selectedOptions };
    if (type === "smtp") {
      updatedSelectedOptions.smtps = selectedOption;
    }
    sessionStorage.setItem("options", JSON.stringify(updatedSelectedOptions));
    setSelectedOptions(updatedSelectedOptions);
  };

  const customStyles = {
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      "&:hover": {
        border: "none",
        boxShadow: "none",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "gray",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
    }),
  };

  const [selectedListName, setSelectedListName] = useState("");
  useEffect(() => {
    // Retrieve the listName from sessionStorage when the component mounts
    const storedListName = sessionStorage.getItem("listName");
    if (storedListName) {
      setSelectedListName(storedListName);
    }
  }, []);

  return (
    <div className="container-fluid pt-32 max-h-[100vh] overflow-auto">
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold uppercase">Manage Campaigns</h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Left Section: Form */}

        {loading ? (
          <div className="loders">
            <div id="loader"></div>
          </div>
        ) : (
          <div className="container-fluid p-2">
            <form onSubmit={handleSubmit} className="p-0">
              <div className="flex ">
                <div className="w-full">
                  <label htmlFor="EmailUseTLS"> Sender</label>
                  <Select
                    options={options.smtps}
                    isMulti
                    value={selectedOptions.smtps}
                    onChange={(selectedOption) =>
                      handleChange(selectedOption, "smtp")
                    }
                    className="block w-full mt-1 border-[1px] border-[#93c3fd] rounded-md  pl-2
                 focus:border-blue-500 transition-colors duration-300 appearance-none 
                 focus:outline-none focus:ring-0"
                    id="Smtphost"
                    name="Smtphost"
                    styles={customStyles}
                    placeholder="Sender"
                  />
                </div>
              </div>

              <div className="mt-4 w-full">
                <label htmlFor="EmailUseTLS">Recipient</label>
                <Select
                  options={options.Recipient}
                  isMulti
                  value={
                    selectedListName
                      ? [{ value: selectedListName, label: selectedListName }]
                      : []
                  }
                  onChange={(selectedOption) =>
                    handleChange(selectedOption, "Recipient")
                  }
                  className="block w-full mt-1 border-[1px] border-[#93c3fd] rounded-md pl-2
          focus:border-blue-500 transition-colors duration-300 appearance-none 
          focus:outline-none focus:ring-0"
                  id="Recipient"
                  name="Recipient"
                  styles={customStyles}
                  placeholder="Recipient"
                />
              </div>

              <div className="flex mt-4">
                <div className="w-full ">
                  <label htmlFor="Subject">Display Name</label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={details.displayName}
                    onChange={(e) =>
                      setDetails({ ...details, displayName: e.target.value })
                    }
                    className="block w-full mt-1 border-[1px] border-[#93C3FD] 
                rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
              <div className="   mt-4 w-full">
                <label htmlFor="secondsInput">
                  Time gap between each emails (Seconds)
                </label>
                <input
                  type="number"
                  id="secondsInput"
                  name="secondsInput"
                  min="0"
                  max="59"
                  step="1"
                  value={details.delay_seconds}
                  onChange={(e) =>
                    setDetails({ ...details, delay_seconds: e.target.value })
                  }
                  placeholder="Seconds"
                  className="block w-full mt-1 border-[1px]
                 border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors 
                 duration-300 focus:outline-none focus:ring-0"
                />
              </div>

              <div className="w-full mt-4  me-6">
                <label htmlFor="Subject">Subject</label>
                <input
                  type="text"
                  id="Subject"
                  name="Subject"
                  value={details.subject}
                  onChange={(e) =>
                    setDetails({ ...details, subject: e.target.value })
                  }
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2
               focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                />
              </div>
            </form>
          </div>
        )}

        {/* Right Section: Mobile Preview */}
        <div className="w-full md:w-1/2 p-2">
          <div
            className="fromRight__section___YhH13 max-h-[500px] overflow-auto"
            style={{ height: "500px" }}
          >
            <div data-testid="CampaignFromMobileid">
              <div className="device___wtqZo device-iphone-x___CX+Wj">
                <div className="device-frame___RJu0u">
                  <div className="device-content___bACBe">
                    <div className="header-left___7IGfK">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="16"
                        fill="none"
                        viewBox="0 0 18 16"
                        color="var(--sib-color_surface-hover-background, #c0ccda)"
                      >
                        <path
                          stroke="var(--sib-color_surface-hover-background, #c0ccda)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.333 8.367a7.333 7.333 0 0 1 9.387 0M1.947 6a10.667 10.667 0 0 1 14.106 0m-9.366 4.74a4 4 0 0 1 4.633 0M9 13.333h.007"
                        ></path>
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="16"
                        fill="none"
                        viewBox="0 0 18 16"
                        class=""
                        color="var(--sib-color_surface-hover-background, #c0ccda)"
                      >
                        <path
                          stroke="var(--sib-color_surface-hover-background, #c0ccda)"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12.333 4H3c-.736 0-1.333.597-1.333 1.333v5.334C1.667 11.403 2.264 12 3 12h9.333c.737 0 1.334-.597 1.334-1.333V5.333c0-.736-.597-1.333-1.334-1.333zm4 4.667V7.333"
                        ></path>
                      </svg>
                    </div>
                    <p className="device-text___-PWja">9:47</p>
                    <div className="iphone__body___ssaS6">
                      <div className="iphoneBody__header___IIo2O">
                        <span
                          className="sib-typo_text--bold sib-typo_text_size--lg"
                          style={{
                            color: "var(--sib-color_content-primary,#1f2d3d)",
                          }}
                        >
                          Inbox
                        </span>
                      </div>
                      <div className="iphoneBody__row___l1wvy">
                        <div className="iphoneRight__block___TZEte">
                          <div className="iphoneRight__header___K9nS0">
                            <span
                              className="dynamic_name_container___y3O2E sib-typo_text--bold sib-typo_text_size--lg"
                              style={{
                                color:
                                  "var(--sib-color_content-primary,#1f2d3d)",
                              }}
                            >
                              {selectedOptions.smtps.length > 0
                                ? selectedOptions.smtps
                                    .map((opt) => opt.label)
                                    .join(", ")
                                : "Sender"}
                            </span>
                          </div>

                          <span
                            className="dynamic_name_container___y3O2E sib-typo_text--bold sib-typo_text_size--lg"
                            style={{
                              color: "var(--sib-color_content-primary,#1f2d3d)",
                            }}
                          >
                            {selectedListName ? selectedListName : "Recipient"}
                          </span>

                          <span
                            className="dynamic_subject_container___SyG68 sib-typo_text--bold sib-typo_text_size--md"
                            style={{
                              color: "var(--sib-color_content-primary,#1f2d3d)",
                            }}
                          >
                            {details.displayName || "Message subject..."}
                          </span>
                          <p
                            className="dynamic_previewtext_para___U9WMr sib-typo_text--regular sib-typo_text_size--md"
                            style={{
                              color: "var(--sib-color_content-primary,#1f2d3d)",
                            }}
                          >
                            {details.subject || "Your preview text"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="device-header___cM1lR"></div>
                <div class="device-sensors___VKCDn"></div>
                <div class="device-btns___eC00o"></div>
                <div class="device-power___Dhh3s"></div>
                <div></div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="" onClick={saveEnteredDetails}>
        <Editing
          setSelectedTemplate={setSelectedTemplate}
          setModalOpen={setModalOpen}
        />
      </div>

      <div className="mt-5 text-right pb-3">
        <button type="submit" className="preview-button">
          Submit
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-[60%] max-h-[100vh] overflow-hidden">
            <div className="h-[70vh] overflow-y-auto scroll-smooth ">
              <JoditEditor
                ref={editor}
                value={selectedTemplate}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => setFinalTemplate(newContent)}
                onChange={(newContent) => setFinalTemplate(newContent)}
              />
            </div>

            <div className="flex justify-end p-4">
              <button
                onClick={handleModalSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleModalClose}
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

export default Content;
