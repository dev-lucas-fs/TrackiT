import React, { Children, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../context/AuthContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr auto;

  & > *:nth-child(1) {
    grid-row: 1/2;
  }
  & > *:nth-child(2) {
    grid-row: 2/3;
  }
  & > *:nth-child(3) {
    grid-row: 3/4;
  }
`;

const Content = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
  overflow-y: auto;
`;

export default function Layout({ children }) {
  const context = useContext(AuthContext);

  const { image } = context.user;

  return (
    <Container>
      <Navbar image={image} />
      <Content>{children}ss</Content>
      <Footer />
    </Container>
  );
}
