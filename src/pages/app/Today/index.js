import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import confirm from "../../../assets/confirm.png";
import dayjs from "dayjs";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 0;
`;

const Tittle = styled.h1`
  font-weight: 400;
  font-size: 22.976px;
  color: #126ba5;
`;

const Legend = styled.span`
  color: #bababa;
  font-size: 17.976px;
  font-weight: 400;
`;

const Habits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Habit = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  align-items: center;
  background: #fff;
  padding: 15px;
  border-radius: 5px;
`;

const HabitTittle = styled.h1`
  grid-column: 1/2;
  grid-row: 1/2;
  font-weight: 400;
  font-size: 19.976px;
  color: #666666;
`;

const HabitText = styled.p`
  grid-column: 1/2;
  grid-row: 2/3;
  font-weight: 400;
  font-size: 12.976px;
  color: #666666;
`;

const ConfirmButton = styled.button`
  grid-column: 2/3;
  grid-row: 1/3;
  width: 70px;
  height: 70px;
  border-radius: 5px;
  background-color: ${(props) => (!props.confirm ? "#ebebeb" : "8FC549")};
  border: none;
  outline: none;
`;

const weekInPtbr = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export default function Today() {
  const [habits, setHabits] = useState([]);

  const context = useContext(AuthContext);

  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      {
        headers: {
          Authorization: `Bearer ${context.user.token}`,
        },
      }
    );
  }, []);

  return (
    <Layout>
      <Header>
        <Tittle>{`${weekInPtbr[dayjs().day()]}, ${dayjs().format(
          "DD/MM"
        )}`}</Tittle>
        <Legend>Nenhum hábito concluído ainda</Legend>
      </Header>

      <Habits>
        <Habit>
          <HabitTittle>Ler 1 capítulo de livro</HabitTittle>
          <HabitText>
            Sequência atual: 3 dias
            <br />
            Seu recorde: 5 dias
          </HabitText>
          <ConfirmButton>
            <img src={confirm} />
          </ConfirmButton>
        </Habit>
      </Habits>
    </Layout>
  );
}
