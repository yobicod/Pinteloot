import React, { useState } from "react";
import "./Styles/nav.css";
import navBell from "../Images/navBell.png";
import chat from "../Images/chat.png";
function Nav() {
  const [searchTxt, setSearchTxt] = useState("");
  const inputTxt = (event) => {
    setSearchTxt(event.target.value);
  };
  return (
    <div>
      <div className="navContainer">
        <div className="navBtn nav">
          <p className="homeTxt">Home</p>
        </div>
        <div className="navBtn createBtn nav">
          <p className="createTxt">Create</p>
        </div>
        <input
          className="searchBox nav"
          type="text"
          onChange={inputTxt}
          value={searchTxt}
        ></input>
        <img className="navBellIcon nav" src={navBell} alt="Bell icon"></img>
        <img className="navChatIcon nav" src={chat} alt="Chat icon"></img>
      </div>
    </div>
  );
}

export default Nav;
