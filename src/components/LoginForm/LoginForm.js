import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hardcodedUsername = "Satwik";
    const hardcodedPassword = "1234";

    if (
      formData.username === hardcodedUsername &&
      formData.password === hardcodedPassword
    ) {
      alert("Login Successful!");
      return <Link to="/dashboard" />;
    } else {
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div className="input-box">
          <a href="/reset-password" className="reset-password-link">
            Reset Password
          </a>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;