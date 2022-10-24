import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, InlineButton } from "../../../../components/form/Button";
import { Form } from "../../../../components/form/Form";
import { Input } from "../../../../components/form/Input";
import AuthProvider, { AuthContext } from "../../../../context/AuthContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
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

const ContainerConfirm = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 20px 0 0 0;
`;

const SaveButton = styled(InlineButton)`
  padding: 8px 15px;
  font-size: 16px;
`;

const CancelButton = styled(InlineButton)`
  padding: 8px 15px;
  background-color: transparent;
  color: #52b6ff;
  font-size: 16px;
`;

export default function NewHabit({ hide }) {
  const [habit, setHabit] = useState({ name: "", days: [] });
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(
    Array.from({ length: 7 }, (_) => false)
  );
  const context = useContext(AuthContext);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  function updateDisabled() {
    setDisabled(!disabled);
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateDisabled();
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      habit,
      {
        headers: {
          Authorization: `Bearer ${context.user.token}`,
        },
      }
    );

    promise.then((res) => {
      alert("Sucesso");
      setHabit({ name: "", days: [] });
      setSelected(Array.from({ length: 7 }, (_) => false));
      updateDisabled();
    });

    promise.catch((err) => {
      alert("Ocorreu algum problema");
      updateDisabled();
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="nome do hábito"
          value={habit.name}
          onChange={(e) => setHabit({ ...habit, name: e.target.value })}
          disabled={disabled}
        />

        <Days>
          {"DSTQQSS".split("").map((day, i) => (
            <Day
              disabled={disabled}
              selected={selected[i]}
              updateSelected={() => {
                setSelected(
                  selected.map((s, k) => (k === i ? !selected[i] : s))
                );
              }}
              updateDay={() => {
                setHabit({
                  ...habit,
                  days: habit.days.includes(i)
                    ? habit.days.filter((d) => d !== i)
                    : (() => {
                        habit.days.push(i);
                        return habit.days;
                      })(),
                });
              }}
            >
              {day}
            </Day>
          ))}
        </Days>
        <ContainerConfirm>
          <CancelButton
            disabled={disabled}
            type="button"
            onClick={() => hide()}
          >
            Cancelar
          </CancelButton>
          <SaveButton disabled={disabled} type="submit">
            Salvar
          </SaveButton>
        </ContainerConfirm>
      </Form>
    </Container>
  );
}
