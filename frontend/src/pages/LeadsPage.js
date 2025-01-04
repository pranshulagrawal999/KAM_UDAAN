import React from "react";
import LeadForm from "../components/LeadForm";
import "../styles/pages.scss";

const LeadsPage = () => {
  const handleLeadSubmit = (data) => {
    console.log("Lead Submitted:", data);
  };

  return (
    <div className="page">
      <h1 className="page-title">Leads Management</h1>
      <LeadForm onSubmit={handleLeadSubmit} />
    </div>
  );
};

export default LeadsPage;
