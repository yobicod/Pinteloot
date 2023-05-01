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

  const handleOnLogin = async (e) => {
    const user = {
      email: id,
      password: password,
    };

    if (id.length === 0 || password.length === 0) {
      alert("Please fill all input");
    } else {
      e.preventDefault();
      let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);
      if (result) {
        console.log("Login succesfully");
        setId("");
        setPassword("");
        localStorage.setItem("user", JSON.stringify(result));
      } else {
        console.log("Login unsuccessfull");
      }
    }
  };

  const handleOnLogout = async (e) => {
    localStorage.clear();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "700px",
        // backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* <Nav /> */}
      <div className="containerr">
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
            <button className="loginButton" onClick={handleOnLogin}>
              Login
            </button>
            <button className="loginButton" onClick={handleOnLogout}>
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
