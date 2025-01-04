import React, { useState } from "react";
import "../styles/forms.scss";

const InteractionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    interactionType: "",
    date: "",
    notes: "",
    contactId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h3>Log a New Interaction</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="interactionType" placeholder="Type (e.g., Call, Email)" onChange={handleChange} />
        <input type="date" name="date" placeholder="Date" onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" onChange={handleChange}></textarea>
        <input type="text" name="contactId" placeholder="Contact ID" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InteractionForm;
