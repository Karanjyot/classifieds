import React from "react"
import "./Navbar.css"


function Navbar () {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Classifieds
        </a>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto login-signup">
            <li className="nav-item active">
              <a className="nav-link" href="/signup">
                Signup <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar