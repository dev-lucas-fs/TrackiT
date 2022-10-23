import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TrackItCircularProgressbar } from "../../../components/CircularProgressbar";

const Container = styled.div`
  display: flex;
  height: 70px;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
`;

const ContainerProgressBar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 50px;
`;

const ContainerLink = styled.div`
  > * {
    text-decoration: none;
    color: #52b6ff;
    font-size: 18px;
  }
`;

export default function Footer() {
  const navigate = useNavigate();

  return (
    <Container>
      <ContainerLink>
        <Link to="/habitos">Hábitos</Link>
      </ContainerLink>
      <ContainerProgressBar onClick={() => navigate("/hoje")}>
        <TrackItCircularProgressbar value={10} />
      </ContainerProgressBar>
      <ContainerLink>
        <Link to="/historico">Historico</Link>
      </ContainerLink>
    </Container>
  );
}
