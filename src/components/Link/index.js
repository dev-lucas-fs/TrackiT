import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  a {
    color: #52b6ff;
  }
`;

export default function TrackItLink({ to, text }) {
  return (
    <Container>
      <Link to={to}> {text} </Link>
    </Container>
  );
}
