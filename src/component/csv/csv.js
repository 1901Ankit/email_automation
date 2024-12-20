import React, { useState } from "react";
import Modal from "../../pages/modal";
import Papa from "papaparse";
import "./csv.css";

const Csv = ({ csvFile, setCsvFile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
    if (file) {
      const fileURL = URL.createObjectURL(file);
      let previewElement = null;
      if (file.type === "text/csv") {
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
          const fileDetails = {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            csvData: csvData,
          };

          sessionStorage.setItem("csv", JSON.stringify(csvData));

          setFileData({
            name: file.name,
            size: (file.size / 1024).toFixed(2) + " KB",
            preview: previewElement,
            url: fileURL,
          });
        };
        reader.readAsText(file);
        return;
      } else {
        previewElement = <p>Preview not available for this file type.</p>;
      }
      setFileData({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        preview: previewElement,
        url: fileURL,
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleFileRemove = () => {
    setFileData(null);
    setCsvFile(null); // Reset csvFile state as well
    const fileInput = document.querySelector(".file-input");
    if (fileInput) {
      fileInput.value = ""; // Clear the input field
    }
  };

  const handlePreviewClick = () => {
    if (fileData || csvFile) {
      setModalContent(fileData.preview);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="row items-center justify-center mt-3">
          <div className="col-sm-6">
            {" "}
            <div className="drag-file-area">
              <span className="material-icons-outlined upload-icon">
                file_upload
              </span>
              <h3 className="dynamic-message">Drag & Drop any file here (only csv)</h3>
              <label className="label">
                <span className="browse-files">
                  <input
                    type="file"
                    className="default-file-input file-input"
                    onChange={handleFileChange}
                  />
                  <span className="browse-files-text text-center">
                    Browse file
                  </span>
                  <span className="mx-2">from device</span>
                </span>
              </label>
            </div>
          </div>
          <div className="col-sm-6">
            {" "}
            <img src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/dummy+csv+file.png" />
          </div>
        </div>
      </div>

      {csvFile && (
        <div className="container align-items-center justify-center d-flex mt-4">
          <div className="file-block">
            <div className="file-info">
              <span className="material-icons-outlined file-icon">
                description
              </span>
              <span className="file-name">{csvFile.name}</span> |{" "}
              <span className="file-size">{csvFile.size}</span>kb
            </div>
            <span
              className="material-icons remove-file-icon"
              onClick={handleFileRemove}
            >
              delete
            </span>
          </div>
        </div>
      )}
      <div className="button-container">
        {csvFile && (
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
