import React, { useState } from "react";
import "../styles/forms.scss";

const LeadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    status: "",
    callFrequency: "",
    lastCallDate: "",
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
      <h3>Create a New Lead</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
        <input type="text" name="status" placeholder="Status" onChange={handleChange} />
        <input type="number" name="callFrequency" placeholder="Call Frequency" onChange={handleChange} />
        <input type="date" name="lastCallDate" placeholder="Last Call Date" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeadForm;
