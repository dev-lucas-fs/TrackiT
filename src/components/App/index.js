import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../../context/AuthContext";
import Habits from "../../pages/app/Habits";
import SignIn from "../../pages/auth/SignIn";
import SignUp from "../../pages/auth/SignUp";
import { ContainerApp, Global, GlobalContainer } from "./styles";

export default function App() {
  return (
    <AuthProvider>
      <Global />
      <GlobalContainer>
        <ContainerApp>
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<SignIn />} />
              <Route path="/cadastro" exact element={<SignUp />} />
              <Route path="/habitos" exact element={<Habits />} />
            </Routes>
          </BrowserRouter>
        </ContainerApp>
      </GlobalContainer>
    </AuthProvider>
  );
}
