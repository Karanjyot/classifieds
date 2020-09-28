import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import userContext from "../../context/userContext";

function Navbar() {
  // destructure
  const { userData, setUserData } = useContext(userContext);

  // Logout handling
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem("auth-token", "");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Classifieds
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto login-signup">
          {/* if user is logged in then display logout otherwise display signup/login */}
          {userData.user ? (
            <li className="nav-item active">
              <Link to="/" className="nav-link" onClick={logout}>
                Logout
              </Link>
            </li>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
