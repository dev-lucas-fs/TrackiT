import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../../context/AuthContext";
import Habits from "../../pages/app/Habits";
import History from "../../pages/app/History";
import Today from "../../pages/app/Today";
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
              <Route path="/historico" exact element={<History />} />
              <Route path="/hoje" exact element={<Today />} />
            </Routes>
          </BrowserRouter>
        </ContainerApp>
      </GlobalContainer>
    </AuthProvider>
  );
}
