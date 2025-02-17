import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Csv from "../../component/csv/csv";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCsvPreviewOpen, setIsCsvPreviewOpen] = useState(false); // New state for CSV preview
  const [fileData, setFileData] = useState(null); // File data (parsed)
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [csvFile, setCsvFile] = useState();
  const [contactData, setContactData] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [csvContacts, setCsvContacts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const HandleFileData = (data) => {
    setFileData(data);
  };

  const handleCsvUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileData = reader.result;
      const rows = fileData.split("\n");
      const contacts = rows.slice(1).map((row) => {
        const [email, firstName, lastName, company] = row.split(",");
        return { email, firstName, lastName, company };
      });
      console.log("contacts", contacts);
      setCsvContacts(contacts.filter((contact) => contact.email));
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    const newContactData = [...contactData];

    if (editIndex !== null) {
      newContactData[editIndex] = {
        listName: nameInput,
        contactCount: csvContacts.length,
        creationDate: new Date().toLocaleDateString(),
      };
    } else {
      newContactData.push({
        listName: nameInput,
        contactCount: csvContacts.length,
        creationDate: new Date().toLocaleDateString(),
      });
    }

    // Save listName to sessionStorage
    sessionStorage.setItem("listName", nameInput);

    setContactData(newContactData);
    closeModal();
    setNameInput("");
    setCsvContacts([]);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNameInput(contactData[index].listName);
    setCsvContacts(Array(contactData[index].contactCount).fill({}));
    openModal();
  };
  

  const handleDelete = (index) => {
    const newContactData = contactData.filter((_, i) => i !== index);
    setContactData(newContactData);
  };

  const handleCsvPreview = () => {
    setIsCsvPreviewOpen(true);
  };

  const handleCloseCsvPreview = () => {
    setIsCsvPreviewOpen(false);
  };

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
              {contactData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate text-center">
                    {item.listName}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate text-center">
                    {fileData?.csvData.length - 1}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate text-center">
                    {item.creationDate}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border space-x-2 flex items-center justify-around">
                    <button
                      className="text-blue-500 hover:text-blue-700 text-center"
                      onClick={() => handleEdit(index)}
                    >
                      <FaEdit
                        className="text-center"
                        style={{ fontSize: "20px" }}
                      />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 text-center"
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrash
                        className="text-center"
                        style={{ fontSize: "20px" }}
                      />
                    </button>
                    <button
                      className="text-black hover:text-black text-center"
                      onClick={handleCsvPreview}
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
                onClick={closeModal}
              >
                <RxCrossCircled />
              </button>
            </div>

            <form className="p-0">
              <div className="flex">
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
              </div>

              <div className="w-full mt-3">
                <Csv
                  csvFile={csvFile}
                  setCsvFile={setCsvFile}
                  handleCsvUpload={handleCsvUpload}
                  sendData={HandleFileData}
                />
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
                  {fileData.csvData.map((contact, index) => (
                    <tr key={index}>
                      <td className="px-6 py-3 text-xs text-gray-500 text-center">
                        {contact.Email}
                      </td>
                      <td className="px-6 py-3 text-xs text-gray-500 text-center">
                        {contact.firstName}
                      </td>
                      <td className="px-6 py-3 text-xs text-gray-500 text-center">
                        {contact.lastName}
                      </td>
                      <td className="px-6 py-3 text-xs text-gray-500 text-center">
                        {contact.company}
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
