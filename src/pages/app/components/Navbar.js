import React from "react";
import styled from "styled-components";
import logo from "../../../assets/TrackIt.png";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #126ba5;
  height: 70px;
  padding: 10px 20px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export default function Navbar({ image }) {
  return (
    <Container>
      <img src={logo} />
      <ProfileImage src={image} />
    </Container>
  );
}
