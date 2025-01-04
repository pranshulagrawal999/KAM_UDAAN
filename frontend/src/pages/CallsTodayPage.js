import React, { useEffect, useState } from "react";
import "../styles/pages.scss";

const CallsTodayPage = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    // Fetch calls for today (mocked data)
    setCalls([
      { id: 1, name: "John Doe", time: "10:00 AM", status: "Completed" },
      { id: 2, name: "Jane Smith", time: "2:00 PM", status: "Pending" },
    ]);
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Today's Calls</h1>
      <div className="calls-list">
        {calls.map((call) => (
          <div key={call.id} className="call-item">
            <p><strong>Name:</strong> {call.name}</p>
            <p><strong>Time:</strong> {call.time}</p>
            <p><strong>Status:</strong> {call.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallsTodayPage;
