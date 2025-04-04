import React, { useEffect, useRef, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Csv from "../../component/csv/csv";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import * as API from "../../api/user";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import csvfile from "../../assests/image/csv/contact.png";
import { Download } from "lucide-react";
const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCsvPreviewOpen, setIsCsvPreviewOpen] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [previewData, setPreviewData] = useState({});
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [contactData, setContactData] = useState([]);
  const [csvContacts, setCsvContacts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [fileName, setFileName] = useState("");

  const [nameInput, setNameInput] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingContacts, setEditingContacts] = useState([]);
  const [isModalEDitOpen, setIsModalEditOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [initialContact, setInitialContact] = useState([]);
  const [originalContacts, setOriginalContacts] = useState([]);

  const downloadCSV = () => {
    // Your CSV data
    const csvContent = `Email,firstName,lastName,companyName
xyz@gmail.com,Mark,Davis,Textiles
abc@yahoo.com,John,Martin,JP morgan
jkl@outlook.com,Max,Clovis,AMD texture
rst@yourdomainname.com,Bryan,Smith,Deiolite`; // Modified to remove spaces and use actual domain

    // Create blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);

    // Create temporary link
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sample.csv");
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  const fetchContacts = async () => {
    try {
      const response = await API.getContactList();
      console.log("response_from_contact", response.data.user_contact_files);
      setContacts(response.data.user_contact_files);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setLoading(false);
    }
  };
  // When opening the edit modal, store the initial contacts
  useEffect(() => {
    setOriginalContacts(JSON.parse(JSON.stringify(editingContacts))); // Deep copy to avoid reference issues
  }, [editingContacts.length]); // Update only when contacts are loaded

  const HandleFileData = (data) => {
    setFileData(data);
  };
  const handleEdit = async (file_id) => {
    setSelectedFileId(file_id);
    try {
      const response = await API.getSingleContactList(file_id);
      console.log("jjj", response.data.contacts);
      setInitialContact(response.data.contacts);
      setEditingContacts(response.data.contacts);
      setIsModalEditOpen(true);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  const handleChange = (index, field, value) => {
    const updatedContacts = [...editingContacts];
    updatedContacts[index].data[field] = value;
    setEditingContacts(updatedContacts);
  };
  const handleSaveEdit = async (isAddingNew) => {
    // Identify changed or newly added contacts
    const updatedContacts = editingContacts.filter((contact, index) => {
      const original = originalContacts[index] || {};
      return (
        !original || // New contact
        contact.data.Email !== original.data?.Email ||
        contact.data.firstName !== original.data?.firstName ||
        contact.data.lastName !== original.data?.lastName ||
        contact.data.companyName !== original.data?.companyName
      );
    });

    if (updatedContacts.length === 0) {
      toast.info("No changes to update.");
      return;
    }

    const formattedContacts = {
      contacts: updatedContacts.map((contact) => ({
        ...(contact.id ? { id: contact.id } : {}),
        data: {
          Email: contact.data.Email,
          firstName: contact.data.firstName,
          lastName: contact.data.lastName,
          companyName: contact.data.companyName,
        },
      })),
    };

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/contact-update/${selectedFileId}/`,
        formattedContacts,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (isAddingNew !== "true") {
        setIsModalEditOpen(false);
        toast.success("Contacts updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error(
        "Error updating contacts:",
        error.response?.data || error.message
      );
      toast.error("Failed to update contacts.");
    }
  };

  const handleDelete = async (file_id) => {
    try {
      const res = await API.deleteSingleContactList(file_id);
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
      const res = await API.getSingleContactList(file_id);
      setPreviewData(res.data);
    } catch (error) { }
    setIsCsvPreviewOpen(true);
  };
  const handleCloseCsvPreview = () => {
    setIsCsvPreviewOpen(false);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
      setFileName(file.name);
    }
  };

  const handleDeleteFile = () => {
    setCsvFile(null);
    setFileName("");
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
      const response = await API.uploadContacts(formData);
      console.log("response_from_uploadContact", response);
      console.log("response_from", response.ok);
      if (response.status === 201) {
        toast.success("File uploaded successfully!");
        setTimeout(() => {
          closeModal();
          fetchContacts();
        }, 1500);
      } else {
        toast.error("Failed to upload file.");
      }
    } catch (error) {
      toast.error("An error occurred while uploading the file.");
    }
  };
  const containerRef = useRef(null);
  const addNew = async () => {
    await handleSaveEdit("true");
    setEditingContacts([
      { data: { firstName: "", lastName: "", Email: "", companyName: "" } },
    ]);
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    fetchContacts();
  }, []);
  return (
    <>
      <div className="container-fluid pt-32 max-h-[100vh] overflow-auto scrollbar">
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-3xl font-bold uppercase">
              Contact Setup
            </h1>
            <button
              className="bg-[#3B82F6] text-white border-[#3B82F6] rounded-md p-2 text-lg font-semibold"
              type="button"
              onClick={openModal}
            >
              Import Contact
            </button>
          </div>
        </div>
        <div className="overflow-x-auto mt-10">
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#3B82F6] text-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-center border cursor-pointer">
                    List Name
                  </th>
                  <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-center border cursor-pointer">
                    Number of Contacts
                  </th>
                  <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-center border cursor-pointer">
                    Creation Date
                  </th>
                  <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-center border cursor-pointer">
                    Action
                  </th>
                </tr>
              </thead>
                      <tbody className="bg-gray-50 divide-y divide-gray-200 items-center justify-center">

        {

      contacts.length === 0 ? ( 
         
        <tr className="animate-pulse">
          <td class="px-6 py-4 text-sm text-black border truncate text-center">
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
          <td class="px-6 py-4 text-sm text-black border truncate text-center">
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
          <td class="px-6 py-4 text-sm text-black border truncate text-center">
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
          <td class="px-6 py-4 text-sm text-black border truncate text-center">
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
        </tr>
   
      

      ) : (

        contacts?.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 text-sm text-black border truncate text-center">
              {item.file_name}
            </td>
            <td className="px-6 py-4 text-sm text-black border truncate text-center">
              {item?.contacts?.length}
            </td>
            <td className="px-6 py-4 text-sm text-black border truncate text-center">
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              }).format(new Date(item?.created_at))}
            </td>
  
            <td className="px-6 py-4 text-sm text-black border space-x-2 flex items-center justify-around">
              <button
                className="text-blue-500 hover:text-blue-700 text-center"
                onClick={() => handleEdit(item.file_id)}
              >
                <FaEdit
                  className="text-center"
                  style={{ fontSize: "20px" }}
                />
              </button>
              <button
                className="text-red-500 hover:text-red-700 text-center"
                onClick={() => handleDelete(item.file_id)}
              >
                <FaTrash
                  className="text-center"
                  style={{ fontSize: "20px" }}
                />
              </button>
              <button
                className="text-black hover:text-black text-center"
                onClick={() => handleCsvPreview(item?.file_id)}
              >
                <FaEye
                  className="text-center"
                  style={{ fontSize: "20px" }}
                />
              </button>
            </td>
          </tr>
        )) 


      )


   


        }

                 
               
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 max-h-[100vh] overflow-auto">
            <div className="bg-white rounded-lg shadow-lg w-full md:w-8/12 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Import Contacts</h2>
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
                      {fileName && (
                        <div className="file-block flex items-center">
                          <div className="file-info flex items-center space-x-2">
                            <span className="material-icons-outlined file-icon">
                              description
                            </span>
                            <span className="file-name">{fileName}</span>
                          </div>
                          <div className="items-center justify-between flex gap-2">
                            {/* <button
                              type="button"
                              className="bg-transparent  text-white  rounded-md"
                            >
                              <FaEye />
                            </button> */}
                            <span
                              className="material-icons remove-file-icon cursor-pointer ml-4 text-red-500"
                              onClick={handleDeleteFile}
                            >
                              delete
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-sm-6 mt-5 md:mt-0">
                      <div className="flex items-center justify-center">
                        <h1 className="text-3xl font-bold">Sample csv</h1>
                        <Download
                          onClick={downloadCSV}
                          className="cursor-pointer ml-4 text-blue-500"
                        />
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
                  Edit Contacts Details
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
                        <th className="px-4 py-2 border">First Name</th>
                        <th className="px-4 py-2 border">Last Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Company Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editingContacts?.map((contact, index) => (
                        <tr key={index} className="text-center">
                          <td className="px-2 py-2 border">
                            <input
                              type="text"
                              value={contact?.data?.firstName || ""}
                              onChange={(e) =>
                                handleChange(index, "firstName", e.target.value)
                              }
                              className="border p-2 w-full text-sm md:text-base"
                            />
                          </td>
                          <td className="px-2 py-2 border">
                            <input
                              type="text"
                              value={contact?.data?.lastName || ""}
                              onChange={(e) =>
                                handleChange(index, "lastName", e.target.value)
                              }
                              className="border p-2 w-full text-sm md:text-base"
                            />
                          </td>
                          <td className="px-2 py-2 border">
                            <input
                              type="email"
                              value={contact?.data?.Email || ""}
                              onChange={(e) =>
                                handleChange(index, "Email", e.target.value)
                              }
                              className="border p-2 w-full text-sm md:text-base"
                            />
                          </td>
                          <td className="px-2 py-2 border">
                            <input
                              type="text"
                              value={contact?.data?.companyName || ""}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "companyName",
                                  e.target.value
                                )
                              }
                              className="border p-2 w-full text-sm md:text-base"
                            />
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
                        Email
                      </th>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border">
                        First Name
                      </th>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border">
                        Last Name
                      </th>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border">
                        Company
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData?.contacts?.map((contact, index) => (
                      <tr key={index}>
                        <td className="px-6 py-3 text-xs text-gray-500 text-center border">
                          {contact?.data?.Email}
                        </td>
                        <td className="px-6 py-3 text-xs text-gray-500 text-center border">
                          {contact?.data?.firstName}
                        </td>
                        <td className="px-6 py-3 text-xs text-gray-500 text-center border">
                          {contact?.data?.lastName}
                        </td>
                        <td className="px-6 py-3 text-xs text-gray-500 text-center border">
                          {contact?.data?.companyName}
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

export default Contact;
