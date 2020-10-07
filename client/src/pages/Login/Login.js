import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/userContext";
import { useHistory } from "react-router-dom";
import "./Login.css";
import ErrorNotice from "../../components/ErrorNotice/ErrorNotice";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  //destructure
  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      // create a newUser object
      const loginUser = { email, password };

      const loginRes = await axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );

      setUserData({ token: loginRes.data.token, user: loginRes.data.user });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      // if msg exists in error set the error to it
      if (err.response.data.msg) {
        setError(err.response.data.msg);
      }
    }
  };

  return (
    <form className="login-form" onSubmit={submit}>
      {/* if error exist display error notice. Pass props to Error notice to display
      message and clear message */}
      {error ? (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      ) : null}
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}

export default Login;
