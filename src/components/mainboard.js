import styled from "styled-components";
import Pin from "./Pin";
import React, { useState, useEffect } from "react";
import navBell from "../Images/navBell.png";
import profile from "../Images/profile-user.png";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

const Wrapper = styled.div`
  background-color: #fff;
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 15px;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled.div`
  background-color: white;
  width: 100%;
  column-gap: 10px;
  height: 100%;
  diplay: flex;
  flex-wrap: wrap;
  column-count: 5;
  column-gap: 10px;
  margin: 0 auto;
  height: 100%;
  max-width: 1260px;
  background-color: white;
`;

function Mainboard() {
  const [allPost, setAllPost] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/getAllPost", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "postdata");
        setAllPost(data.data);
      });
  }, []);

  const filteredPosts = allPost.filter((post) =>
    post.Title.toLowerCase().includes(searchTxt.toLowerCase())
  );

  const handleOnLogout = async (e) => {
    localStorage.clear();
  };

  return (
    <Wrapper>
      {/* <Nav /> */}
      <div className="nav-out-container">
        <div className="navContainer">
          <div className="navBtn nav">
            <Link to="/mainpage" style={{ textDecoration: "none" }}>
              <p className="homeTxt">Home</p>
            </Link>
          </div>
          <div className="navBtn createBtn nav">
            <Link to="/create" style={{ textDecoration: "none" }}>
              <p className="createTxt">Create</p>
            </Link>
          </div>
          <input
            className="searchBox nav"
            type="text"
            onChange={(e) => setSearchTxt(e.target.value)}
            value={searchTxt}
            style={{
              padding: "0 20px",
            }}
          />
          <img className="navBellIcon nav" src={navBell} alt="Bell icon" />

          <Link to="/profile">
            <img className="navChatIcon nav" src={profile} alt="Chat icon" />
          </Link>
          <div className="navBtn nav">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#fff" }}
              onClick={handleOnLogout}
            >
              <p className="createTxt">Log Out</p>
            </Link>
          </div>
        </div>
      </div>
      <Container>
        {filteredPosts
          .slice(0)
          .reverse()
          .map((value, index) => {
            return <Pin key={index} data={value} />;
          })}
      </Container>
    </Wrapper>
  );
}
export default Mainboard;
