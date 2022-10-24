import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import confirm from "../../../assets/confirm.png";
import dayjs from "dayjs";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { HabitsContext } from "../../../context/HabitsContext";
import { useNavigate } from "react-router-dom";

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
  color: ${(props) => (props.done ? "#8FC549" : "#bababa")};
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
  color: ${(props) => (props.done ? "#8FC549" : "#666666")};
`;

export default function Today() {
  const [progress, setProgress] = useState(0);
  const habitsContext = useContext(HabitsContext);
  const [markedHabits, setMarkedHabits] = useState([]);
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    console.log(markedHabits);
  }, [markedHabits]);

  useEffect(() => {
    setProgress(
      (habitsContext.habits.reduce((prev, curr) => {
        return prev + (curr.done ? 1 : 0);
      }, 0) /
        habitsContext.habits.length) *
        100
    );
  }, [habitsContext.habits]);

  useEffect(() => {
    setMarkedHabits(habitsContext.habits.map((_) => false));
    if (JSON.stringify(context.user) === "{}") isSignin();
    else setOk(true);
  }, []);

  function isSignin() {
    navigate("/");
  }
  function updateHabits(i = false) {
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
  }

  useEffect(() => {
    updateHabits();
  }, []);

  function handleDone(id, i) {
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
      if (!habitsContext.habits[i].done) {
        markedHabits[i] = !markedHabits[i];
        setMarkedHabits([...markedHabits]);
      }
    });

    promise.catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      {ok ? (
        <Layout>
          <Header>
            <Tittle>{`${weekInPtbr[dayjs().day()]}, ${dayjs().format(
              "DD/MM"
            )}`}</Tittle>
            <Legend done={!(progress === 0)}>
              {progress === 0
                ? "Nenhum hábito concluído ainda"
                : `${progress.toFixed(0)}% dos hábitos concluídos`}
            </Legend>
          </Header>

          <Habits>
            {habitsContext.habits.map(
              ({ name, currentSequence, highestSequence, done, id }, i) => (
                <Habit data-identifier="today-infos">
                  <HabitTittle>{name}</HabitTittle>

                  <HabitText>
                    Sequência atual:
                    <DayText done={done && markedHabits[i]}>
                      {currentSequence} dias
                    </DayText>
                    <br />
                    Seu recorde:{" "}
                    <DayText
                      done={
                        done &&
                        markedHabits[i] &&
                        highestSequence === currentSequence
                      }
                    >
                      {highestSequence} dias
                    </DayText>
                  </HabitText>
                  <ConfirmButton
                    data-identifier="done-habit-btn"
                    onClick={() => {
                      handleDone(id, i);
                    }}
                    done={done}
                  >
                    <img src={confirm} />
                  </ConfirmButton>
                </Habit>
              )
            )}
          </Habits>
        </Layout>
      ) : (
        ""
      )}
    </>
  );
}
