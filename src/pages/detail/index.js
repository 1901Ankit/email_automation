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
    display_name: "",
    subject: "",
    delay_seconds: 0,
    contact_list: null, // Changed from array to single value
    smtp_server_ids: [],
    campaign_name: "", // Fixed spelling
    uploaded_file_key: "",
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

    setSelectedRecipients(retriedDetails.recipients);
  }, []);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );
  const [selectedRecipients, setSelectedRecipients] = useState([]); // Add this

  const handleChange = (selectedOption, type) => {
    console.log("selectedOptions", selectedOption);
    console.log("type", type);
    const updatedSelectedOptions = { ...selectedOptions };

    if (type === "smtp") {
      updatedSelectedOptions.smtps = selectedOption;
      console.log("uppppp", updatedSelectedOptions);
      // const smtp_server_ids = smtpOptions.map(smtp => parseInt(smtp.value));
      let smtp_server_ids = updatedSelectedOptions.smtps.map((smtp) =>
        Number(smtp.value)
      );
      setDetails({ ...details, smtp_server_ids: smtp_server_ids });
    } else if (type === "Recipient") {
      updatedSelectedOptions.recipients = selectedOption; // Store recipient selections
      console.log("receipient_id_ext", updatedSelectedOptions);
      setSelectedRecipients(selectedOption); // Update selected recipients state
      let contact_list_ids = updatedSelectedOptions.recipients.map(
        (smtp) => smtp.value
      );
      setDetails({ ...details, contact_list: contact_list_ids[0] });
    }

    sessionStorage.setItem("options", JSON.stringify(updatedSelectedOptions));

    setSelectedOptions(updatedSelectedOptions);
  };

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
      console.log(smtpResponse?.data?.servers, "hello");
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
    console.log("details", details);
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      details.uploaded_file_key = JSON.parse(sessionStorage.getItem("key"));

      const formData = new FormData();
      formData.append("campaign_name", details.campaign_name);
      formData.append("display_name", details.display_name);
      formData.append("subject", details.subject);
      formData.append("delay_seconds", details.delay_seconds);
      formData.append("uploaded_file_name", details.uploaded_file_key);
      formData.append("contact_list", details.contact_list);
      formData.append("name",details.campaign_name)
      // Append each SMTP ID separately
      if (Array.isArray(details.smtp_server_ids)) {
        details.smtp_server_ids.forEach((id) => {
          formData.append("smtp_server_ids", id);
        });
      } else {
        console.error("smtp_server_ids is not an array");
      }

      // Make API call inside try block
      const res = await API.createCampainion(formData);

      // Check for API response errors
      if (res?.response?.data?.campaign_name) {
        toast.error(res.response.data.campaign_name[0]);
        return; // Stop execution if there's an error
      }
      console.log("respinse_from_email", res);
      toast.success(res?.data?.success || "Campaign created successfully!");
      navigate("/preview");
    } catch (error) {
      console.error("Error submitting form:", error);

      // Handle specific error cases
      if (error?.response?.data) {
        // If API returns validation errors
        Object.values(error.response.data).forEach((errMsg) => {
          toast.error(errMsg[0]); // Show all errors in toast
        });
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    }
  };

  // const handleChange = (selectedOption, type) => {
  //   const updatedSelectedOptions = { ...selectedOptions };
  //   if (type === "smtp") {
  //     updatedSelectedOptions.smtps = selectedOption;
  //   }
  //   sessionStorage.setItem("options", JSON.stringify(updatedSelectedOptions));
  //   setContacts(updatedSelectedOptions)
  //   setSelectedOptions(updatedSelectedOptions);
  // };

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

  // const [selectedListName, setSelectedListName] = useState([]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await API.getContactList();

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
  return (
    <div className="container-fluid pt-32 max-h-[100vh] overflow-auto">
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold uppercase">Manage Campaigns</h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
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
                  options={contacts.map((liname) => ({
                    value: liname.file_id,
                    label: liname.file_name,
                  }))}
                  isMulti
                  value={selectedRecipients} 
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
                    name="display_name"
                    value={details.display_name}
                    onChange={(e) =>
                      setDetails({ ...details, display_name: e.target.value })
                    }
                    className="block w-full mt-1 border-[1px] border-[#93C3FD] 
                rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
              <div className="flex mt-4">
                <div className="w-full ">
                  <label htmlFor="Subject">Campaign Name</label>
                  <input
                    type="text"
                    id="displayName"
                    name="campaign_name"
                    value={details?.campaign_name}
                    onChange={(e) =>
                      setDetails({ ...details, campaign_name: e.target.value })
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
                  min="1"
                  max="59"
                  step="1"
                  onInput={(e) => {
                    let value = e.target.value;
                    // Prevent entering more than 60
                    if (value > 60) {
                      value = 60;
                    }
                    // Ensure it's a number and within the allowed range
                    setDetails({
                      ...details,
                      delay_seconds: Math.max(1, Math.min(60, Number(value))),
                    });
                  }}
                  value={details.delay_seconds}
                  // onChange={(e) =>
                  //   setDetails({ ...details, delay_seconds: e.target.value })
                  // }
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
                  name="subject"
                  value={details.subject}
                  onChange={(e) =>
                    setDetails({ ...details, subject: e.target.value })
                  }
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2
               focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                />
              </div>
              <div className="" onClick={saveEnteredDetails}>
                <Editing
                  setSelectedTemplate={setSelectedTemplate}
                  setModalOpen={setModalOpen}
                />
              </div>

              <button
                type="submit"
                className="bg-[#3B82F6] text-white border-[#3B82F6] rounded-md p-2 text-lg font-semibold mt-3 w-[30%]"
              >
                Submit
              </button>
            </form>
          </div>
        )}
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
                            <p
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
                            </p>
                          </div>

                          <span
                            className="dynamic_name_container___y3O2E sib-typo_text--bold sib-typo_text_size--lg"
                            style={{
                              color: "var(--sib-color_content-primary,#1f2d3d)",
                            }}
                          >
                            {/* {selectedRecipients} */}
                          </span>

                          <p
                            className="dynamic_subject_container___SyG68 sib-typo_text--bold sib-typo_text_size--md"
                            style={{
                              color: "var(--sib-color_content-primary,#1f2d3d)",
                            }}
                          >
                            {details.display_name || "Display Name"}
                          </p>
                          <p
                            className="dynamic_subject_container___SyG68 sib-typo_text--bold sib-typo_text_size--md"
                            style={{
                              color: "var(--sib-color_content-primary,#1f2d3d)",
                            }}
                          >
                            {details?.campaign_name || "Campaign Name"}
                          </p>
                          <p
                            className="dynamic_subject_container___SyG68 sib-typo_text--bold sib-typo_text_size--md"
                            style={{
                              color: "var(--sib-color_content-primary,#1f2d3d)",
                            }}
                          >
                            {details.subject || "Subject"}
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
