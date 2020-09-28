import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import axios from "axios";
import UserContext from "./context/userContext";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      // retrieve token from local storage
      let token = localStorage.getItem("auth-token");

      // Token is null if user is logged out. So we set key with an empty string in local storage.
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      // http call to api to check if token is valid or not. Returns a boolean.
      const tokenRes = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "auth-token": token } }
      );
      // if token exists and is valid, make an http request to retrieve user info
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "auth-token": token },
        });

        // set the user data state to the token of current user and their user info
        setUserData({ token, user: userRes.data });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <div className="container">
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
          </div>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
