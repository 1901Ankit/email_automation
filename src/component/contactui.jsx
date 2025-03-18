import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import * as API from "../api/user";

const Contactui = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm();

  const SubmitQuery = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
     
      const apiData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        description: data.message  
      };
      
      const response = await API.sendEnquiry(apiData);
      console.log("response_for_enquiry", response);
      setSubmitSuccess(true);
      reset();  
    } catch (error) {
      
      setSubmitError("Failed to submit your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const onSubmit = (data) => {
    
    SubmitQuery(data);
  };

  return (
    <div className="container mx-auto mt-5 px-4 md:px-20" id="contactui">
      <div className="flex flex-wrap mb-4">
        <div className="w-full sm:w-1/2 pr-8">
          <div>
            <h5 className="text-[#338DFB] font-extrabold text-2xl md:text-4xl mt-3 leading-snug tracking-tight">
              Enquiry Form
            </h5>
            <p className="block mt-4 mb-10 text-[#000] font-semibold w-10/12 text-base md:text-lg leading-snug tracking-tight">
              Please fill out the form below to submit your enquiry. We will get
              back to you as soon as possible.
            </p>
            <div className="container-fluid mt-4 p-0">
              <ul className="space-y-6">
                <li className="flex items-start md:items-center gap-4 md:gap-6">
                  <div className="min-w-[40px] h-10 flex items-center justify-center bg-[#338DFB] rounded-full">
                    <FaMapMarkerAlt className="text-white text-[20px]" />
                  </div>
                  <span className="text-[#828080] font-semibold text-base leading-6 md:leading-7">
                    12A02 Tower C 13th Floor, Iconic Corenthum, Sector-62,
                    Noida, UP, India - 201301
                  </span>
                </li>
                <li className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#338DFB] rounded-full">
                    <FaPhoneAlt className="text-white text-[20px]" />
                  </div>
                  <span className="text-[#828080] font-semibold text-base ">
                    <a
                      href="tel:+918009006321"
                      title="Give me a call"
                      className="text-[#828080] font-semibold text-base no-underline"
                    >
                      +91 8009006321
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#338DFB] rounded-full">
                    <FaEnvelope className="text-white text-[20px]" />
                  </div>
                  <span className="text-[#828080] font-semibold text-base ">
                    <a
                      href="mailto:infowishgeekstechserve.com"
                      title="Send me an email"
                      className="text-[#828080] font-semibold text-base no-underline"
                    >
                      Info@wishgeekstechserve.com
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 mt-5 md:mt-0">
          {submitSuccess ? (
            <div className="border-2 border-blue-300 bg-green-50 shadow-lg rounded-lg p-8 text-center">
              <h5 className="text-blue-600 font-bold text-xl mb-2">Thank You!</h5>
              <p className="text-gray-700">Your enquiry has been submitted successfully. We'll get back to you soon.</p>
              <button 
                onClick={() => setSubmitSuccess(false)}
                className="mt-4 bg-blue-500 text-white rounded-lg py-2 px-6 font-semibold"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="border-2 border-blue-300 shadow-lg shadow-blue-500 rounded-t-lg rounded-b-lg p-4"
            >
              <h5 className="text-black font-extrabold text-base md:text-xl leading-snug tracking-tight mb-4">
                Fill this form for Enquiry
              </h5>
              
              {submitError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-500 rounded">
                  {submitError}
                </div>
              )}
              
              {/* Name Input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`border-solid border-2 rounded-lg pl-2 py-2 w-full ${
                    errors.name ? 'border-red-500' : 'border-blue-300'
                  }`}
                  {...register("name", { 
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters"
                    }
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative mb-6">
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`border-solid border-2 rounded-lg pl-2 py-2 w-full ${
                    errors.email ? 'border-red-500' : 'border-blue-300'
                  }`}
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div className="relative mb-6">
                <input
                  type="tel"
                  placeholder="Phone"
                  className={`border-solid border-2 rounded-lg pl-2 py-2 w-full ${
                    errors.phone ? 'border-red-500' : 'border-blue-300'
                  }`}
                  {...register("phone", { 
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be 10 digits"
                    }
                  })}
                  maxLength={10}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Subject Input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Subject"
                  className={`border-solid border-2 rounded-lg pl-2 py-2 w-full ${
                    errors.subject ? 'border-red-500' : 'border-blue-300'
                  }`}
                  {...register("subject", { 
                    required: "Subject is required",
                    minLength: {
                      value: 3,
                      message: "Subject must be at least 3 characters"
                    }
                  })}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Input */}
              <div className="relative mb-6">
                <textarea
                  rows={4}
                  placeholder="Message"
                  className={`border-solid border-2 rounded-lg pl-2 py-2 w-full ${
                    errors.message ? 'border-red-500' : 'border-blue-300'
                  }`}
                  {...register("message", { 
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters"
                    }
                  })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`text-white rounded-lg py-2 px-10 text-[1.2rem] font-bold w-full text-center flex items-center justify-center ${
                  isSubmitting ? 'bg-black cursor-not-allowed' : 'bg-[#0094D3]'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contactui;