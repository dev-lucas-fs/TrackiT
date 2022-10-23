import React from "react";
import styled from "styled-components";
import logo from "../../../assets/Logo.png";

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  padding: 50px 30px;
  gap: 20px;
  grid-template-rows: auto 1fr;
`;

const Logo = styled.img`
  justify-self: center;
  grid-row: 1/2;
  object-fit: cover;
`;

const Content = styled.div`
  grid-row: 2/3;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default function Layout({ children }) {
  return (
    <Container>
      <Logo src={logo} />
      <Content>{children}</Content>
    </Container>
  );
}
