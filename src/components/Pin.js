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

function Pin(data) {
    console.log(data.data)
  return (
        <Wrapper>
            <Container>
                <img src={data.data.img} />
            </Container>
        </Wrapper>
  );
}

export default Pin;