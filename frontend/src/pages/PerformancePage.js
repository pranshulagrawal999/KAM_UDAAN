import React, { useState } from "react";
import PerformanceCard from "../components/PerformanceCard";
import "../styles/pages.scss";

const PerformancePage = () => {
  const [metrics] = useState([
    { title: "Total Leads", value: 123 },
    { title: "Interactions This Week", value: 45 },
    { title: "Closed Deals", value: 15 },
  ]);

  return (
    <div className="page">
      <h1 className="page-title">Performance Metrics</h1>
      <div className="performance-grid">
        {metrics.map((metric, index) => (
          <PerformanceCard key={index} title={metric.title} value={metric.value} />
        ))}
      </div>
    </div>
  );
};

export default PerformancePage;
