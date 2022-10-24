import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import confirm from "../../../assets/confirm.png";
import dayjs from "dayjs";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { HabitsContext } from "../../../context/HabitsContext";

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
  background-color: ${(props) => (!props.done ? "#ebebeb" : "#8FC549")};
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

const DayText = styled.span`
  font-weight: 400;
  font-size: 12.976px;
  color: ${(props) => (props.marked ? "#8FC549" : "#666666")};
`;

export default function Today() {
  const habitsContext = useContext(HabitsContext);
  const [markedHabits, setMarkedHabits] = useState(
    habitsContext.habits.map((_) => false)
  );
  const context = useContext(AuthContext);

  function updateHabits(i) {
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
      setMarkedHabits(
        res.data.map((m, k) => (i === k ? !markedHabits[i] : markedHabits[i]))
      );
    });
  }

  useEffect(() => {
    updateHabits();
  }, []);

  function handleDone(id) {
    const habit = habitsContext.habits.filter((habit) => habit.id === id)[0];
    const url = habit.done
      ? `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`
      : `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
    const promise = axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${context.user.token}`,
        },
      }
    );

    promise.then((res) => {
      updateHabits();
    });

    promise.catch((err) => {
      console.log(err);
    });
  }

  return (
    <Layout>
      <Header>
        <Tittle>{`${weekInPtbr[dayjs().day()]}, ${dayjs().format(
          "DD/MM"
        )}`}</Tittle>
        <Legend>Nenhum hábito concluído ainda</Legend>
      </Header>

      <Habits>
        {habitsContext.habits.map(
          ({ name, currentSequence, highestSequence, done, id }) => (
            <Habit>
              <HabitTittle>{name}</HabitTittle>

              <HabitText>
                Sequência atual: <DayText>{currentSequence}</DayText> dias
                <br />
                Seu recorde: <DayText>{highestSequence}</DayText> dias
              </HabitText>
              <ConfirmButton onClick={() => handleDone(id)} done={done}>
                <img src={confirm} />
              </ConfirmButton>
            </Habit>
          )
        )}
      </Habits>
    </Layout>
  );
}
