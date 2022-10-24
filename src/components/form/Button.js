import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  background: #52b6ff;
  outline: none;
  border-radius: 4px;
  color: #fff;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  font-size: 20px;
`;

export const InlineButton = styled(Button)`
  display: inline-flex;
  width: auto;
  padding: 6px 12px;
`;
