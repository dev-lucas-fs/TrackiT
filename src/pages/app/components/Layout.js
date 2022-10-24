import axios from "axios";
import React, { Children, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../context/AuthContext";
import HabitsProvider, { HabitsContext } from "../../../context/HabitsContext";
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
  const habitsContext = useContext(HabitsContext);
  const context = useContext(AuthContext);
  const [progress, setProgress] = useState(0);
  const { image } = context.user;
  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      {
        headers: {
          Authorization: `Bearer ${context.user.token}`,
        },
      }
    );

    promise.then((res) => {
      habitsContext.setHabits(res.data);
    });
  }, []);

  useEffect(() => {
    setProgress(
      (habitsContext.habits.reduce((prev, curr) => {
        return prev + (curr.done ? 1 : 0);
      }, 0) /
        habitsContext.habits.length) *
        100
    );
  }, [habitsContext.habits]);

  return (
    <Container>
      <Navbar image={image} />
      <Content>{children}</Content>
      <Footer progress={progress} />
    </Container>
  );
}
