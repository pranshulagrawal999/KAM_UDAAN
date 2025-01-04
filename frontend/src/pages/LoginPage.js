import React, { useState } from "react";
import "../styles/pages.scss";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  const toggleMode = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="login-page">
      <h1>{isRegister ? "Register" : "Login"}</h1>
      <form className="form-container">
        {isRegister && <input type="text" name="name" placeholder="Name" />}
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button className="toggle-btn" onClick={toggleMode}>
        {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default LoginPage;
