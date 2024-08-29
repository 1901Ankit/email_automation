import React, { useState } from "react";
import Modal from "../../pages/modal";
import Papa from "papaparse";
import "./csv.css";

const Csv = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [fileData, setFileData] = useState({});
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Define the tabs
  const tabs = ["Tab1", "Tab2", "Tab3"]; // Example tabs array

  const handleFileChange = (e, tab) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      let previewElement = null;

      if (file.type.startsWith("image/")) {
        previewElement = (
          <img src={fileURL} className="file-preview" alt="preview" />
        );
      } else if (file.type.startsWith("video/")) {
        previewElement = (
          <video src={fileURL} className="file-preview" controls />
        );
      } else if (file.type.startsWith("audio/")) {
        previewElement = (
          <audio src={fileURL} className="file-preview" controls />
        );
      } else if (file.type === "application/pdf") {
        previewElement = (
          <iframe src={fileURL} className="file-preview" title="PDF Preview" />
        );
      } else if (file.type === "text/html" || file.type === "text/plain") {
        previewElement = (
          <iframe src={fileURL} className="file-preview" title="File Preview" />
        );
      } else if (file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = () => {
          previewElement = (
            <pre className="file-preview">
              <code>{reader.result}</code>
            </pre>
          );
          setFileData((prevData) => ({
            ...prevData,
            [tab]: {
              name: file.name,
              size: (file.size / 1024).toFixed(2) + " KB",
              preview: previewElement,
              url: fileURL,
            },
          }));
        };
        reader.readAsText(file);
        return; // Prevent setting file data before reading JSON
      } else if (file.type === "text/csv") {
        const reader = new FileReader();
        reader.onload = () => {
          const csvData = Papa.parse(reader.result, { header: true }).data;
          previewElement = (
            <table className="csv-preview">
              <thead>
                <tr>
                  {Object.keys(csvData[0]).map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, cellIndex) => (
                      <td key={cellIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
          setFileData((prevData) => ({
            ...prevData,
            [tab]: {
              name: file.name,
              size: (file.size / 1024).toFixed(2) + " KB",
              preview: previewElement,
              url: fileURL,
            },
          }));
        };
        reader.readAsText(file);
        return; // Prevent setting file data before reading CSV
      } else {
        previewElement = <p>Preview not available for this file type.</p>;
      }

      setFileData((prevData) => ({
        ...prevData,
        [tab]: {
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          preview: previewElement,
          url: fileURL,
        },
      }));
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFileRemove = (tab) => {
    setFileData((prevData) => ({
      ...prevData,
      [tab]: null,
    }));
  };

  const handlePreviewClick = () => {
    console.log("Active Tab Index:", activeTabIndex);
    console.log("Tabs:", tabs);
    console.log("File Data:", fileData);
    if (activeTabIndex === tabs.length - 1) {
      const allData = Object.values(fileData).map((data, index) => (
        <div key={index}>
          <h4>Tab {index + 1}</h4>
          {data?.preview}
          <p>{data?.name}</p>
          <p>{data?.size}</p>
        </div>
      ));
      setModalContent(allData);
      setIsModalOpen(true);
    } else if (fileData[tabs[activeTabIndex]]?.preview) {
      setModalContent(fileData[tabs[activeTabIndex]].preview);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="drag-file-area">
          <span className="material-icons-outlined upload-icon">
            file_upload
          </span>
          <h3 className="dynamic-message">Drag & drop any file here</h3>
          <label className="label">
            or
            <span className="browse-files">
              <input
                type="file"
                className="default-file-input file-input"
                onChange={(e) => handleFileChange(e, tabs[activeTabIndex])}
              />
              <span className="browse-files-text">browse file</span>
              <span className="mx-2">from device</span>
            </span>
          </label>
        </div>
      </div>

      {fileData[tabs[activeTabIndex]] && (
        <div className="container align-items-center justify-center d-flex mt-4">
          <div className="file-block">
            <div className="file-info">
              <span className="material-icons-outlined file-icon">
                description
              </span>
              <span className="file-name">
                {fileData[tabs[activeTabIndex]].name}
              </span>{" "}
              |{" "}
              <span className="file-size">
                {fileData[tabs[activeTabIndex]].size}
              </span>
            </div>
            <span
              className="material-icons remove-file-icon"
              onClick={() => handleFileRemove(tabs[activeTabIndex])}
            >
              delete
            </span>
          </div>
        </div>
      )}

      <div className="button-container">
        {fileData[tabs[activeTabIndex]] && (
          <button
            type="button"
            className="preview-button"
            onClick={handlePreviewClick}
          >
            Preview
          </button>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        {modalContent}
      </Modal>
    </>
  );
};

export default Csv;
