import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Context from "../context/context.js";

function Login(props) {
  const context = useContext(Context);
  const { setLogin } = context;
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://techfest-backend-p0n9.onrender.com/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      setLogin(true);
      document.getElementById("login").style.display = "none";
      document.getElementById("logout").style.display = "block";
      navigate("/events");
      props.showAlert("Logged in Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={credentials.password}
            id="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <br />
      </form>
    </div>
  );
}

export default Login;