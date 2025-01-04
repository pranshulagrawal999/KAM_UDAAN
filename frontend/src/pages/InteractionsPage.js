import React from "react";
import InteractionForm from "../components/InteractionForm";
import "../styles/pages.scss";

const InteractionsPage = () => {
  const handleInteractionSubmit = (data) => {
    console.log("Interaction Submitted:", data);
  };

  return (
    <div className="page">
      <h1 className="page-title">Interactions Management</h1>
      <InteractionForm onSubmit={handleInteractionSubmit} />
    </div>
  );
};

export default InteractionsPage;
