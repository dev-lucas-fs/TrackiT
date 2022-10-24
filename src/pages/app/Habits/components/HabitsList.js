import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { InlineButton } from "../../../../components/form/Button";
import { AuthContext } from "../../../../context/AuthContext";
import Habit from "./Habit";
import NewHabit from "./NewHabit";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tittle = styled.h1`
  color: #126ba5;
  font-size: 22px;
  font-weight: 400;
`;

const Habits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NonHabitsText = styled.p`
  color: #666666;
  font-size: 18px;
`;

export default function HabitsList() {
  const [showNewHabit, setShowNewHabit] = useState(false);
  const [habits, setHabits] = useState([]);
  const context = useContext(AuthContext);
  const [habit, setHabit] = useState({ name: "", days: [] });
  function updateHabits() {
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      {
        headers: {
          Authorization: `Bearer ${context.user.token}`,
        },
      }
    );

    promise.then((res) => {
      setHabits(res.data);
    });
  }

  useEffect(() => updateHabits(), []);

  return (
    <Container>
      <Header>
        <Tittle>Meus hábitos</Tittle>
        <InlineButton
          data-identifier="create-habit-btn"
          onClick={() => setShowNewHabit(true)}
        >
          +
        </InlineButton>
      </Header>
      {showNewHabit ? (
        <NewHabit
          habit={habit}
          setHabit={setHabit}
          hide={() => setShowNewHabit(false)}
        />
      ) : (
        ""
      )}
      <Habits>
        {habits ? (
          habits.map((habit) => (
            <Habit
              id={habit.id}
              updateHabits={() => updateHabits()}
              key={habit.id}
              name={habit.name}
              days={habit.days}
            />
          ))
        ) : (
          <NonHabitsText data-identifier="no-habit-message">
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </NonHabitsText>
        )}
      </Habits>
    </Container>
  );
}
