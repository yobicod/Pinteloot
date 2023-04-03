import React, { useState } from "react";
import "./Styles/login.css";
function Login() {
  console.log("Rendered login");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);

  const inputId = (event) => {
    setId(event.target.value);
  };

  const inputPassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <div className="container">
        <div className="loginContainer">
          <form>
            <div className="formControl">
              <label>Email</label>
              <input
                className="input"
                type="text"
                placeholder="Email"
                onChange={inputId}
                value={id}
              ></input>
            </div>
            <div className="formControl">
              <label>Password</label>
              <input
                className="input"
                type="password"
                placeholder="Password"
                onChange={inputPassword}
                value={password}
              ></input>
            </div>
            <a href="#">Forgot your password?</a>
            <button className="loginButton">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
