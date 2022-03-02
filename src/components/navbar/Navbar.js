import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <NavLink to="/">
          <h1 className="navbar-brand">Product Dashboard</h1>
        </NavLink>
        <NavLink to="/create">
          <h3>
            <Icon name="add" />
            Create Product
          </h3>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
