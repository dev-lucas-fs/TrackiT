import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../../context/AuthContext";
import delImg from "../../../../assets/delete.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  gap: 10px;
  position: relative;
`;

const Tittle = styled.h1`
  color: #666666;
  font-weight: 400;
  font-size: 19.976px;
`;

const DayContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1.5px solid #d4d4d4;
  color: ${(props) => (props.selected ? "#fff" : "#d4d4d4;")};
  background: ${(props) => (!props.selected ? "#fff" : "#d4d4d4;")};
  font-size: 18px;
`;

function Day({ selected, updateSelected, updateDay, disabled, children }) {
  return (
    <DayContainer
      disabled={disabled}
      type="button"
      onClick={() => {
        updateSelected();
        updateDay();
      }}
      selected={selected}
    >
      {children}
    </DayContainer>
  );
}

const Days = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const DelButton = styled.button`
  position: absolute;
  padding: 10px;
  background: transparent;
  border: none;
  outline: none;
  top: 0px;
  right: 0px;
`;

export default function Habit({ name, days, id, updateHabits }) {
  const context = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);

  function updateDisabled() {
    setDisabled(!disabled);
  }

  function delHabit() {
    updateDisabled();
    if (window.confirm("Deseja deletar?") === true) {
      const promise = axios.delete(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/" +
          id,
        {
          headers: {
            Authorization: `Bearer ${context.user.token}`,
          },
        }
      );

      promise.then((res) => {
        updateHabits();
        updateDisabled();
      });
    }
  }

  return (
    <Container>
      <Tittle>{name}</Tittle>
      <Days>
        {"DSTQQSS".split("").map((d, i) => (
          <Day key={i + 1} disabled={true} selected={days.includes(i)}>
            {d}
          </Day>
        ))}
      </Days>
      <DelButton disabled={disabled} onClick={() => delHabit()}>
        <img src={delImg} />
      </DelButton>
    </Container>
  );
}
