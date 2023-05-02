import React, { useState } from "react";
import Nav from "./nav";

function Register() {
  console.log("Rendered login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formValid, setFormValid] = useState(false);

  const inputEmail = (event) => {
    setEmail(event.target.value);
  };

  const inputPassword = (event) => {
    setPassword(event.target.value);
  };

  const inputName = (event) => {
    setName(event.target.value);
  };

  const handleOnRegister = async (e) => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    if (email.length === 0 || password.length === 0 || name.length === 0) {
      alert("Please fill all input");
    } else {
      e.preventDefault();
      let result = await fetch("http://52.201.209.138:5000/register", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);
      if (result) {
        alert("Data saved succesfully");
        setEmail("");
        setName("");
        setPassword("");
      }
    }
    window.location.href = "/login";
  };
  return (
    <div
      style={{
        width: "100%",
        height: "700px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="register-container">
          <form>
            <div className="formControl">
              <label>Name</label>
              <input
                className="input"
                type="text"
                placeholder="Full name"
                onChange={inputName}
                value={name}
              ></input>
            </div>
            <div className="formControl">
              <label>Email</label>
              <input
                className="input"
                type="text  "
                placeholder="Email"
                onChange={inputEmail}
                value={email}
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
            <button className="loginButton" onClick={handleOnRegister}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
