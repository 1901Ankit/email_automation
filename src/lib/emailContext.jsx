import React, { createContext, useState, useContext } from 'react';

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [emailData, setEmailData] = useState({
    sender_ids: [],
    smtp_server_ids: [],
    subject: '',
    uploaded_file_key: '',
    contact_info: '',
    website_url: '',
    your_name: '',
    your_company: '',
    csvFile: null,
    your_email: '',
  });

  return (
    <EmailContext.Provider value={{ emailData, setEmailData }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmailContext = () => useContext(EmailContext);
