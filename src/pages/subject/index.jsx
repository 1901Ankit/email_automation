import React, { useEffect, useRef, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Csv from "../../component/csv/csv";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import * as API from "../../api/user";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import csvfile from "../../assests/image/csvfile.png";
const Subject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCsvPreviewOpen, setIsCsvPreviewOpen] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [previewData, setPreviewData] = useState({});
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [contactData, setContactData] = useState([]);
  const [csvContacts, setCsvContacts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingContacts, setEditingContacts] = useState([]);
  const [isModalEDitOpen, setIsModalEditOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [initialContact, setInitialContact] = useState([]);
  const [originalContacts, setOriginalContacts] = useState([]);

 
  const HandleFileData = (data) => {
    setFileData(data);
  };
  const handleEdit = async (file_id) => {
    setSelectedFileId(file_id);
    try {
      const response = await API.getSingleSubjectList(file_id);
      console.log("jjj_for_Edit", response);
      setInitialContact(response.data.data.data ? response.data.data.data : response.data.data);
      setEditingContacts(response.data.data.data?response.data.data.data:response.data.data);
      setIsModalEditOpen(true);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  const handleChange = (index, field, value) => {
    const updatedContacts = [...editingContacts];
    updatedContacts[index][field] = value;
    setEditingContacts(updatedContacts);
  };
  const handleSaveEdit = async () => {
    console.log("editingContacts", editingContacts);
    const updatedContacts = editingContacts.filter((contact, index) => {
      const original = originalContacts[index];
      
      // For new contacts (no corresponding original)
      if (!original) return true;
      
      // For existing contacts, check if Subject changed
      return contact.Subject !== original.Subject;
    });
    console.log("updatedContacts", updatedContacts);
    if (updatedContacts.length === 0) {
      toast.info("No changes to update.");
      return;
    }
    console.log("updated", updatedContacts);
    const formattedData = {
      rows: updatedContacts.map(contact => {
        // For contacts with an id (existing contacts that were updated)
        if (contact.id) {
          return {
            id: contact.id,
            Subject: contact.Subject
          };
        } 
        // For new contacts (without id)
        else {
          return {
            Subject: contact.Subject
          };
        }
      })
    };
 
 
 
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/subject-file/${selectedFileId}/rows/`,
         formattedData ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("res_from_subjects_update", res);
      setIsModalEditOpen(false);
      toast.success("Contacts updated successfully!");
      setOriginalContacts(JSON.parse(JSON.stringify(editingContacts)));
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(
        "Error updating contacts:",
        error.response?.data || error.message
      );
      toast.error("Failed to update contacts.");
    }
  };

  const handleDelete = async (file_id) => {
    console.log("file_id", file_id);
    try {
      const res = await API.deleteSingleSubjectList(file_id);
      console.log("res_from_Deleting_subjects_all", res);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Failed to delete contact.");
    }
  };
  const handleDeleteRow = async (row_id) => {
  
    try {
      const res = await API.deleteSingleSubjectListRow(selectedFileId,row_id);
      console.log("res_from_Deleting_subjects_all", res);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Failed to delete contact.");
    }
  };
  const handleCsvPreview = async (file_id) => {
    try {
      const res = await API.getSingleSubjectList(file_id);
      console.log("res_from_subjects_preview", res);
      setPreviewData(res.data);
    } catch (error) {}
    
    setIsCsvPreviewOpen(true);
  };
  const handleCloseCsvPreview = () => {
    setIsCsvPreviewOpen(false);
  };
  const handleFileChange = (e) => {
    console.log("file", e.target.files[0]);
    setCsvFile(e.target.files[0]);
  };
  const handleSave = async () => {
    if (!nameInput || !csvFile) {
      alert("Please fill in all fields and select a CSV file.");
      return;
    }
    const fileContent = await csvFile.text();
    const rows = fileContent
      .split(/\r?\n/)
      .filter((line) => line.trim() !== "");
    if (rows.length > 1000) {
      alert(
        `CSV file contains ${rows.length} rows, which exceeds the limit of 1000. Please upload a smaller file.`
      );
      return;
    }
    const formData = new FormData();
    formData.append("name", nameInput);
    formData.append("csv_file", csvFile);
    try {
      const response = await API.uploadSubjects(formData);
      console.log("respnse", response);
      if (response.status===201) {
        toast.success("File uploaded successfully!");
        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 1500);
      } else {
        toast.error("Failed to upload file.");
      }
    } catch (error) {
      toast.error("An error occurred while uploading the file.");
    }
  };
  const containerRef = useRef(null);
  const addNew = () => {
    
      setEditingContacts([
        ...editingContacts, // Keep existing contacts
        { Subject: "" }  // Simplified structure
      ]);
  
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await API.getSubjectList();
        // console.log("response_from_subject", response.data);
        setSubjects(response.data.subject_file_list);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);
  return (
    <>
      <div className="container-fluid pt-32 max-h-[100vh] overflow-auto">
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-3xl font-bold uppercase">Subject</h1>
            <button
              className="bg-[#3B82F6] text-white border-[#3B82F6] rounded-md p-2 text-lg font-semibold"
              type="button"
              onClick={openModal}
            >
              Import Subjecs
            </button>
          </div>
        </div>
        <div className="overflow-x-auto mt-10">
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#3B82F6] text-white">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                   Id
                  </th>
                  <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                    List Name
                  </th>
                  {/* <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                    Number of Subject
                  </th> */}
                  <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                    Creation Date
                  </th>
                  <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 divide-y divide-gray-200">
                {subjects?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-xs text-gray-500 border text-center">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 border text-center truncate">
                      {item?.name || "N/A"}
                    </td>
                    {/* <td className="px-6 py-4 text-xs text-gray-500 border text-center">
                      {item?.contacts?.length || 0}
                    </td> */}
                    <td className="px-6 py-4 text-xs text-gray-500 border text-center">
                      {item?.uploaded_at || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 border flex items-center justify-center space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(item.id)}
                      >
                        <FaEdit className="text-lg" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrash className="text-lg" />
                      </button>
                      <button
                        className="text-black hover:text-gray-700"
                        onClick={() => handleCsvPreview(item.id)}
                      >
                        <FaEye className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 max-h-[100vh] overflow-auto">
            <div className="bg-white rounded-lg shadow-lg w-full md:w-8/12 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Import Subjects</h2>
                <button
                  className="text-black font-bold text-4xl rounded-md bg-white p-1 w-8 h-8 flex items-center justify-center"
                  onClick={closeModal}
                >
                  <RxCrossCircled />
                </button>
              </div>
              <form className="p-0">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                  />
                </div>
                <div className="container-fluid">
                  <div className="row items-center justify-center mt-3">
                    <div className="col-sm-6">
                      <div className="flex items-center justify-center">
                        <h1 className="text-3xl font-bold">Upload list</h1>
                      </div>
                      <div className="drag-file-area ">
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
                    <div className="col-sm-6 mt-5 md:mt-0">
                      <div className="flex items-center justify-center">
                        <h1 className="text-3xl font-bold">Sample csv</h1>
                      </div>
                      <img
                        src={csvfile}
                        className="w-full h-full object-contain"
                        alt="CSV File"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-[#3B82F6] text-white px-4 py-2 rounded mt-3 transition-colors duration-300"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isModalEDitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  overflow-auto">
            <div className="bg-white p-6 rounded-lg w-full max-w-[90%] md:max-w-[70%]">
              <div className="flex justify-between items-center ">
                <h2 className="text-xl font-bold text-center">
                  Edit Subject Details
                </h2>
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={addNew}
                >
                  <h2 className="text-xl font-bold">Add New</h2>
                  <FiPlus size={20} />
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto" ref={containerRef}>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm md:text-base">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2 border">Subject</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {editingContacts?.map((contact, index) => (
                        <tr key={index} className="text-center">
                        {/* Subject Input Field */}
                        <td className="px-2 py-2 border w-4/5">
                          <input
                            type="text"
                            value={contact?.Subject || ""}
                            onChange={(e) => handleChange(index, "Subject", e.target.value)}
                            className="border p-2 w-full text-sm md:text-base"
                          />
                        </td>
                      
                        {/* Delete Button */}
                        <td className="px-2 py-2 border w-1/5">
                          <button
                            className="text-red-500 hover:text-red-700 p-1"
                            onClick={() => handleDeleteRow(contact.id)}
                          >
                            <FaTrash className="text-lg" />
                          </button>
                        </td>
                      </tr>
                      
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => setIsModalEditOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CSV Preview Modal */}
        {isCsvPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 max-h-[100vh] overflow-auto">
            <div className="bg-white rounded-lg shadow-lg w-8/12 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">CSV Preview</h2>
                <button
                  className="text-black font-bold text-4xl rounded-md bg-white p-1 w-8 h-8 flex items-center justify-center"
                  onClick={handleCloseCsvPreview}
                >
                  <RxCrossCircled />
                </button>
              </div>
              <div className="overflow-auto max-h-[400px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border">
                        Subject
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData?.data?.data?.map((contact, index) => (
                      <tr key={index}>
                        <td className="px-6 py-3 text-xs text-gray-500 text-center border">
                          {contact.Subject || "No Subject"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Subject;
