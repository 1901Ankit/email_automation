import React, { useEffect, useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";

import * as API from "../../api/user";
import Select from "react-select";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
const MangeCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [contactLists, setContactLists] = useState({});
  const [isEditModel, setIsEditModel] = useState(false);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    display_name: "John Doe",
    campaign_name: "Sample Campaign",
    delay_seconds: 5,
    subject: "Welcome Email",
  });

  const [options, setOptions] = useState({
    smtps: [],
  });

  // State for contact lists
  const [contacts, setContacts] = useState([]);

  // Sample data for demonstration
  const availableSmtps = [
    { value: "smtp1", label: "support@company.com" },
    { value: "smtp2", label: "sales@company.com" },
    { value: "smtp3", label: "marketing@company.com" },
  ];

  const availableContacts = [
    { file_id: "list1", file_name: "Customers List" },
    { file_id: "list2", file_name: "Newsletter Subscribers" },
    { file_id: "list3", file_name: "Leads from Conference" },
  ];

  // Function to handle saving the form
  const handleSaveChanges = () => {
    const isValid =
      details.display_name &&
      details.campaign_name &&
      details.subject &&
      details.delay_seconds >= 0 &&
      options.smtps.length > 0 &&
      contacts.length > 0;

    if (isValid) {
      console.log("Saving campaign with details:", {
        details,
        smtps: options.smtps,
        contacts,
      });
      setIsEditModel(false);
    } else {
      alert("Please complete all required fields correctly");
    }
  };

  // Function to open dialog with pre-filled data (if editing existing campaign)
  const openEditDialog = (existingCampaign = null) => {
    if (existingCampaign) {
      setDetails({
        display_name: existingCampaign.display_name || "",
        campaign_name: existingCampaign.campaign_name || "",
        delay_seconds: existingCampaign.delay_seconds || 5,
        subject: existingCampaign.subject || "",
      });
      setOptions({
        smtps: existingCampaign.smtps || [],
      });
      setContacts(existingCampaign.contacts || []);
    } else {
      // Reset form for new campaign
      setDetails({
        display_name: "",
        campaign_name: "",
        delay_seconds: 5,
        subject: "",
      });
      setOptions({
        smtps: [],
      });
      setContacts([]);
    }
    setIsEditModel(true);
  };
  useEffect(() => {
    async function getAllCampaigns() {
      try {
        const res = await API.getAllCampigns();
        if (res?.data) {
          setCampaigns(res.data);
          toast.success("Campaigns loaded successfully");
        } else {
          toast.error("No data received");
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);

        // Handling Axios errors
        if (error.response) {
          // Server responded with a status code outside 2xx
          toast.error(error.response.data.error || "Server error occurred");
        } else if (error.request) {
          // No response received
          toast.error("No response from server. Please check your network.");
        } else {
          // Other errors (e.g., setup issues)
          toast.error("An unexpected error occurred");
        }
      }
    }

    getAllCampaigns();
  }, []);

  useEffect(() => {
    async function fetchContacts() {
      const contactData = {};
      for (const campaign of campaigns) {
        if (campaign.contact_list) {
          try {
            const res = await API.getSingleContactList(campaign.contact_list);
            console.log("res_for_contact", res);
            contactData[campaign.contact_list] = {
              count: res.data.contacts.length,
              file_name: res.data.file_name,
            };
          } catch (error) {
            console.error(
              `Error fetching contacts for ${campaign.contact_list}:`,
              error
            );
          }
        }
      }
      setContactLists(contactData);
    }

    if (campaigns.length > 0) {
      fetchContacts();
    }
  }, [campaigns]);
  const onEdit = async (id) => {
    try {
      const res = await API.getSingleCampigns(id);
      console.log("res_from_compainnes", res);

      toast.success("Campaign edited successfully!"); // Success message

      setIsEditModel(true);

      setTimeout(() => {
        router.reload(); // Page reload after showing toast
      }, 1000); // 1 sec delay to let toast be visible
    } catch (error) {
      console.log("errors", error);
      toast.error("Failed to edit campaign"); // Error message
    }
  };
  const onDelete = async (id) => {
    if (!id) {
      toast.error("Invalid campaign ID");
      return;
    }

    try {
      const res = await API.deleteCampigns(id);

      if (res && res.data && res.data.status) {
        toast.success(res.data.status);
        setTimeout(() => {
          router.reload(); // Page ko reload karega
        }, 1000); // Thoda delay diya taaki toast visible rahe
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);

      if (error.response) {
        // Server responded with an error status code
        toast.error(
          error.response.data?.message || "Failed to delete campaign"
        );
      } else if (error.request) {
        // No response from server
        toast.error("No response from server. Please check your network.");
      } else {
        // Other unexpected errors
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container-fluid  pt-24  max-h-[100vh] overflow-auto">
      <div className="flex items-center justify-between mt-2">
        <h1 className="text-3xl font-bold uppercase">Manage Campaigns</h1>
        <button
          className="bg-[#3B82F6] text-white border-[#3B82F6] rounded-md p-2 text-lg font-semibold"
          type="button"
          onClick={() => navigate("/detail")}
        >
          Create Campaigns
        </button>
      </div>

      {/* //show all Campaigns */}
      <div className="overflow-x-auto mt-4">
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-[#3B82F6] text-white">
                <th class="border border-gray-400 px-4 py-2 text-left">
                  Campaign Name
                </th>
                <th class="border border-gray-400 px-4 py-2 text-left">
                  {" "}
                  Contacts
                </th>
                <th class="border border-gray-400 px-4 py-2 text-left">
                  {" "}
                  File Name
                </th>
                <th class="border border-gray-400 px-4 py-2 text-left">
                  Template{" "}
                </th>
                <th class="border border-gray-400 px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns?.map((comp) => (
                <tr class="bg-gray-100 hover:bg-gray-200">
                  <td class="border border-gray-400 px-4 py-2">
                    {comp.display_name}
                  </td>
                  <td class="border border-gray-400 px-4 py-2">
                    {contactLists[comp?.contact_list]
                      ? contactLists[comp.contact_list].count
                      : "Loading..."}
                  </td>
                  <td class="border border-gray-400 px-4 py-2">
                    {contactLists[comp?.contact_list]
                      ? contactLists[comp.contact_list].file_name
                      : "Loading..."}
                  </td>
                  <td class="border border-gray-400 px-4 py-2">{comp.name}</td>
                  <td className=" px-4 py-2 flex gap-10">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition"
                      onClick={() => onEdit(comp?.id)}
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => onDelete(comp?.id)}
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog
        open={isEditModel}
        onClose={() => setIsEditModel(false)}
        className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 overflow-y-auto"
      >
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-[95%] max-w-xl transform transition-all duration-300 ease-in-out">
          {/* <div className="px-6 py-5 border-b dark:border-gray-700 flex items-center justify-between">
            <div>
              <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
                Edit Campaign Details
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Customize your campaign settings below
              </Dialog.Description>
            </div>
            <button
              onClick={() => setIsEditModel(false)}
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Close dialog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div> */}

          <div className="flex justify-around items-center mt-5">
            <h3 className="font-bold text-xl text-center flex-1">
              Edit Campaign Details
            </h3>
            <button
              onClick={() => setIsEditModel(false)}
              className="text-gray-500 hover:text-red-600 transition p-2"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className=" px-3 max-h-[70vh] overflow-y-auto ">
            {/* Sender (SMTP) */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
              {/* Sender */}
              <div className="w-full">
                <label
                  htmlFor="sender-select"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sender
                </label>
                <Select
                  inputId="sender-select"
                  options={availableSmtps}
                  isMulti
                  value={options.smtps}
                  onChange={(selectedOptions) => {
                    setOptions({ ...options, smtps: selectedOptions });
                  }}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select sender accounts"
                  noOptionsMessage={() => "No sender accounts available"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: "#93c3fd",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#4f8af7",
                      },
                    }),
                  }}
                />
                {options.smtps.length === 0 && (
                  <p className="text-xs text-orange-600 mt-1">
                    Please select at least one sender
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {/* Recipient */}{" "}
              <div className="w-full space-y-2">
                <label
                  htmlFor="recipient-select"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipients
                </label>
                <Select
                  inputId="recipient-select"
                  options={availableContacts.map((c) => ({
                    value: c.file_id,
                    label: c.file_name,
                  }))}
                  isMulti
                  value={contacts}
                  onChange={(selectedContacts) => {
                    setContacts(selectedContacts);
                  }}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select contact lists"
                  noOptionsMessage={() => "No contact lists available"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: "#93c3fd",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#4f8af7",
                      },
                    }),
                  }}
                />
                {contacts.length === 0 && (
                  <p className="text-xs text-orange-600 mt-1">
                    Please select at least one recipient
                  </p>
                )}
              </div>
            </div>

            {/* Display Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Display Name */}
              <div className="w-full space-y-2">
                <label
                  htmlFor="display-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Display Name
                </label>
                <input
                  id="display-name"
                  type="text"
                  value={details.display_name}
                  onChange={(e) =>
                    setDetails({ ...details, display_name: e.target.value })
                  }
                  className="block w-full mt-1 border border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                  placeholder="Enter display name"
                  required
                />
                {!details.display_name && (
                  <p className="text-xs text-orange-600 mt-1">
                    Display name is required
                  </p>
                )}
              </div>

              {/* Campaign Name */}
              <div className="w-full space-y-2">
                <label
                  htmlFor="campaign-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Campaign Name
                </label>
                <input
                  id="campaign-name"
                  type="text"
                  value={details.campaign_name}
                  onChange={(e) =>
                    setDetails({ ...details, campaign_name: e.target.value })
                  }
                  className="block w-full mt-1 border border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                  placeholder="Enter campaign name"
                  required
                />
                {!details.campaign_name && (
                  <p className="text-xs text-orange-600 mt-1">
                    Campaign name is required
                  </p>
                )}
              </div>
            </div>

            {/* Time gap (Seconds) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Time Gap (Seconds) */}
              <div className="w-full space-y-2">
                <label
                  htmlFor="time-gap"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time Gap Between Emails (Seconds)
                </label>
                <input
                  id="time-gap"
                  type="number"
                  value={details.delay_seconds}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setDetails({
                      ...details,
                      delay_seconds: isNaN(value) ? 0 : Math.max(0, value),
                    });
                  }}
                  className="block w-full mt-1 border border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                  placeholder="Enter time gap in seconds"
                  min="0"
                  step="1"
                  required
                />
                {(details.delay_seconds < 0 ||
                  isNaN(details.delay_seconds)) && (
                  <p className="text-xs text-orange-600 mt-1">
                    Please enter a valid positive number
                  </p>
                )}
              </div>

              {/* Subject Line */}
              <div className="w-full  space-y-2">
                <label
                  htmlFor="email-subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject Line
                </label>
                <input
                  id="email-subject"
                  type="text"
                  value={details.subject}
                  onChange={(e) =>
                    setDetails({ ...details, subject: e.target.value })
                  }
                  className="block w-full mt-1 border border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                  placeholder="Enter email subject"
                  required
                />
                {!details.subject && (
                  <p className="text-xs text-orange-600 mt-1">
                    Subject line is required
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-6 py-4  rounded-b-xl flex flex-col sm:flex-row justify-end gap-3">
            <button
              className="bg-[#3B82F6] text-white px-4 py-2 rounded mt-3 transition-colors duration-300"
              onClick={() => setIsEditModel(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-[#3B82F6] text-white px-4 py-2 rounded mt-3 transition-colors duration-300"
              onClick={handleSaveChanges}
              disabled={
                !details.display_name ||
                !details.campaign_name ||
                !details.subject ||
                details.delay_seconds < 0 ||
                options.smtps.length === 0 ||
                contacts.length === 0
              }
              type="button"
            >
              Save Changes
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* z */}
    </div>
  );
};

export default MangeCampaigns;
