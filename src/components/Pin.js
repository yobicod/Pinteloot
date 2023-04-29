import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Wrapper = styled.div`
display: inline-flex;
padding 8px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  width: 236px;
  img {
    width: 100%;
    display: flex;
    cursor: Zoom-in;
    border-radius: 16px;
    object-fit: cover;
  }
`;

function Pin(data) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Modal", { state: { data } });
  };
    
  return (
    <Wrapper>
      <Routes>
        <Route path="/Modal" element={<Modal />} exact />
      </Routes>
      <Container onClick={handleClick}>
        <img src={data.data.img} />
      </Container>
    </Wrapper>
  );
}

