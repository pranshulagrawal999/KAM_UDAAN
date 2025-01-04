import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LeadsPage from "./pages/LeadsPage";
import ContactsPage from "./pages/ContactsPage";
import InteractionsPage from "./pages/InteractionsPage";
import CallsTodayPage from "./pages/CallsTodayPage";
import PerformancePage from "./pages/PerformancePage";
import "./styles/App.scss";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/interactions" element={<InteractionsPage />} />
          <Route path="/calls-today" element={<CallsTodayPage />} />
          <Route path="/performance" element={<PerformancePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
