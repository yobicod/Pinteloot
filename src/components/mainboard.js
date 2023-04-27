import React, { useState } from "react";
import styled from 'styled-components';
import Pin from "./Pin";

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  width: 100%;
  height: 100%;
  margin-top:15px;
  justify-content: center;
`

const Container = styled.div`
  background-color: white;
  width: 100%;
  column-gap: 10px;
  height: 100%;
  align-item:flex-start;
`

function Mainboard() {
    return(
        <Wrapper>
            <Container>
                <Pin />
                <Pin />
                <Pin />
                <Pin />
                <Pin />
                <Pin />
                <Pin />
                <Pin />
                <Pin />
                <Pin /><Pin />
            </Container>
        </Wrapper>
    )
}
export default Mainboard