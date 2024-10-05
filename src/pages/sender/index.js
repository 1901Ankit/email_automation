import React, { useState, useEffect } from "react";
import "./index.css";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../modal";
import axios from "axios";
import * as SenderInfoAPI from "../../api/sender";


const Sender = () => {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    YourCompany: "",
    displayName: "",
    yourName: "",
    supportEmail: "",
    contactInfo: "",
    WebsiteURL: "",
  });
  const [errors, setErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortKey, setSortKey] = useState("YourCompany");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await SenderInfoAPI.getAllSenders({ user_id: sessionStorage.getItem('id') });
      
      setTableData(response.data.senders);
    } catch (error) {
      if (error.response) {
      } else if (error.request) {
      } else {
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.YourCompany) newErrors.YourCompany = "From Email is required";
    if (!formData.displayName)
      newErrors.displayName = "Display Name is required";
    if (!formData.yourName) newErrors.yourName = "Your Name is required";
    if (!formData.supportEmail)
      newErrors.supportEmail = "Support Email  is required";
    if (!formData.contactInfo)
      newErrors.contactInfo = "Contact Info is required";
    if (!formData.WebsiteURL) newErrors.WebsiteURL = "Sender Info is required";

    if (Object.keys(newErrors).length === 0) {
      try {
        const formData = new FormData();
        if (editingIndex !== null) {
          const response = await SenderInfoAPI.editSenders(formData, tableData[editingIndex].id);
            setTableData((prev) =>
              prev.map((item, index) =>
                index === editingIndex ? response.data : item
              )
            );
        } else {
         const  response = await SenderInfoAPI.createSenders(formData)
          setTableData((prev) => [...prev, response.data]);
        }

        setFormData({
          YourCompany: "",
          displayName: "",
          yourName: "",
          supportEmail: "",
          contactInfo: "",
          WebsiteURL: "",
        });
        setEditingIndex(null);
        setIsModalOpen(false);
      } catch (error) {
        if (error.response) {
        } else if (error.request) {
        } else {
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const filteredData = tableData.filter((item) =>
  //   Object.values(item).some((val) =>
  //     val.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // );

  const handleEdit = (index) => {
    setFormData(tableData[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    // try {
    //   await axios.delete(`${API_URL}/${id}/`);
    //   setTableData((prev) => prev.filter((item) => item.id !== id));
    // } catch (error) { }
  };

  const requestSort = (key) => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    setSortKey(key);
    setTableData((prev) =>
      [...prev].sort((a, b) => {
        if (a[key] < b[key]) return newSortDirection === "asc" ? -1 : 1;
        if (a[key] > b[key]) return newSortDirection === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  const renderTableRows = () => {
    return tableData.map((item, index) => (
      <tr key={item.id}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {item.YourCompany}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {item.displayName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {item.name|| item.yourName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          { item.email|| item.supportEmail}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {item.contactInfo}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {item.WebsiteURL}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button
            onClick={() => handleEdit(index)}
            className="text-blue-600 hover:text-blue-900"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-600 hover:text-red-900 ml-2"
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      YourCompany: "",
      displayName: "",
      yourName: "",
      supportEmail: "",
      contactInfo: "",
      WebsiteURL: "",
    });
    setEditingIndex(null);
  };

  return (
    <>
      <div className="container-fluid max-h-[100vh] overflow-scroll mt-5 mx-auto px-3">
        <div className="mb-2">
          <h1 className="text-3xl font-bold">Template Information</h1>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-[#7b2cbf] text-white border-[#7b2cbf] rounded-full p-3 text-xl"
            type="button"
            onClick={() => {
              setFormData({
                YourCompany: "",
                displayName: "",
                yourName: "",
                supportEmail: "",
                contactInfo: "",
                WebsiteURL: "",
              });
              setEditingIndex(null);
              setIsModalOpen(true);
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
                  onClick={() => requestSort("YourCompany")}
                >
                  Your Company
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("displayName")}
                >
                  Display Name
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("yourName")}
                >
                  Your Name
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("supportEmail")}
                >
                  Support Email
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("contactInfo")}
                >
                  Contact Information
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("WebsiteURL")}
                >
                  Website URL
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {renderTableRows()}
            </tbody>
          </table>
        </div>

      </div>


      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3 className="font-bold text-lg text-center">
            {isEditing ? "Edit SMTP Entry" : "Add  Sender Entry"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex ">
              <div className="w-full me-6">
                <label
                  htmlFor="YourCompany "
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Company
                </label>
                <input
                  type="email"
                  id="YourCompany"
                  name="YourCompany"
                  value={formData.YourCompany}
                  onChange={handleChange}
                  className={`block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2  transition-colors duration-300 focus:outline-none focus:ring-0 ${errors.YourCompany ? "border-red-500" : ""
                    }`}
                />
                {errors.YourCompany && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.YourCompany}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="displayName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className={`block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2  transition-colors duration-300 focus:outline-none focus:ring-0${errors.displayName ? "border-red-500" : ""
                    }`}
                />
                {errors.displayName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.displayName}
                  </p>
                )}
              </div>
            </div>

            <div className="flex mt-3">
              <div className="w-full me-6">
                <label
                  htmlFor="yourName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="yourName"
                  name="yourName"
                  value={formData.yourName}
                  onChange={handleChange}
                  className={`block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2  transition-colors duration-300 focus:outline-none focus:ring-0${errors.yourName ? "border-red-500" : ""
                    }`}
                />
                {errors.yourName && (
                  <p className="text-red-500 text-sm mt-1">{errors.yourName}</p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="supportEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Support Email
                </label>
                <input
                  type="email"
                  id="supportEmail"
                  name="supportEmail"
                  value={formData.supportEmail}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2  transition-colors duration-300 focus:outline-none focus:ring-0 "
                />
                {errors.supportEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.supportEmail}
                  </p>
                )}
              </div>
            </div>

            <div className="flex mt-3">
              <div className="w-full me-6">
                <label
                  htmlFor="contactInfo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Information
                </label>
                <input
                  type="number"
                  id="contactInfo"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2  transition-colors duration-300 focus:outline-none focus:ring-0 "
                  maxLength={10}
                />
                {errors.contactInfo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactInfo}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="WebsiteURL"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website URL
                </label>
                <input
                  type="text"
                  id="WebsiteURL"
                  name="WebsiteURL"
                  value={formData.WebsiteURL}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2  transition-colors duration-300 focus:outline-none focus:ring-0 "
                />
                {errors.WebsiteURL && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.WebsiteURL}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-1 flex justify-end">
              <button
                type="submit"
                className="bg-[#7b2cbf] text-white px-4 py-2 rounded mt-2 transition-colors duration-300"
              >
                {editingIndex !== null ? "Update" : "Add"} Sender
              </button>
            </div>
          </form>
        </Modal>
      )}



    </>
  );
};

export default Sender;
