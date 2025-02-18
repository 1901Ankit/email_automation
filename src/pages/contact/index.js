import React, { useEffect, useRef, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Csv from "../../component/csv/csv";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import * as API from "../../api/user";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import csvfile from "../../assests/image/csvfile.png"; // CSV image

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCsvPreviewOpen, setIsCsvPreviewOpen] = useState(false); // New state for CSV preview
  const [fileData, setFileData] = useState(null); // File data (parsed)
  const [previewData, setPreviewData] = useState({});
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [contactData, setContactData] = useState([]);

  const [csvContacts, setCsvContacts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingContacts, setEditingContacts] = useState([]);
  const [isModalEDitOpen, setIsModalEditOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const HandleFileData = (data) => {
    setFileData(data);
  };
  const handleEdit = async (file_id) => {
    setSelectedFileId(file_id);
    try {
      const response = await API.getSingleContactList(file_id);
      setEditingContacts(response.data.contacts); // Store fetched contacts in state
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

  const handleSaveEdit = async () => {
    // Transform `editingContacts` to match the required API structure
    const formattedContacts = {
      contacts: editingContacts.map((contact) => ({
        ...(contact.id ? { id: contact.id } : {}), // Include `id` only if it exists
        data: {
          Email: contact.data.Email,
          firstName: contact.data.firstName,
          lastName: contact.data.lastName,
          company: contact.data.companyName,
        },
      })),
    };

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/contact-update/${selectedFileId}/`, // Removed trailing slash
        formattedContacts, // Data should be in the second parameter
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Ensure token is passed correctly
          },
        }
      );

      console.log("Response:", res.data);
      setIsModalEditOpen(false);

      // Show success toast
      toast.success("Contacts updated successfully!");

      // Reload page after the toast
      setTimeout(() => {
        window.location.reload();
      }, 1500); // Wait for 1.5 seconds before reloading
    } catch (error) {
      console.error(
        "Error updating contacts:",
        error.response?.data || error.message
      );
      toast.error("Failed to update contacts.");
    }
  };

  // const handleCsvUpload = (file) => {
  //   console.log("file", file);
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const fileData = reader.result;
  //     const rows = fileData.split("\n");
  //     const contacts = rows.slice(1).map((row) => {
  //       const [email, firstName, lastName, company] = row.split(",");
  //       return { email, firstName, lastName, company };
  //     });
  //     console.log("contacts", contacts);
  //     setCsvContacts(contacts.filter((contact) => contact.email));
  //   };
  //   reader.readAsText(file);
  // };

  // const handleSave = () => {
  //   const newContactData = [...contactData];
  //   console.log(newContactData);
  //   if (editIndex !== null) {
  //     newContactData[editIndex] = {
  //       listName: nameInput,
  //       contactCount: csvContacts.length,
  //       creationDate: new Date().toLocaleDateString(),
  //     };
  //   } else {
  //     newContactData.push({
  //       listName: nameInput,
  //       contactCount: csvContacts.length,
  //       creationDate: new Date().toLocaleDateString(),
  //     });
  //   }

  //   // Save listName to sessionStorage
  //   sessionStorage.setItem("listName", nameInput);

  //   setContactData(newContactData);
  //   closeModal();
  //   setNameInput("");
  //   setCsvContacts([]);
  //   setEditIndex(null);
  // };

  const handleDelete = async (file_id) => {
    try {
      const res = await API.deleteSingleContactList(file_id);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to delete contact.");
    }
  };
  const handleCsvPreview = async (file_id) => {
    console.log("hey i am from csv preview");
    try {
      const res = await API.getSingleContactList(file_id);
      setPreviewData(res.data);
    } catch (error) {}
    setIsCsvPreviewOpen(true);
  };

  const handleCloseCsvPreview = () => {
    setIsCsvPreviewOpen(false);
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!nameInput || !csvFile) {
      alert("Please fill in all fields and select a CSV file.");
      return;
    }
    const formData = new FormData();
    formData.append("name", nameInput);
    formData.append("csv_file", csvFile);
    try {
      const response = await API.uploadContacts(formData);
      console.log("response", response);
      if (response.ok) {
        toast.success("File uploaded successfully!");
        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.log("errr", error);
      toast.error("An error occurred while uploading the file.");
    }
  };

  const containerRef = useRef(null);
  const addNew = () => {
    setEditingContacts([
      ...editingContacts,
      { data: { firstName: "", lastName: "", Email: "", companyName: "" } },
    ]);
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {}, [previewData]);

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
  }, [handleSave]);  
  console.log("prev",previewData);
  return (
    <div className="container-fluid pt-32 max-h-[100vh] overflow-auto">
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold uppercase">Contact Setup</h1>
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
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                  List Name
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                  Number of Contacts
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                  Creation Date
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200 items-center justify-center">
              {contacts.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate text-center">
                    {item.file_name}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate text-center">
                    {item?.contacts?.length}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate text-center">
                    {item?.created_at}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border space-x-2 flex items-center justify-around">
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
              <h2 className="text-xl font-bold">Import Contacts</h2>
              <button
                className="text-black font-bold text-4xl rounded-md bg-white p-1 w-8 h-8 flex items-center justify-center"
                onClick={closeModal} >
                <RxCrossCircled />
              </button>
            </div>
            <form className="p-0">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto">
          <div className="bg-white p-6 rounded-lg w-full max-w-[90%]  md:max-w-[65%] mt-20">
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
                        <td className="px-4 py-2 border">
                          <input
                            type="text"
                            value={contact?.data?.firstName || ""}
                            onChange={(e) =>
                              handleChange(index, "firstName", e.target.value)
                            }
                            className="border p-2 w-full text-sm md:text-base"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="text"
                            value={contact?.data?.lastName || ""}
                            onChange={(e) =>
                              handleChange(index, "lastName", e.target.value)
                            }
                            className="border p-2 w-full text-sm md:text-base"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="email"
                            value={contact?.data?.Email || ""}
                            onChange={(e) =>
                              handleChange(index, "Email", e.target.value)
                            }
                            className="border p-2 w-full text-sm md:text-base"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="text"
                            value={contact?.data?.companyName || ""}
                            onChange={(e) =>
                              handleChange(index, "companyName", e.target.value)
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
                  {console.log("csvcontacts", csvContacts)}
                  {previewData?.contacts?.map((contact, index) => (
                    <tr key={index}>
                      <td className="px-6 py-3 text-xs text-gray-500 text-center">
                        {contact?.data?.Email}
                      </td>
                      <td className="px-6 py-3 text-xs text-gray-500 text-center">
                        {contact?.data?.firstName}
                      </td>
                      <td className="px-6 py-3 text-xs text-gray-500 text-center">
                        {contact?.data?.lastName}
                      </td>
                      <td className="px-6 py-3 text-xs text-gray-500 text-center">
                        {contact?.data?.company}
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
  );
};

export default Contact;
