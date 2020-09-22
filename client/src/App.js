import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import axios from "axios";

function App() {
  // const [response, setResponse] = useState("")
  // useEffect(()=>{
  //   axios.get("/hello").then(res=>{
  //    setResponse(res.data)
  //   })
  // },[])

  return (
    <>
      <Navbar />
      <Router>
        <div className="container">
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </div>
      </Router>
    </>
  );
}

export default App;
