import React, { useState } from "react";
import "./index.css";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../modal";

const Sender = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fromEmail: "",
    displayName: "",
    yourName: "",
    supportEmail: "",
    contactInfo: "",
    senderInfo: "",
  });
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      setTableData((prev) =>
        prev.map((item, index) => (index === editingIndex ? formData : item))
      );
    } else {
      setTableData((prev) => [...prev, formData]);
    }
    setFormData({
      fromEmail: "",
      displayName: "",
      yourName: "",
      supportEmail: "",
      contactInfo: "",
      senderInfo: "",
    });
    closeModal();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = tableData.filter((data) =>
    Object.values(data).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (index) => {
    setFormData(tableData[index]);
    setEditingIndex(index);
    openModal();
  };

  const handleDelete = (index) => {
    setTableData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="container-fluid max-h-[100vh] overflow-scroll mt-5 mx-auto px-3">
        <div className="mb-2">
          <h1 className="text-3xl font-bold">Manage Campaigns</h1>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-[#7b2cbf] text-white border-[#7b2cbf] rounded-full p-3 text-xl"
            type="button"
            onClick={() => {
              setFormData({
                fromEmail: "",
                displayName: "",
                yourName: "",
                supportEmail: "",
                contactInfo: "",
                senderInfo: "",
              });
              setEditingIndex(null);
              openModal();
            }}
          >
            <FaPlus />
          </button>

          <div className="relative w-full max-w-xs">
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2 border rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#7b2cbf] text-white">
              <tr>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("fromEmail")}
                >
                  From email
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("displayName")}
                >
                  Display name
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("yourName")}
                >
                  Your name
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("supportEmail")}
                >
                  Your support email
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("contactInfo")}
                >
                  Contact information
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("senderInfo")}
                >
                  Sender information
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200">
              {sortedData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data.fromEmail}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data.displayName}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data.yourName}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data.supportEmail}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data.contactInfo}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data.senderInfo}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-3"
                      onClick={() => handleEdit(index)}
                    >
                      <FaEdit className="" style={{ fontSize: "20px" }} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrash className="" style={{ fontSize: "20px" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3 className="font-bold">
            {editingIndex !== null
              ? "Edit Contact Information"
              : "Add Contact Information"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex mt-3">
              <div className="w-full me-6">
                <label htmlFor="fromEmail">From email</label>
                <input
                  type="email"
                  id="fromEmail"
                  name="fromEmail"
                  value={formData.fromEmail}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
              <div className="w-full">
                <label htmlFor="displayName">Display name</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
            </div>
            <div className="flex mt-3">
              <div className="w-full me-6">
                <label htmlFor="yourName">Your name</label>
                <input
                  type="text"
                  id="yourName"
                  name="yourName"
                  value={formData.yourName}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
              <div className="w-full">
                <label htmlFor="supportEmail">Support email</label>
                <input
                  type="email"
                  id="supportEmail"
                  name="supportEmail"
                  value={formData.supportEmail}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
            </div>
            <div className="flex mt-3">
              <div className="w-full me-6">
                <label htmlFor="contactInfo">Contact information</label>
                <input
                  type="text"
                  id="contactInfo"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
              <div className="w-full">
                <label htmlFor="senderInfo">Sender information</label>
                <input
                  type="text"
                  id="senderInfo"
                  name="senderInfo"
                  value={formData.senderInfo}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="bg-[#7b2cbf] text-white px-4 py-2 rounded mt-3 transition-colors duration-300"
              >
                {editingIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Sender;
