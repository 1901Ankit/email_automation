import React, { useEffect, useState } from "react";
import "./index.css";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../modal";
import * as API from "../../api/sender";

const UserSelect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedSender, setSelectedSender] = useState("");
  const [selectedSenderEmail, setSelectedSenderEmail] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
    setSelectedSender("");
    setSelectedSenderEmail("");
  };

  useEffect(() => {
    const fetchAllSenders = async () => {
      try {
        const response = await API.getAllSenders({user_id:localStorage.getItem("id")});
        console.log(response.data);
        
        setTableData(response.data.senders);
      } catch (error) {
        console.log(error);
        setTableData([]);
      }
    };
    fetchAllSenders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = {
      name: selectedSender,
      email: selectedSenderEmail,
    };

    if (isEditing) {
      const response = await API.editSenders(newFormData, selectedId);
      console.log(response);

      const updatedData = [...tableData];
      updatedData[editingIndex] = newFormData;
      setTableData(updatedData);
    } else {
      const response = await API.createSenders(newFormData);
      console.log(response);
      setTableData((prev) => [...prev, newFormData]);
    }
    closeModal();
  };

  const handleEdit = (index, id) => {
    setSelectedSender(tableData[index].name);
    setSelectedSenderEmail(tableData[index].email);
    setEditingIndex(index);
    setSelectedId(id);
    setIsEditing(true);
    openModal();
  };

  const handleDelete = async (index, id) => {
    try {
      const response = await API.deleteSenders(id);
      setTableData((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = tableData.filter((data) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <>
      <div className="container-fluid max-h-[100vh] overflow-scroll mt-5 mx-auto px-3">
        <div className="mb-2">
          <h1 className="text-3xl font-bold">Sender Information</h1>
        </div>
        <div className="flex items-center justify-between mb-4 mt-3">
          <button
            className="bg-[#7b2cbf] text-white border-[#7b2cbf] rounded-full p-3 text-xl"
            type="button"
            onClick={openModal}
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
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer">
                  Sender Name
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer">
                  Sender Email
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200">
              {filteredData.map((data, i) => (
                <tr key={data.id}>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data.name}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data.email}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border flex space-x-2">
                    <button
                      onClick={() => handleEdit(i, data.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit style={{ fontSize: "20px" }} />
                    </button>
                    <button
                      onClick={() => handleDelete(i, data.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash style={{ fontSize: "20px" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3 className="font-bold text-lg mb-4 text-center">
            {isEditing ? "Edit Sender Entry" : "Add New Sender Entry"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex mt-3">
              <div className="w-full me-6">
                <label htmlFor="SenderName">Sender Name</label>
                <input
                  type="text"
                  id="SenderName"
                  name="SenderName"
                  value={selectedSender}
                  onChange={(e) => setSelectedSender(e.target.value)}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 appearance-none focus:outline-none focus:ring-0"
                />
              </div>

              <div className="w-full">
                <label htmlFor="SenderEmail">Sender Email</label>
                <input
                  type="email"
                  id="SenderEmail"
                  name="SenderEmail"
                  value={selectedSenderEmail}
                  onChange={(e) => setSelectedSenderEmail(e.target.value)}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 appearance-none focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="bg-[#7b2cbf] text-white px-4 py-2 rounded mt-3 transition-colors duration-300"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default UserSelect;
