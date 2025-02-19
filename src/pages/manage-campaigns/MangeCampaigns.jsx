import React,{useEffect, useState} from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";


import * as API from "../../api/user";
import {toast, Toaster} from 'react-hot-toast';
 

const MangeCampaigns = () => {
const [campaigns, setCampaigns] = useState([])
    
 useEffect(() => {
     
    async function getAllCompaingns(){
         const res= await API.getAllCampigns();
          setCampaigns(res.data);
         console.log("RESSS", res);
     }
       
       
  getAllCompaingns();
   }, [ ])
   
   const onEdit=(id)=>{
    
     console.log("inside  edit function ",id)
   }
   const onDelete=async (id)=>{
    
        

   }
  return (
    <div className='container-fluid  pt-24  max-h-[100vh] overflow-auto'> 
       <Toaster/>
       <div className='m-4'>
        <h1 className='text-3xl font-bold'>Manage Campaigns</h1>
        {/* <div className='border-b border-gray-400 '></div> */}
       </div>
     
      
    {/* //show all Campaigns */}
    <div class="overflow-x-auto p-4">
    <table class="min-w-full border-collapse border border-gray-300">

        <thead>
            <tr class="bg-[#3B82F6] text-white">
                <th class="border border-gray-400 px-4 py-2 text-left">Campaign Name</th>
                 
             
                <th class="border border-gray-400 px-4 py-2 text-left"> Contacts</th>
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


                 {comp.contact_list}
                </td>
                <td class="border border-gray-400 px-4 py-2">{comp.uploaded_file_key}</td>
                <td className=" px-4 py-2 flex gap-10">
        <button className="text-blue-600 hover:text-blue-800 transition" onClick={()=>onEdit(2)}>
          <FaEdit size={18} />
        </button>
        <button className="text-red-600 hover:text-red-800 transition" onClick={()=> onDelete(4)}>
          <FaTrash size={18} />
        </button>
      </td>
            </tr>
             
        ))
     }
            
        </tbody>
    </table>
</div>

    
    
    
    </div>
  )
}

export default MangeCampaigns