import React, { useEffect, useState } from "react";
import Papa from "papaparse"; // For CSV parsing
import "./csv.css";
import csvfile from "../../assests/image/csvfile.png"; // CSV image
import Modalcontact from "../modalcontact";

const Csv = ({ csvFile, setCsvFile,sendData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [modalContent, setModalContent] = useState(null); // Content for modal
  const [ fileData,  setFileData] = useState(null); // Form data
 

   console.log("csvFle",csvFile);
  
  // Handle file upload and parsing
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);

    if (file && file.type === "text/csv") {
      const reader = new FileReader();

      reader.onload = () => {
        const csvData = Papa.parse(reader.result, { header: true }).data;
        console.log("csvData",csvData);
       
        setFileData({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          csvData,
        })
        sendData({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          csvData,
        })
      };
       
      reader.readAsText(file); // Read the file
    }
  };
 
   
  const handleUploadClick = async () => {
    if (fileData) {
      // Create a FormData object to send the file data in a POST request
      const formData = new FormData();
      formData.append("file", csvFile); // Append the file

      // You can replace this URL with your actual backend endpoint
      const uploadUrl = "/upload"; // Example endpoint

      try {
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("File uploaded successfully!");
        } else {
          alert("Error uploading file.");
        }
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Error uploading file.");
      }
    } else {
      alert("Please select a valid CSV file.");
    }
  };

 
  const handlePreviewClick = () => {
    if (fileData && fileData.csvData) {
      setModalContent(
        <div className="overflow-auto">
          <table className="border-collapse border border-gray-300 w-full mt-3">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(fileData.csvData[0] || {}).map((header, idx) => (
                  <th
                    key={idx}
                    className="border border-gray-300 px-2 text-center font-bold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fileData.csvData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 text-[13px] font-normal"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      setIsModalOpen(true);
    }
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  // Remove uploaded file
  const handleFileRemove = () => {
    setFileData(null);
    setCsvFile(null);

    const fileInput = document.querySelector(".file-input");
    if (fileInput) fileInput.value = ""; // Clear input field
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row items-center justify-center mt-3">
          <div className="col-sm-6">
            <div className="drag-file-area">
              <span className="material-icons-outlined upload-icon">
                file_upload
              </span>
              <h3 className="dynamic-message">
                Drag & Drop any file here (only CSV)
              </h3>
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
            <img
              src={csvfile}
              className="w-full h-full object-contain"
              alt="CSV File"
            />
          </div>
        </div>
      </div>

      {fileData && (
        <div className="container flex items-center justify-between mt-4">
          {/* File Information Block */}
          <div className="file-block flex items-center">
            <div className="file-info flex items-center space-x-2">
              <span className="material-icons-outlined file-icon">
                description
              </span>
              <span className="file-name">{csvFile.name}</span> |{" "}
              <span className="file-size">{csvFile.size}</span>kb
            </div>
            <span
              className="material-icons remove-file-icon cursor-pointer ml-4"
              onClick={handleFileRemove}
            >
              delete
            </span>
          </div>

          <div>
            <button
              type="button"
              className="preview-button bg-[#7b2cbf] text-white px-4 py-2 rounded-md"
              onClick={handlePreviewClick}
            >
              Preview
            </button>
          </div>
          {/* Upload Button */}
          <div>
            <button
              type="button"
              className="preview-button bg-[#7b2cbf] text-white px-4 py-2 rounded-md"
              onClick={handleUploadClick}
            >
              Upload
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modalcontact
        isOpen={isModalOpen}
        onClose={handleModalClose}
        className="flex items-center justify-between p-4"
      >
        <div className="w-full h-fit" style={{ height: "100%" }}>
          {modalContent}
        </div>
      </Modalcontact>
    </>
  );
};

export default Csv;
