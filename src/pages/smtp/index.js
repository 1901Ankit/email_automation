import React, { useEffect, useState } from "react";
import "./index.css";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../modal";
import * as API from "../../api/smtp";
import { toast } from "react-toastify";

const Smtp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    host: "",
    username: "",
    port: "",
    use_tls: "True",
    password: "",
  });
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingIndex(null);
    setFormData({
      id: "",
      name: "",
      host: "",
      username: "",
      port: "",
      use_tls: "True",
      password: "",
    });
  };
  useEffect(() => {
    const fetchAllSMTPs = async () => {
      try {
        const response = await API.getAllSMTPs({
          user_id: localStorage.getItem("id"),
        });
        setTableData(response.data.servers);
      } catch (error) {
        setTableData([]);
      } finally {
        setLoading(false);
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

    if (
      !formData.name ||
      !formData.host ||
      !formData.username ||
      !formData.port ||
      !formData.password
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const newFormData = {
      id: id,
      name: formData.name,
      host: formData.host,
      username: formData.username,
      password: formData.password,
      port: formData.port,
      use_tls: formData.use_tls,
    };

    try {
      if (isEditing) {
        const response = await API.editSMTPs(newFormData, id);
        const updatedData = [...tableData];
        updatedData[editingIndex] = newFormData;
        setTableData(updatedData);
        toast.success("SMTP updated successfully!");
      } else {
        const response = await API.createSMTPs(newFormData);

        setTableData((prev) => [...prev, newFormData]);
        toast.success("SMTP added successfully!");
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
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error(
        "There was an error processing your request. Please try again."
      );
    }
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
      const response = await API.deleteSMTPs(id);
      setTableData((prev) => prev.filter((_, i) => i !== index));
      toast.success("SMTP entry deleted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Error deleting SMTP entry!");
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <div className="container-fluid  pt-32  max-h-[100vh] overflow-auto">
        {loading ? (
          <div className="loders">
            <div id="loader"></div>
          </div>
        ) : (
          <div className="mb-2">
            <h1 className="text-3xl font-bold uppercase">SMTP Setup</h1>
            <div className="flex items-center justify-between mb-4 mt-3">
              <button
                className="bg-[#7b2cbf] text-white border-[#7b2cbf] rounded-full p-3 text-xl"
                type="button"
                onClick={openModal}
              >
                <FaPlus />
              </button>
            </div>

            <div className="overflow-x-auto">
              <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#7b2cbf] text-white">
                    <tr>
                      <th
                        className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer"
                        onClick={() => requestSort("EmailHost")}
                      >
                        Name of the server
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer"
                        onClick={() => requestSort("EmailHost")}
                      >
                        Host
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer"
                        onClick={() => requestSort("EmailPort")}
                      >
                        Port
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer"
                        onClick={() => requestSort("EmailUseTLS")}
                      >
                        TLS
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer"
                        onClick={() => requestSort("HostUser")}
                      >
                        Email
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer"
                        onClick={() => requestSort("Password")}
                      >
                        Password
                      </th>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border cursor-pointer">
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
                          {data?.use_tls && "True"}
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
                            <FaTrash
                              className=""
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

            <Modal isOpen={isModalOpen} onClose={closeModal} className="">
              <h3 className="font-bold text-lg  text-center">
                {isEditing ? "Edit SMTP Entry" : "Add New SMTP Entry"}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="flex">
                  <div className="w-full me-6">
                    <label
                      htmlFor="EmailHost"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Host
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
                      Port
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
                      TLS
                    </label>
                    <input
                      type="text"
                      id="use_tls"
                      name="use_tls"
                      value="True"
                      readOnly
                      className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0 bg-gray-100"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
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
                    ></input>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="Password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
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
        )}
      </div>
    </>
  );
};

export default Smtp;
