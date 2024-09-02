import React, { useEffect, useState, useRef } from "react";
import Csv from "../../component/csv/csv";
import "react-image-crop/dist/ReactCrop.css";
import "./index.css";
import EmailEditor from "react-email-editor";
import Editing from "../../component/templatedit";
import { convertHtmlToJson } from "../../convertToJson";
import { html2json } from "html2json";
import dummy from "../../dummy.json";
import Select from "react-select";

const Content = () => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const emailEditorRef = useRef(null);
  const [newDummy, setNewDummy] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (selectedTemplate) {
        try {
          console.log(selectedTemplate);
          const template = await convertHtmlToJson(selectedTemplate);
          console.log(template);
          setNewDummy(template);
        } catch (error) {
          console.error("Error converting HTML to JSON:", error);
        }
      }
    };
    loadData();
  }, [selectedTemplate]);

  const templates = [
    {
      id: 1,
      html: `

      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mail format 1</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
      
      </head>
      
      <body>
        <div class="container">
          <div class="header">
            <img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/IMG_6062.jpg" width="500"
             style="margin-right: 0px" alt="logo" loading="lazy" />
          </div>
          <div style="display: flex;">
            <div style="display: block; margin-top: 26px;">
              <a href="https://www.facebook.com/share/uBbXR4C2nnjHcnKd/?mibextid=LQQJ4d" style="display: block; padding: 2px 0px;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/Elevate+Your+Tech+Experience+with+Us!+(4).png" alt="facabook" width="30"></a>
              <a href="https://www.instagram.com/wishgeekstechserve/?igsh=cWl4cGlxeTltZng0" style="display: block;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/Elevate+Your+Tech+Experience+with+Us!+(5).png" alt="Instagram" width="30"></a>
              <a href="https://in.linkedin.com/in/wish-geeks-techserve-4b6477317" style="display: block;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/Elevate+Your+Tech+Experience+with+Us!+(6).png" alt="LinkdIn" width="30"></a>
            </div>
            <div style="display: block;">
              <table border="0" cellpadding="0" cellspacing="0" style="margin-left: 50px;">
                <tbody>
                  <h3 style="display: block; margin: 10px 0px 5px 50px; font-family: sans-serif; font-weight: 600;">Visit for more info:</h3>
                  <tr>
                    <td style="margin: 0px; font-size: 10px; line-height: normal; padding: 10px 0px;">
                      <a href="tel:+18887081786" style="text-decoration: none; color: #000; font-family: rial, Helvetica, sans-serif;">
                        <span style="text-decoration: none; color: #0097B2; font-size: 14px;"><i class="fa-solid fa-phone-volume"></i></span> 1-888-708-1786
                    </a>              
                    </td>
                  </tr>
                  <tr>
                    <td style=" margin: 0px; font-size: 10px; line-height: normal; padding: 2px 0px 10px 0px;">
                      <a href="mailto:info@wishgeekstechserve.com" style="text-decoration: none; color: #000; font-family:Arial, Helvetica, sans-serif;">
                        <span style="text-decoration: none; color: #0097B2; font-size: 14px;"><i class="fa-regular fa-envelope"></i></span> info@wishgeekstechserve.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="margin: 0px; font-size: 10px; line-height: normal; padding: 2px 0px 10px 0px;font-family: rial, Helvetica, sans-serif;">
                      <a href="https://www.wishgeekstechserve.com" style="text-decoration: none; color: #000;">
                        <span style="text-decoration: none; color: #0097B2 ; font-size: 15px;"><i class="fa-solid fa-globe"></i></span> www.wishgeekstechserve.com</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="margin-left: 30px;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/IMG_6062+(1).jpg" alt="" width="200px" height=""></div>
          </div>
        </div>
      </body>
      
      </html>
      `,
      title: "Select Template 1 ",
    },
    {
      id: 2,
      html: `

      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mail format 1</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
      
      </head>
      
      <body>
        <div class="container">
          <div class="header">
            <img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/IMG_6062.jpg" width="500"
             style="margin-right: 0px" alt="logo" loading="lazy" />
          </div>
          <div style="display: flex;">
            <div style="display: block; margin-top: 26px;">
              <a href="https://www.facebook.com/share/uBbXR4C2nnjHcnKd/?mibextid=LQQJ4d" style="display: block; padding: 2px 0px;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/Elevate+Your+Tech+Experience+with+Us!+(4).png" alt="facabook" width="30"></a>
              <a href="https://www.instagram.com/wishgeekstechserve/?igsh=cWl4cGlxeTltZng0" style="display: block;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/Elevate+Your+Tech+Experience+with+Us!+(5).png" alt="Instagram" width="30"></a>
              <a href="https://in.linkedin.com/in/wish-geeks-techserve-4b6477317" style="display: block;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/Elevate+Your+Tech+Experience+with+Us!+(6).png" alt="LinkdIn" width="30"></a>
            </div>
            <div style="display: block;">
              <table border="0" cellpadding="0" cellspacing="0" style="margin-left: 50px;">
                <tbody>
                  <h3 style="display: block; margin: 10px 0px 5px 50px; font-family: sans-serif; font-weight: 600;">Visit for more info:</h3>
                  <tr>
                    <td style="margin: 0px; font-size: 10px; line-height: normal; padding: 10px 0px;">
                      <a href="tel:+18887081786" style="text-decoration: none; color: #000; font-family: rial, Helvetica, sans-serif;">
                        <span style="text-decoration: none; color: #0097B2; font-size: 14px;"><i class="fa-solid fa-phone-volume"></i></span> 1-888-708-1786
                    </a>              
                    </td>
                  </tr>
                  <tr>
                    <td style=" margin: 0px; font-size: 10px; line-height: normal; padding: 2px 0px 10px 0px;">
                      <a href="mailto:info@wishgeekstechserve.com" style="text-decoration: none; color: #000; font-family:Arial, Helvetica, sans-serif;">
                        <span style="text-decoration: none; color: #0097B2; font-size: 14px;"><i class="fa-regular fa-envelope"></i></span> info@wishgeekstechserve.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="margin: 0px; font-size: 10px; line-height: normal; padding: 2px 0px 10px 0px;font-family: rial, Helvetica, sans-serif;">
                      <a href="https://www.wishgeekstechserve.com" style="text-decoration: none; color: #000;">
                        <span style="text-decoration: none; color: #0097B2 ; font-size: 15px;"><i class="fa-solid fa-globe"></i></span> www.wishgeekstechserve.com</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="margin-left: 30px;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/IMG_6062+(1).jpg" alt="" width="200px" height=""></div>
          </div>
        </div>
      </body>
      
      </html>
      `,
      title: "Select Template 2 ",
    },
    {
      id: 3,
      html: `

      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mail format 1</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
      
      </head>
      
      <body>
        <div class="container">
          <div class="header">
            <img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/IMG_6062.jpg" width="500"
             style="margin-right: 0px" alt="logo" loading="lazy" />
          </div>
          <div style="display: flex;">
            <div style="display: block; margin-top: 26px;">
              <a href="https://www.facebook.com/share/uBbXR4C2nnjHcnKd/?mibextid=LQQJ4d" style="display: block; padding: 2px 0px;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/Elevate+Your+Tech+Experience+with+Us!+(4).png" alt="facabook" width="30"></a>
              <a href="https://www.instagram.com/wishgeekstechserve/?igsh=cWl4cGlxeTltZng0" style="display: block;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/Elevate+Your+Tech+Experience+with+Us!+(5).png" alt="Instagram" width="30"></a>
              <a href="https://in.linkedin.com/in/wish-geeks-techserve-4b6477317" style="display: block;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/Elevate+Your+Tech+Experience+with+Us!+(6).png" alt="LinkdIn" width="30"></a>
            </div>
            <div style="display: block;">
              <table border="0" cellpadding="0" cellspacing="0" style="margin-left: 50px;">
                <tbody>
                  <h3 style="display: block; margin: 10px 0px 5px 50px; font-family: sans-serif; font-weight: 600;">Visit for more info:</h3>
                  <tr>
                    <td style="margin: 0px; font-size: 10px; line-height: normal; padding: 10px 0px;">
                      <a href="tel:+18887081786" style="text-decoration: none; color: #000; font-family: rial, Helvetica, sans-serif;">
                        <span style="text-decoration: none; color: #0097B2; font-size: 14px;"><i class="fa-solid fa-phone-volume"></i></span> 1-888-708-1786
                    </a>              
                    </td>
                  </tr>
                  <tr>
                    <td style=" margin: 0px; font-size: 10px; line-height: normal; padding: 2px 0px 10px 0px;">
                      <a href="mailto:info@wishgeekstechserve.com" style="text-decoration: none; color: #000; font-family:Arial, Helvetica, sans-serif;">
                        <span style="text-decoration: none; color: #0097B2; font-size: 14px;"><i class="fa-regular fa-envelope"></i></span> info@wishgeekstechserve.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="margin: 0px; font-size: 10px; line-height: normal; padding: 2px 0px 10px 0px;font-family: rial, Helvetica, sans-serif;">
                      <a href="https://www.wishgeekstechserve.com" style="text-decoration: none; color: #000;">
                        <span style="text-decoration: none; color: #0097B2 ; font-size: 15px;"><i class="fa-solid fa-globe"></i></span> www.wishgeekstechserve.com</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="margin-left: 30px;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/IMG_6062+(1).jpg" alt="" width="200px" height=""></div>
          </div>
        </div>
      </body>
      
      </html>
      `,
      title: " Select Template 3 ",
    },
    {
      id: 4,
      html: `

      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mail format 1</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
      
      </head>
      
      <body>
        <div class="container">
          <div class="header">
            <img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/IMG_6062.jpg" width="500"
             style="margin-right: 0px" alt="logo" loading="lazy" />
          </div>
          <div style="display: flex;">
            <div style="display: block; margin-top: 26px;">
              <a href="https://www.facebook.com/share/uBbXR4C2nnjHcnKd/?mibextid=LQQJ4d" style="display: block; padding: 2px 0px;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/Elevate+Your+Tech+Experience+with+Us!+(4).png" alt="facabook" width="30"></a>
              <a href="https://www.instagram.com/wishgeekstechserve/?igsh=cWl4cGlxeTltZng0" style="display: block;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/Elevate+Your+Tech+Experience+with+Us!+(5).png" alt="Instagram" width="30"></a>
              <a href="https://in.linkedin.com/in/wish-geeks-techserve-4b6477317" style="display: block;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/Elevate+Your+Tech+Experience+with+Us!+(6).png" alt="LinkdIn" width="30"></a>
            </div>
            <div style="display: block;">
              <table border="0" cellpadding="0" cellspacing="0" style="margin-left: 50px;">
                <tbody>
                  <h3 style="display: block; margin: 10px 0px 5px 50px; font-family: sans-serif; font-weight: 600;">Visit for more info:</h3>
                  <tr>
                    <td style="margin: 0px; font-size: 10px; line-height: normal; padding: 10px 0px;">
                      <a href="tel:+18887081786" style="text-decoration: none; color: #000; font-family: rial, Helvetica, sans-serif;">
                        <span style="text-decoration: none; color: #0097B2; font-size: 14px;"><i class="fa-solid fa-phone-volume"></i></span> 1-888-708-1786
                    </a>              
                    </td>
                  </tr>
                  <tr>
                    <td style=" margin: 0px; font-size: 10px; line-height: normal; padding: 2px 0px 10px 0px;">
                      <a href="mailto:info@wishgeekstechserve.com" style="text-decoration: none; color: #000; font-family:Arial, Helvetica, sans-serif;">
                        <span style="text-decoration: none; color: #0097B2; font-size: 14px;"><i class="fa-regular fa-envelope"></i></span> info@wishgeekstechserve.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="margin: 0px; font-size: 10px; line-height: normal; padding: 2px 0px 10px 0px;font-family: rial, Helvetica, sans-serif;">
                      <a href="https://www.wishgeekstechserve.com" style="text-decoration: none; color: #000;">
                        <span style="text-decoration: none; color: #0097B2 ; font-size: 15px;"><i class="fa-solid fa-globe"></i></span> www.wishgeekstechserve.com</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="margin-left: 30px;"><img src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/IMG_6062+(1).jpg" alt="" width="200px" height=""></div>
          </div>
        </div>
      </body>
      
      </html>
      `,
      title: "Select Template 4 ",
    },
  ];
  const handleTemplateClick = (template) => {
    setSelectedTemplate(template.html);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleModalSave = () => {
    if (emailEditorRef.current?.editor) {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { html } = data;
        console.log("Template saved with HTML content:", html);
      });
    }
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    const selectedValues = selectedOptions
      .map((option) => option.label)
      .join(", ");
    document.getElementById("").innerHTML = `Selected: ${selectedValues}`;
  };

  const options = [
    {
      value: "Uttam@wishgeekstechserve.com",
      label: "Uttam@wishgeekstechserve.com",
    },
    {
      value: "Ankit@wishgeekstechserve.com",
      label: "Ankit@wishgeekstechserve.com",
    },
    {
      value: "Krishnam@wishgeekstechserve.com",
      label: "Krishnam@wishgeekstechserve.com",
    },
    {
      value: "Gokul@wishgeekstechserve.com",
      label: "Gokul@wishgeekstechserve.com",
    },
    {
      value: "Raju@wishgeekstechserve.com",
      label: "Raju@wishgeekstechserve.com",
    },
    {
      value: "Amit@wishgeekstechserve.com",
      label: "Amit@wishgeekstechserve.com",
    },
    {
      value: "Kapil@wishgeekstechserve.com",
      label: "Kapil@wishgeekstechserve.com",
    },
    {
      value: "Manish@wishgeekstechserve.com",
      label: "Manish@wishgeekstechserve.com",
    },
    {
      value: "Sunil@wishgeekstechserve.com",
      label: "Sunil@wishgeekstechserve.com",
    },
    {
      value: "Ravi@wishgeekstechserve.com",
      label: "Ravi@wishgeekstechserve.com",
    },
    {
      value: "Vipin@wishgeekstechserve.com",
      label: "Vipin@wishgeekstechserve.com",
    },
    {
      value: "Kunal@wishgeekstechserve.com",
      label: "Kunal@wishgeekstechserve.com",
    },
  ];
  const handleChange = (selected) => {
    setSelectedOptions(selected);
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
            <div className="flex mt-4">
              <div className="w-full me-6">
                <label htmlFor="Subject">Subject</label>
                <input
                  type="text"
                  id="Subject"
                  name="Subject"
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
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
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="flex mt-4">
              <div className="w-full">
                <label htmlFor="EmailUseTLS"> SMTP Host</label>
                <Select
                  options={options}
                  isMulti
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93c3fd] rounded-md  pl-2
                   focus:border-blue-500 transition-colors duration-300 appearance-none focus:outline-none focus:ring-0"
                  id="Smtphost"
                  name="Smtphost"
                  styles={customStyles}
                  placeholder="SMTP Host"
                />
              </div>
            </div>
            <div className="flex mt-4">
              <div className="w-full">
                <label htmlFor="EmailUseTLS">Sender Email</label>
                <Select
                  options={options}
                  isMulti
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md  pl-2 focus:border-blue-500 transition-colors duration-300 appearance-none focus:outline-none focus:ring-0"
                  id="SenderEmail"
                  name="SenderEmail"
                  styles={customStyles}
                  placeholder="Sender Email"
                />
              </div>
            </div>

            <Editing />

            <div className="container hsyw p-0">
              <h1 className="text-2xl font-bold mt-2">Template</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {templates.map((item) => (
                  <div
                    key={item.id}
                    className="relative mt-3 h-[1080px] border rounded-md cursor-pointer"
                    onClick={() => handleTemplateClick(item)}
                  >
                    <div className="absolute h-full w-full overflow-hidden">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.html }}
                        className="w-full h-full"
                      />
                    </div>
                    <button className="absolute bottom-4 left-0 w-1/2 bg-[#7b2cbf] text-white py-2 mx-3 rounded-md text-center font-bold">
                      {item.title}
                    </button>
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
              <i className="fa-solid fa-xmark"></i>
            </button>
            <EmailEditor
              ref={emailEditorRef}
              onLoad={() => {
                if (newDummy) {
                  emailEditorRef.current?.editor?.loadDesign(dummy);
                }
              }}
            />
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
