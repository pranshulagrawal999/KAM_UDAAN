import React from "react";
import "../styles/pages.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="page-title">Welcome to the Key Access Management Dashboard</h1>
      <div className="card">Manage your Leads</div>
      <div className="card">Track Contacts</div>
      <div className="card">Monitor Interactions</div>
    </div>
  );
};

export default Dashboard;
