import React from "react";
import ContactForm from "../components/ContactForm";
import "../styles/pages.scss";

const ContactsPage = () => {
  const handleContactSubmit = (data) => {
    console.log("Contact Submitted:", data);
  };

  return (
    <div className="page">
      <h1 className="page-title">Contacts Management</h1>
      <ContactForm onSubmit={handleContactSubmit} />
    </div>
  );
};

export default ContactsPage;
