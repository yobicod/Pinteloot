import styled from "styled-components";
import Pin from "./Pin";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
const Wrapper = styled.div`
  background-color: white;
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 15px;
  justify-content: center;
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

  useEffect(() => {
    fetch("http://localhost:5000/getAllPost", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "postdata");
        setAllPost(data.data);
        console.log(allPost);
      });
  }, []);
  console.log(allPost);
  return (
    <Wrapper>
      <Container>
        {allPost
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
