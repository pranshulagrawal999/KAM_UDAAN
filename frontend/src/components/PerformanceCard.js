import React from "react";
import "../styles/cards.scss";

const PerformanceCard = ({ title, value }) => {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
    </div>
  );
};

export default PerformanceCard;
