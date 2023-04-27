import React, { useState } from "react";
import styled from "styled-components";

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

function Pin() {
  return (
    <Wrapper>
      <Container>
        <img src="https://i.pinimg.com/564x/26/47/17/264717dde03beb3473b525302f48cb12.jpg" />
      </Container>
    </Wrapper>
  );
}

export default Pin;
