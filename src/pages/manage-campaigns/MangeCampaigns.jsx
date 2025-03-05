import React, { useEffect, useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";

import * as API from "../../api/user";
import Select from "react-select";
 
 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";
 
 
 
import * as SMTPAPI from "../../api/smtp";
import Editing from "../../component/templatedit";
import { IoSendOutline } from "react-icons/io5";
const MangeCampaigns = () => {
 
  const [campaigns, setCampaigns] = useState([])
  const [contactLists, setContactLists] = useState({});
  const [isEditModel, setIsEditModel] = useState(false);
  const navigate = useNavigate();
  const [currentCampaignId, setCurrentCampaignId] = useState(null);
  const [selectedSmtps, setSelectedSmtps] = useState([]);
  const [contactOptions, setContactOptions] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [subjects,setSubjects]=useState([]);
  const [options, setOptions] = useState({
    smtps: [],
  });
  const [subject,setSubject]=useState([]);
  const [selectedSubjectName,setSelectedSubjectName]=useState(null);
  const [details, setDetails] = useState({
    display_name: "",
    campaign_name: "",
    delay_seconds: 5,
    subject: "",
    uploaded_file_name:"",
  });

  // State for contact lists
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await API.getContactList();
        console.log("response_from_contact", response.data.user_contact_files);

        // Extract only file_id and file_name
        const formattedContacts = response.data.user_contact_files.map(
          (file) => ({
            value: file.file_id,
            label: file.file_name,
          })
        );
        setContactOptions(formattedContacts);
        // setContacts(formattedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  // Function to handle saving the form
  const handleSaveChanges = async () => {
    console.log("details", details);
    const isValid =
      details.display_name  ||
      details.campaign_name  ||
      details.subject  ||
      details.delay_seconds >= 0 ||  
      options.smtps.length > 0  ||
      details.contact_list_id

    if (isValid) {
      const campaignData = {
        display_name: details.display_name,
        campaign_name: details.campaign_name,
        delay_seconds: details.delay_seconds,
        subject: details.subject,
        smtps: options.smtps.map((smtp) => smtp.value),
        contact_list_id:  details.contact_list_id,
      };
      console.log("ck", campaignData);
      const formData = new FormData();
      formData.append("name", details.campaign_name);
      formData.append("display_name", details.display_name);
      formData.append("subject",  subject.value);
      formData.append("delay_seconds", details.delay_seconds);
      formData.append("uploaded_file__id", details.uploaded_file_name);
      formData.append("contact_list_id", campaignData.contact_list_id);

      // Append each SMTP ID separately
      if (Array.isArray(campaignData.smtps)) {
        campaignData.smtps.forEach((id) => {
          console.log("id", id);
          formData.append("smtp_server_ids", Number(id));
        });
      } else {
        console.error("smtp_server_ids is not an array");
      }

      try {
        let response;
        if (currentCampaignId) {
          // Update existing campaign
          try {
            const response = await updateCampaign(currentCampaignId, formData);
console.log("response",response)
            if (response && response.data) {
              console.log("Response Data:", response.data);
              toast.success("Campaign updated successfully");

              // Update the campaigns list with the updated campaign
              setCampaigns((prevCampaigns) =>
                prevCampaigns.map((camp) =>
                  camp.id === currentCampaignId
                    ? { ...camp, ...response.data }
                    : camp
                )
              );
            } else {
              console.error("Unexpected API response format:", response);
              toast.error("Failed to update campaign. Please try again.");
            }
          } catch (error) {
            console.error("Error updating campaign:", error);

            // Handle different error types
            if (error.response) {
              // Server responded with an error status
              console.error("Server Error:", error.response.data);
              toast.error(
                error.response.data.message || "Server error occurred."
              );
            } else if (error.request) {
              // Request was made but no response was received
              console.error("No response received:", error.request);
              toast.error(
                "No response from server. Please check your internet connection."
              );
            } else {
              // Other errors (e.g., coding errors)
              console.error("Error:", error.message);
              toast.error("An unexpected error occurred. Please try again.");
            }
          }
        } else {
          // Create new campaign
          response = await API.createCampainion(campaignData);
          if (response.data) {
            toast.success("Campaign created successfully");
            // Add the new campaign to the list
            setCampaigns((prevCampaigns) => [...prevCampaigns, response.data]);
          }
        }
        setIsEditModel(false);
        refreshCampaigns();
      } catch (error) {
        console.error("Error saving campaign:", error);
        toast.error(error.response?.data?.message || "Failed to save campaign");
      }
    } else {
      toast.error("Please make Change at lease on field to update the campaign");
    }
  };

  useEffect(() => {
    const loadSMTPs = async () => {
      try {
        const smtpResponse = await SMTPAPI.getAllSMTPs({
          user_id: localStorage.getItem("id"),
        });

        if (
          !smtpResponse?.data?.servers ||
          smtpResponse.data.servers.length === 0
        ) {
          toast.error("You do not have SMTP information.");
          navigate("/smtp");
          return;
        }

        console.log(smtpResponse.data.servers, "All SMTPs from API");

        const smtpOptions = smtpResponse.data.servers.map((obj) => ({
          label: obj.username,
          value: obj.id,
        }));

        setOptions((prevOptions) => ({
          ...prevOptions,
          smtps: smtpOptions,
        }));
      } catch (error) {
        console.error("Error fetching SMTP data:", error);
        toast.error("Failed to fetch SMTP accounts.");
      }
    };

    loadSMTPs();
  }, []);

  // Function to update an existing campaign
  const updateCampaign = async (id, data) => {
    try {
      const response = await API.updateCampaign(id, data);
      console.log("response_updated",response)
      return response;
    } catch (error) {
      console.error("Error updating campaign:", error);
      throw error;
    }
  };

  // Function to refresh campaigns list
  const refreshCampaigns = async () => {
    try {
      const res = await API.getAllCampigns();
      if (res?.data) {
        setCampaigns(res.data);
      }
    } catch (error) {
      console.error("Error refreshing campaigns:", error);
      toast.error("Failed to refresh campaigns");
    }
  };

 

  useEffect(() => {
    async function getAllCampaigns() {
      try {
        const res = await API.getAllCampigns();
        console.log("res_for_all", res);
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
        if (campaign.contact_list_id) {
          try {
            const res = await API.getSingleContactList(
              campaign.contact_list_id
            );
            console.log("res_for_contact", res);
            //  const contactsall= res.data((contact)=>{
            //       // const newcontact= { contact?.file_name}
            //  })
            contactData[campaign.contact_list_id] = {
              count: res.data.contacts.length,
              file_name: res.data.file_name,
            };
          } catch (error) {
            console.error(
              `Error fetching contacts for ${campaign.contact_list_id}:`,
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
      console.log("Campaign data:", res);

      if (res?.data) {
        const campaignData = res.data;
        console.log("campaignData_from_server", campaignData);
        // Get filename from contact lists
        const filename =
          contactLists[campaignData?.contact_list_id]?.file_name ||
          `List ${campaignData?.contact_list_id}`;
        console.log("File Name:", filename);

        const subjectName= subjects.find((subject)=>subject.value===campaignData.subject_file_id)
        setSelectedSubjectName(subjectName);
        // Set form details
        setDetails({
          display_name: campaignData.display_name || "",
          campaign_name: campaignData.name || "",
          delay_seconds: campaignData.delay_seconds || 5,
          subject: campaignData.subject || "",
          uploaded_file_name: campaignData.uploaded_file_name,
        });

        // Set selected SMTPs
        if (
          campaignData.smtp_server_ids &&
          Array.isArray(campaignData.smtp_server_ids)
        ) {
          const selectedSMTPs = campaignData.smtp_server_ids
            .map((smtpId) => {
              const matchedSMTP = options.smtps.find(
                (smtp) => smtp.value === smtpId
              );
              return matchedSMTP
                ? { value: matchedSMTP.value, label: matchedSMTP.label }
                : null;
            })
            .filter(Boolean); // Remove null values if no match is found

          setSelectedSmtps(selectedSMTPs);
        } else {
          setSelectedSmtps([]);
        }

        // Set selected contact list
        if (campaignData.contact_list_id) {
          setContacts([
            { value: campaignData.contact_list_id, label: filename },
          ]);
        } else {
          setContacts([]);
        }

        setCurrentCampaignId(id);
        setIsEditModel(true);
      } else {
        toast.error("Failed to load campaign details");
      }
    } catch (error) {
      console.error("Error loading campaign details:", error);
      toast.error("Error loading campaign details");
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
        // Remove deleted campaign from state
        setCampaigns((prevCampaigns) =>
          prevCampaigns.filter((camp) => camp.id !== id)
        );
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

  const onSend = async (id) => {
        
    navigate(`/preview/${id}`)
     

    
  };
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await API.getSubjectList();
        console.log("response_from_subject", response.data);
        const  formatedSubjects = response.data.subject_file_list.map(
          (file) => ({
            value: file.id,
            label: file.name,
          })
        );
        console.log("formatedSubjects",formatedSubjects);
        setSubjects(formatedSubjects);
    
      } catch (error) {
        console.error("Error fetching contacts:", error);
        
      }
    };
    fetchSubjects();
  }, []);
  return (
    <div className="container-fluid pt-32 max-h-[100vh] overflow-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold uppercase">Manage Campaigns</h1>
        <button
          className="bg-[#3B82F6] text-white border-[#3B82F6] rounded-md p-2 text-lg font-semibold"
          type="button"
          onClick={() => navigate("/detail")}
        >
          Create Campaigns
        </button>
      </div>

      {/* Show all Campaigns */}
      <div className="overflow-x-auto mt-4">
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#3B82F6] text-white">
              <tr className="bg-[#3B82F6] text-white">
                <th className="border border-gray-400 px-4 py-2 text-left">
                  Campaign Name
                </th>
                <th className="border border-gray-400 px-4 py-2 text-left">
                  {" "}
                  Contacts
                </th>
                <th className="border border-gray-400 px-4 py-2 text-left">
                  {" "}
                  File Name
                </th>
                <th className="border border-gray-400 px-4 py-2 text-left">
                  Template{" "}
                </th>
                <th className="border border-gray-400 px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns?.map((comp) => (
                <tr key={comp.id} className="bg-gray-100 hover:bg-gray-200">
                  <td className="border border-gray-400 px-4 py-2">
                    {comp.name}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {contactLists[comp?.contact_list_id]
                      ? contactLists[comp.contact_list_id].count
                      : "Loading..."}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {contactLists[comp?.contact_list_id]
                      ? contactLists[comp.contact_list_id].file_name
                      : "Loading..."}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {comp.uploaded_file_id}
                  </td>
                  <td className="px-4 py-2 flex gap-10">
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
                    <button className="text-green-600 hover:text-red-800 transition" onClick={() => onSend(comp?.id)}>
                  <IoSendOutline size={18}/>
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
        <Dialog.Panel className="bg-white  rounded-xl shadow-2xl w-[95%] max-w-xl transform transition-all duration-300 ease-in-out">
          {/*  <div className="">
            <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
              {currentCampaignId ? "Edit Campaign" : "Create Campaign"}
            </Dialog.Title> */}
          {/* <button
              onClick={() => setIsEditModel(false)}
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Close dialog"
            ></button>
          </div> */}

          <div className="flex justify-around items-center mt-3">
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

          <div className="px-6 py-3 max-h-[70vh] overflow-y-auto space-y-5">
            {/* Sender (SMTP) */}
            <div className="space-y-2">
              <label
                htmlFor="sender-select"
                className="block text-sm font-medium text-black "
              >
                Sender
              </label>
              <Select
                inputId="sender-select"
                options={options.smtps} // Show all SMTPs from API
                isMulti
                value={selectedSmtps} // Preselected SMTPs from the campaign
                onChange={(selectedOptions) => {
                  setSelectedSmtps(selectedOptions);
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

            {/* Recipient */}
            <div className="space-y-2">
              <label
                htmlFor="recipient-select"
                className="block text-sm font-medium text-black "
              >
                Recipients
              </label>
              <Select
                inputId="recipient-select"
                options={contactOptions}
                isMulti={false}
                value={contacts}
                onChange={(selectedContacts) => {
                  setDetails({ ...details, contact_list_id: selectedContacts.value });
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
              
            </div>

            {/* Display Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Display Name */}
              <div className="space-y-2">
                <label
                  htmlFor="display-name"
                  className="block text-sm font-medium text-black "
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
                  className="block w-full px-2 py-2 rounded-lg border border-[#93c3fd] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors "
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
              <div className="space-y-2">
                <label
                  htmlFor="campaign-name"
                  className="block text-sm font-medium text-black "
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
                  className="block w-full px-2 py-2 rounded-lg border border-[#93c3fd] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors "
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Time Gap Between Emails */}
              <div className="space-y-2">
                <label
                  htmlFor="time-gap"
                  className="block text-sm font-medium text-black "
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
                  className="block w-full px-2 py-2 rounded-lg border border-[#93c3fd] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors "
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

              <div className="space-y-2">
              <label
                htmlFor="recipient-select"
                className="block text-sm font-medium text-black "
              >
                 Subject
              </label>
              <Select
                inputId="recipient-select"
                options={subjects}
                isMulti={false}
                value={selectedSubjectName}
                onChange={(selectedContacts) => {
                   setSubject(selectedContacts);
                   setDetails({...details , subject: selectedContacts.value})
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
               
            </div>

              {/* Subject Line */}
              
            </div>

            <div className="space-y-2">
              <Editing
                setSelectedTemplate={setSelectedTemplate}
                uploaded_file_name={details.uploaded_file_name}
                setModalOpen={setModalOpen}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="px-6 py-2 bg-gray-50  rounded-b-xl flex flex-col sm:flex-row justify-between items-center gap-3">
            <button
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md transition-all font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setIsEditModel(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md transition-all font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSaveChanges}
              
              type="button"
            >
              {currentCampaignId ? "Update Campaign" : "Save Campaign"}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default MangeCampaigns;
