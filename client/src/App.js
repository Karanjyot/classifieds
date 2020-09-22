import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Search from "./Search/Search";
import Login from "./Login/Login";
import Signup from "./Signup/Signup"

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <div className="container">
          <Route path="/" exact component={Search} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </div>
      </Router>
    </>
  );
}

export default App;
