import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";

import * as API from "../../api/user";
import { toast, Toaster } from 'react-hot-toast';
import Select from "react-select";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react'
import * as SMTPAPI from "../../api/smtp";
import Editing from "../../component/templatedit";
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
  const [campaigns, setCampaigns] = useState([])
  const [contactLists, setContactLists] = useState({});
  const [isEditModel, setIsEditModel] = useState(false);
  const navigate = useNavigate();
  const [currentCampaignId, setCurrentCampaignId] = useState(null);
  const [selectedSmtps, setSelectedSmtps] = useState([]);
  const [ contactOptions,  setContactOptions] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
  const [details, setDetails] = useState({
    display_name: "",
    campaign_name: "",
    delay_seconds: 5,
    subject: "",
    uploaded_file_name:"",
  });

  const [options, setOptions] = useState({
    smtps: []
    
  });
  

  // State for contact lists
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await API.getContactList();
        console.log("response_from_contact", response.data.user_contact_files);
  
        // Extract only file_id and file_name
        const formattedContacts = response.data.user_contact_files.map((file) => ({
           value: file.file_id,
           label: file.file_name
        }));
        setContactOptions(formattedContacts)
        // setContacts(formattedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
  
    fetchContacts();
  }, []);
  
  // Function to handle saving the form
  const handleSaveChanges = async () => {
    const isValid =
      details.display_name &&
      details.campaign_name &&
      details.subject &&
      details.delay_seconds >= 0 &&
      options.smtps.length > 0 &&
      contacts.length > 0;

    if (isValid) {
      const campaignData = {
        display_name: details.display_name,
        campaign_name: details.campaign_name,
        delay_seconds: details.delay_seconds,
        subject: details.subject,
        smtps: options.smtps.map(smtp => smtp.value),
        contact_list_id: contacts.map(contact => contact.value)
      };
      console.log("campainen",campaignData);
      const formData = new FormData();
      formData.append("name", details.campaign_name);
      formData.append("display_name", details.display_name);
      formData.append("subject", details.subject);
      formData.append("delay_seconds", details.delay_seconds);
      formData.append("uploaded_file_name", details.uploaded_file_name);
      formData.append("contact_list_id",  campaignData.contact_list_id[0]);
 
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
          
            if (response && response.data) {
              console.log("Response Data:", response.data);
              toast.success("Campaign updated successfully");
          
              // Update the campaigns list with the updated campaign
              setCampaigns((prevCampaigns) =>
                prevCampaigns.map((camp) =>
                  camp.id === currentCampaignId ? { ...camp, ...response.data } : camp
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
              toast.error(error.response.data.message || "Server error occurred.");
            } else if (error.request) {
              // Request was made but no response was received
              console.error("No response received:", error.request);
              toast.error("No response from server. Please check your internet connection.");
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
            setCampaigns(prevCampaigns => [...prevCampaigns, response.data]);
          }
        }
        setIsEditModel(false);
        refreshCampaigns();
      } catch (error) {
        console.error("Error saving campaign:", error);
        toast.error(error.response?.data?.message || "Failed to save campaign");
      }
    } else {
      toast.error("Please complete all required fields correctly");
    }
  };

  useEffect(() => {
    const loadSMTPs = async () => {
      try {
        const smtpResponse = await SMTPAPI.getAllSMTPs({
          user_id: localStorage.getItem("id"),
        });

        if (!smtpResponse?.data?.servers || smtpResponse.data.servers.length === 0) {
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

  // Function to open dialog with pre-filled data (if editing existing campaign)
  // const openEditDialog = (existingCampaign = null) => {
  //   if (existingCampaign) {
  //     setDetails({
  //       display_name: existingCampaign.display_name || '',
  //       campaign_name: existingCampaign.campaign_name || '',
  //       delay_seconds: existingCampaign.delay_seconds || 5,
  //       subject: existingCampaign.subject || ''
  //     });
      
  //     // Set SMTPs if available
  //     if (existingCampaign.smtps && Array.isArray(existingCampaign.smtps)) {
  //       const selectedSmtps = existingCampaign.smtps.map(smtpId => {
  //         // Find the matching SMTP in availableSmtps
  //         const matchingSmtp = availableSmtps.find(smtp => smtp.value === smtpId);
  //         return matchingSmtp || { value: smtpId, label: `SMTP ${smtpId}` };
  //       });
  //       setOptions({ smtps: selectedSmtps });
  //     } else {
  //       setOptions({ smtps: [] });
  //     }
      
  //     // Set contact lists if available
  //     if (existingCampaign.contact_list_id) {
  //       const contactList = existingCampaign.contact_list_id;
  //       const matchingContact = availableContacts.find(c => c.file_id === contactList);
  //       if (matchingContact) {
  //         setContacts([{ value: matchingContact.file_id, label: matchingContact.file_name }]);
  //       } else {
  //         // If contact list not found in available contacts, create a generic entry
  //         const contactData = contactLists[contactList];
  //         const contactName = contactData ? contactData.file_name : `List ${contactList}`;
  //         setContacts([{ value: contactList, label: contactName }]);
  //       }
  //     } else {
  //       setContacts([]);
  //     }
      
  //     setCurrentCampaignId(existingCampaign.id);
  //   } else {
  //     // Reset form for new campaign
  //     setDetails({
  //       display_name: '',
  //       campaign_name: '',
  //       delay_seconds: 5,
  //       subject: ''
  //     });
  //     setOptions({
  //       smtps: []
  //     });
  //     setContacts([]);
  //     setCurrentCampaignId(null);
  //   }
  //   setIsEditModel(true);
  // };

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
            const res = await API.getSingleContactList(campaign.contact_list_id);
            console.log("res_for_contact", res);
            //  const contactsall= res.data((contact)=>{
            //       // const newcontact= { contact?.file_name}
            //  })
            contactData[campaign.contact_list_id] = {
              count: res.data.contacts.length,
              file_name: res.data.file_name
            }
          } catch (error) {
            console.error(`Error fetching contacts for ${campaign.contact_list_id}:`, error);
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
  console.log("campaignData_from_server",campaignData);
        // Get filename from contact lists
        const filename = contactLists[campaignData?.contact_list_id]?.file_name || `List ${campaignData?.contact_list_id}`;
        console.log("File Name:", filename);

        // Set form details
        setDetails({
          display_name: campaignData.display_name || "",
          campaign_name: campaignData.name || "",
          delay_seconds: campaignData.delay_seconds || 5,
          subject: campaignData.subject || "",
          uploaded_file_name:campaignData.uploaded_file_name,
        });

        // Set selected SMTPs
        if (campaignData.smtp_server_ids && Array.isArray(campaignData.smtp_server_ids)) {
          const selectedSMTPs = campaignData.smtp_server_ids
          .map((smtpId) => {
            const matchedSMTP = options.smtps.find((smtp) => smtp.value === smtpId);
            return matchedSMTP ? { value: matchedSMTP.value, label: matchedSMTP.label } : null;
          })
          .filter(Boolean); // Remove null values if no match is found

          setSelectedSmtps(selectedSMTPs);
        } else {
          setSelectedSmtps([]);
        }

        // Set selected contact list
        if (campaignData.contact_list_id) {
          setContacts([{ value: campaignData.contact_list_id, label: filename }]);
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
        setCampaigns(prevCampaigns => prevCampaigns.filter(camp => camp.id !== id));
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);

      if (error.response) {
        // Server responded with an error status code
        toast.error(error.response.data?.message || "Failed to delete campaign");
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
    <div className='container-fluid pt-24 max-h-[100vh] overflow-auto'>
      <Toaster />
      <div className='m-4 flex justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Manage Campaigns</h1>
        </div>

        <div className="flex items-center space-x-2 font-serif cursor-pointer" onClick={() => navigate("/detail")}>
          <h1 className="text-2xl font-bold">Create Campaigns</h1>
          <FiPlus className="text-2xl mb-1" />
        </div>
      </div>

      {/* Show all Campaigns */}
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#3B82F6] text-white">
              <th className="border border-gray-400 px-4 py-2 text-left">Campaign Name</th>
              <th className="border border-gray-400 px-4 py-2 text-left"> Contacts</th>
              <th className="border border-gray-400 px-4 py-2 text-left"> File Name</th>
              <th className="border border-gray-400 px-4 py-2 text-left">Template </th>
              <th className="border border-gray-400 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns?.map((comp) => (
              <tr key={comp.id} className="bg-gray-100 hover:bg-gray-200">
                <td className="border border-gray-400 px-4 py-2">{comp.name}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {contactLists[comp?.contact_list_id] ? contactLists[comp.contact_list_id].count : "Loading..."}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {contactLists[comp?.contact_list_id] ? contactLists[comp.contact_list_id].file_name : "Loading..."}
                </td>
                <td className="border border-gray-400 px-4 py-2">{comp.name}</td>
                <td className="px-4 py-2 flex gap-10">
                  <button className="text-blue-600 hover:text-blue-800 transition" onClick={() => onEdit(comp?.id)}>
                    <FaEdit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800 transition" onClick={() => onDelete(comp?.id)}>
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={isEditModel}
        onClose={() => setIsEditModel(false)}
        className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 overflow-y-auto"
      >
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-[95%] max-w-xl transform transition-all duration-300 ease-in-out">
          <div className="px-6 py-5 border-b dark:border-gray-700 flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
              {currentCampaignId ? 'Edit Campaign' : 'Create Campaign'}
            </Dialog.Title>
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

          <div className="px-6 py-5 max-h-[70vh] overflow-y-auto space-y-5">
            {/* Sender (SMTP) */}
            <div className="space-y-2">
              <label htmlFor="sender-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                <p className="text-xs text-orange-600 mt-1">Please select at least one sender</p>
              )}
            </div>

            {/* Recipient */}
            <div className="space-y-2">
              <label htmlFor="recipient-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Recipients
              </label>
              <Select
                inputId="recipient-select"
                options={contactOptions}
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
                    borderColor: '#93c3fd',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#4f8af7'
                    }
                  })
                }}
              />
              {contacts.length === 0 && (
                <p className="text-xs text-orange-600 mt-1">Please select at least one recipient</p>
              )}
            </div>

            {/* Display Name */}
            <div className="space-y-2">
              <label htmlFor="display-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Display Name
              </label>
              <input
                id="display-name"
                type="text"
                value={details.display_name}
                onChange={(e) => setDetails({ ...details, display_name: e.target.value })}
                className="block w-full px-4 py-3 rounded-lg border border-[#93c3fd] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter display name"
                required
              />
              {!details.display_name && (
                <p className="text-xs text-orange-600 mt-1">Display name is required</p>
              )}
            </div>

            {/* Campaign Name */}
            <div className="space-y-2">
              <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Campaign Name
              </label>
              <input
                id="campaign-name"
                type="text"
                value={details.campaign_name}
                onChange={(e) => setDetails({ ...details, campaign_name: e.target.value })}
                className="block w-full px-4 py-3 rounded-lg border border-[#93c3fd] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter campaign name"
                required
              />
              {!details.campaign_name && (
                <p className="text-xs text-orange-600 mt-1">Campaign name is required</p>
              )}
            </div>

            {/* Time gap (Seconds) */}
            <div className="space-y-2">
              <label htmlFor="time-gap" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                    delay_seconds: isNaN(value) ? 0 : Math.max(0, value)
                  });
                }}
                className="block w-full px-4 py-3 rounded-lg border border-[#93c3fd] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter time gap in seconds"
                min="0"
                step="1"
                required
              />
              {(details.delay_seconds < 0 || isNaN(details.delay_seconds)) && (
                <p className="text-xs text-orange-600 mt-1">Please enter a valid positive number</p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Subject Line
              </label>
              <input
                id="email-subject"
                type="text"
                value={details.subject}
                onChange={(e) => setDetails({ ...details, subject: e.target.value })}
                className="block w-full px-4 py-3 rounded-lg border border-[#93c3fd] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter email subject"
                required
              />
              {!details.subject && (
                <p className="text-xs text-orange-600 mt-1">Subject line is required</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Subject Line
              </label>
              <Editing
                  setSelectedTemplate={setSelectedTemplate}
                  uploaded_file_name={details.uploaded_file_name}
                  setModalOpen={setModalOpen}
                />
              
            </div>

            {/* <div className="" onClick={saveEnteredDetails}>
                <Editing
                  setSelectedTemplate={setSelectedTemplate}
                  setModalOpen={setModalOpen}
                />
                weiygfj
              </div> */}
          </div>

          {/* Buttons */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 rounded-b-xl flex flex-col sm:flex-row justify-end gap-3">
            <button
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm font-medium dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              onClick={() => setIsEditModel(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md transition-all font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              {currentCampaignId ? 'Update Campaign' : 'Save Campaign'}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default MangeCampaigns;
