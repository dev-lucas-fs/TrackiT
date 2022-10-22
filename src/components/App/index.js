import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../../pages/auth/SignIn";
import { ContainerApp, GlobalContainer, GlobalStyle } from "./styles";

export default function App() {
  return (
    <GlobalContainer>
      <GlobalStyle />
      <ContainerApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </ContainerApp>
    </GlobalContainer>
  );
}
