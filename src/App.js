import React from "react";
import JokeList from "./components/JokeList";
import styled from "styled-components";
import Loader from "./components/Loader";

let StyledApp = styled.div`
  background-image: linear-gradient(
    to right bottom,
    var(--color-light-blue),
    var(--color-light-pink)
  );
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  return (
    <StyledApp>
      <JokeList />
    </StyledApp>
  );
}
