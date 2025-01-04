import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <NavLink className="navbar-brand" to="/dashboard">KAM Dashboard</NavLink>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item"><NavLink className="nav-link" to="/leads">Leads</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/contacts">Contacts</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/interactions">Interactions</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/performance">Performance</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
