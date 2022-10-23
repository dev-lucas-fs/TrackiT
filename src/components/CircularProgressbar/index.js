import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const Container = styled.div`
  width: 90px;
  height: 90px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function TrackItCircularProgressbar({ value }) {
  return (
    <Container>
      <CircularProgressbar
        value={value}
        text={`Hoje`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "#52B6FF",
          pathColor: "#fff",
          trailColor: "transparent",
          strokeLinecap: "round",
          textSize: "20px",
          textColor: "#fff",
        })}
      />
    </Container>
  );
}
