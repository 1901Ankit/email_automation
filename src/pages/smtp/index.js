import React, { useEffect, useState } from "react";
import "./index.css";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../modal";
import * as API from "../../api/smtp"

const Smtp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [id, setId] = useState("")
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    host: "",
    username: "",
    port: "",
    use_tls: "false",
    password: "",
  });
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
  };
  useEffect(() => {
    const fetchAllSMTPs = async () => {
      try {
        const response = await API.getAllSMTPs({ user_id: localStorage.getItem('id') });
        setTableData(response.data.servers);
      } catch (error) {
        console.log(error);
        setTableData([]);
      }
    };
    fetchAllSMTPs();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = {
      id: id,
      name: formData.name,
      host: formData.host,
      username: formData.username,
      password: formData.password,
      port: formData.port,
      use_tls: formData.use_tls,
    }

    if (isEditing) {
      const response = await API.editSMTPs(newFormData, id)
      const updatedData = [...tableData];
      updatedData[editingIndex] = formData;
      setTableData(updatedData);
      setIsEditing(false);
    } else {
      const response = await API.createSMTPs(newFormData)
      console.log(response.data);
      setTableData((prev) => [...prev, formData]);
    }
    setFormData({
      id: "",
      name: "",
      host: "",
      username: "",
      port: "",
      use_tls: "false",
      password: "",
    });
    closeModal();
  };

  const handleEdit = (index, id) => {
    setFormData(tableData[index]);
    setId(id);
    setEditingIndex(index);
    setIsEditing(true);
    openModal();
  };

  const handleDelete = async (index, id) => {
    try {
      const response = await API.deleteSMTPs(id)
      setTableData((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.log(error);

    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const filteredData = tableData.filter((data) =>
  //  { console.log(data);

  //    Object.values(data).some((value) =>
  //   { console.log(value);

  //     value.toLowerCase().includes(searchQuery.toLowerCase())}
  //   )}
  // );

  // const sortedData = React.useMemo(() => {
  //   let sortableData = [...filteredData];
  //   if (sortConfig.key !== null) {
  //     sortableData.sort((a, b) => {
  //       if (a[sortConfig.key] < b[sortConfig.key]) {
  //         return sortConfig.direction === "ascending" ? -1 : 1;
  //       }
  //       if (a[sortConfig.key] > b[sortConfig.key]) {
  //         return sortConfig.direction === "ascending" ? 1 : -1;
  //       }
  //       return 0;
  //     });
  //   }
  //   return sortableData;
  // }, [filteredData, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <div className="container mx-auto mt-5 px-3">
        <div className="mb-2">
          <h1 className="text-3xl font-bold">SMTP Setup</h1>
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
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("EmailHost")}
                >
                  Name of the server
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("EmailHost")}
                >
                  Email Host
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("EmailPort")}
                >
                  Email Port
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("EmailUseTLS")}
                >
                  Email Use TLS
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("HostUser")}
                >
                  Host Email Address
                </th>
                <th
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border cursor-pointer"
                  onClick={() => requestSort("Password")}
                >
                  Password
                </th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-left border">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200">
              {tableData.map((data, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data.name}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data.host}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data.port}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data?.use_tls ? "True" : "False"}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    {data.username}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border truncate">
                    ***************
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 border flex space-x-2">
                    <button
                      onClick={() => handleEdit(i, data.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit className="" style={{ fontSize: "20px" }} />
                    </button>
                    <button
                      onClick={() => handleDelete(i, data.id)}
                      className="text-red-500 hover:text-red-700"
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
          <h3 className="font-bold text-lg mb-4 text-center">
            {isEditing ? "Edit SMTP Entry" : "Add New SMTP Entry"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex mt-3">
              <div className="w-full me-6">
                <label
                  htmlFor="EmailHost"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Host
                </label>
                <input
                  type="text"
                  id="host"
                  name="host"
                  value={formData.host}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="EmailPort"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Port
                </label>
                <input
                  type="number"
                  id="port"
                  name="port"
                  value={formData.port}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            <div className="flex mt-4">
              <div className="w-full me-6">
                <label
                  htmlFor="EmailUseTLS"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Use TLS
                </label>
                <select
                  id="use_tls"
                  name="use_tls"
                  value={formData.use_tls}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 appearance-none focus:outline-none focus:ring-0"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Host Email Address
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            <div className="flex mt-4">
              <div className="w-full me-6">
                <label
                  htmlFor="EmailUseTLS"
                  className="block text-sm font-medium text-gray-700"
                >
                  Give a name of your server
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 appearance-none focus:outline-none focus:ring-0"
                >
                </input>
              </div>
              <div className="w-full">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Host Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
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

export default Smtp;
