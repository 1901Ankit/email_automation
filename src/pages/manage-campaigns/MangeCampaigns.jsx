import React,{useEffect, useState} from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";


import * as API from "../../api/user";
import {toast, Toaster} from 'react-hot-toast';
import Select from "react-select";
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react'
const MangeCampaigns = () => {
const [campaigns, setCampaigns] = useState([])
const [contactLists, setContactLists] = useState({});
const [isEditModel, setIsEditModel]= useState(false);
const navigate= useNavigate();
const [details, setDetails] = useState({
  display_name: "John Doe",
  campaign_name: "Sample Campaign",
  delay_seconds: 5,
  subject: "Welcome Email",
});

 
const [options, setOptions] = useState({
  smtps: []
});

// State for contact lists
const [contacts, setContacts] = useState([]);

// Sample data for demonstration
const availableSmtps = [
  { value: 'smtp1', label: 'support@company.com' },
  { value: 'smtp2', label: 'sales@company.com' },
  { value: 'smtp3', label: 'marketing@company.com' }
];

const availableContacts = [
  { file_id: 'list1', file_name: 'Customers List' },
  { file_id: 'list2', file_name: 'Newsletter Subscribers' },
  { file_id: 'list3', file_name: 'Leads from Conference' }
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
    console.log('Saving campaign with details:', { details, smtps: options.smtps, contacts });
    setIsEditModel(false);
  } else {
    alert("Please complete all required fields correctly");
  }
};

// Function to open dialog with pre-filled data (if editing existing campaign)
const openEditDialog = (existingCampaign = null) => {
  if (existingCampaign) {
    setDetails({
      display_name: existingCampaign.display_name || '',
      campaign_name: existingCampaign.campaign_name || '',
      delay_seconds: existingCampaign.delay_seconds || 5,
      subject: existingCampaign.subject || ''
    });
    setOptions({
      smtps: existingCampaign.smtps || []
    });
    setContacts(existingCampaign.contacts || []);
  } else {
    // Reset form for new campaign
    setDetails({
      display_name: '',
      campaign_name: '',
      delay_seconds: 5,
      subject: ''
    });
    setOptions({
      smtps: []
    });
    setContacts([]);
  }
  setIsEditModel(true);
};
useEffect(() => {
  async function getAllCampaigns() {
    try {
      const res = await API.getAllCampigns();
       console.log("res_for_all",res);
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
            console.log("res_for_contact",res);
            contactData[campaign.contact_list] = {
                 count: res.data.contacts.length,
                 file_name: res.data.file_name

            }
          } catch (error) {
            console.error(`Error fetching contacts for ${campaign.contact_list}:`, error);
          }
        }
      }
      setContactLists(contactData);
    }

    if (campaigns.length > 0) {
      fetchContacts();
    }
  }, [campaigns]);
   const onEdit=async (id)=>{
     
    try {
   
       const res= await API.getSingleCampigns(id);
       console.log("res_from_compainnes",res);
       setIsEditModel(true);
    } catch (error) {
      console.log("errors",error);
    }

     
   }
   const onDelete = async (id) => {
    if (!id) {
        toast.error("Invalid campaign ID");
        return;
    }

    console.log("id_For_Delete", id);

    try {
        const res = await API.deleteCampigns(id);

        if (res && res.data && res.data.status) {
            toast.success(res.data.status);
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
    <div className='container-fluid  pt-24  max-h-[100vh] overflow-auto'> 
       <Toaster/>
       <div className='m-4 flex justify-between'>
        <div>
        <h1 className='text-3xl font-bold'>Manage Campaigns</h1>
        
        </div>

        <div className="flex items-center space-x-2 font-serif cursor-pointer" onClick={()=>navigate("/detail")}>
  <h1 className="text-2xl font-bold">Create Campaigns</h1>
  <FiPlus className="text-2xl mb-1" />
</div>

        
        {/* <div className='border-b border-gray-400 '></div> */}
       </div>
     
      
    {/* //show all Campaigns */}
    <div class="overflow-x-auto p-4">
    <table class="min-w-full border-collapse border border-gray-300">

        <thead>
            <tr class="bg-[#3B82F6] text-white">
                <th class="border border-gray-400 px-4 py-2 text-left">Campaign Name</th>
                <th class="border border-gray-400 px-4 py-2 text-left"> Contacts</th>
                <th class="border border-gray-400 px-4 py-2 text-left"> File Name</th>
                <th class="border border-gray-400 px-4 py-2 text-left">Template </th>
                <th class="border border-gray-400 px-4 py-2 text-left">Actions</th>
            </tr>
        </thead>
        <tbody>
            
     {
        campaigns?.map((comp)=>(
            <tr class="bg-gray-100 hover:bg-gray-200">
                <td class="border border-gray-400 px-4 py-2">{comp.display_name}</td>
                <td class="border border-gray-400 px-4 py-2">


                {contactLists[comp?.contact_list] ? contactLists[comp.contact_list].count  : "Loading..."}
                </td>
                <td class="border border-gray-400 px-4 py-2">


{contactLists[comp?.contact_list] ? contactLists[comp.contact_list].file_name  : "Loading..."}
</td>
                <td class="border border-gray-400 px-4 py-2">{comp.name}</td>
                <td className=" px-4 py-2 flex gap-10">
        <button className="text-blue-600 hover:text-blue-800 transition" onClick={()=>onEdit(comp?.id)}>
          <FaEdit size={18} />
        </button>
        <button className="text-red-600 hover:text-red-800 transition" onClick={()=> onDelete(comp?.id)}>
          <FaTrash size={18} />
        </button>
      </td>
            </tr>
             
        ))
     }
            
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
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
                options={availableSmtps}
                isMulti
                value={options.smtps}
                onChange={(selectedOptions) => {
                  setOptions({...options, smtps: selectedOptions});
                }}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select sender accounts"
                noOptionsMessage={() => "No sender accounts available"}
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
                options={availableContacts.map((c) => ({ value: c.file_id, label: c.file_name }))}
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
              Save Changes
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
{/* z */}
    
    </div>
  )
}

export default MangeCampaigns