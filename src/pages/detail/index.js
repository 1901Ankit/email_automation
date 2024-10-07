import React, { useEffect, useState, useMemo, useRef } from "react";
import Csv from "../../component/csv/csv";
import "react-image-crop/dist/ReactCrop.css";
import "./index.css";
import { templates } from "../../lib/data";
import Editing from "../../component/templatedit";
import JoditEditor from "jodit-react";
import Select from "react-select";
import * as SMTPAPI from "../../api/smtp";
import * as templateAPI from "../../api/emailTemplate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        return { label: obj.host, value: obj.id };
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
  const handleModalSave = async () => {
    if (emailEditorRef.current?.editor) {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { html } = data;
        console.log("Template saved with HTML content:", html);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check variations
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
    if (!JSON.parse(sessionStorage.getItem("csv"))) {
      toast.error("Please upload your CSV file list");
      return;
    }
    if (!csvFile) {
      toast.error("Please upload your CSV file list");
      return;
    }

    sessionStorage.setItem("options", JSON.stringify(selectedOptions));
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
            <div className="w-full me-6">
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
            <div className="flex mt-4">
              <div className="w-full me-6">
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

              <div className="w-full">
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
            </div>

            <div className="flex mt-4">
              <div className="w-full">
                <label htmlFor="EmailUseTLS"> SMTP Host</label>
                <Select
                  options={options.smtps}
                  isMulti
                  value={selectedOptions.smtps}
                  onChange={(selectedOption) =>
                    handleChange(selectedOption, "smtp")
                  }
                  className="block w-full mt-1 border-[1px] border-[#93c3fd] rounded-md  pl-2
                   focus:border-blue-500 transition-colors duration-300 appearance-none focus:outline-none focus:ring-0"
                  id="Smtphost"
                  name="Smtphost"
                  styles={customStyles}
                  placeholder="SMTP Host"
                />
              </div>
            </div>

            <Editing
              setSelectedTemplate={setSelectedTemplate}
              setModalOpen={setModalOpen}
            />

            <div className="container hsyw p-0">
              <h1 className="text-2xl font-bold mt-2">Default Template</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {templates.map((item) => (
                  <div
                    key={item.id}
                    className="relative mt-3 h-[580px] border rounded-md cursor-pointer"
                    onClick={() => handleTemplateClick(item)}
                  >
                    <div className="absolute h-full w-full overflow-y-auto">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.html }}
                        className="w-full h-full"
                      />
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-5 left-[25%] w-1/2
                     bg-[#7b2cbf] text-white py-2 mx-3 rounded-md text-center font-bold"
                    >
                      {item.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <h1 className="text-3xl font-bold">Upload list</h1>
              <Csv csvFile={csvFile} setCsvFile={setCsvFile} />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-[60%] max-h-[100vh] overflow-hidden">
            <div className="h-[70vh] overflow-y-auto scroll-smooth">
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
