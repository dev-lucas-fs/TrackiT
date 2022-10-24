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

export default function Footer({ progress }) {
  const navigate = useNavigate();

  return (
    <Container>
      <ContainerLink>
        <Link data-identifier="habit-page-action" to="/habitos">
          Hábitos
        </Link>
      </ContainerLink>
      <ContainerProgressBar onClick={() => navigate("/hoje")}>
        <TrackItCircularProgressbar value={progress} />
      </ContainerProgressBar>
      <ContainerLink>
        <Link data-identifier="historic-page-action" to="/historico">
          Historico
        </Link>
      </ContainerLink>
    </Container>
  );
}
