import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Classifieds
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto login-signup">
          <li className="nav-item active">
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login 
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
