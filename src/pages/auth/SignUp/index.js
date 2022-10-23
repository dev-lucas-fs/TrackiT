import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../../components/form/Button";
import { Form } from "../../../components/form/Form";
import { Input } from "../../../components/form/Input";
import TrackItLink from "../../../components/Link";
import Layout from "../components/Layout";

export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    image: "",
  });
  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();

  function updateDisabledForm() {
    setDisableForm((prev) => !prev);
  }

  function handleForm(e) {
    e.preventDefault();
    console.log(user);
    updateDisabledForm();
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      user
    );

    promise.then((e) => {
      navigate("/");
    });

    promise.catch((err) => {
      updateDisabledForm();
      alert("Aconteceu algum problema!\nVerifique os campos!");
    });
  }

  return (
    <Layout>
      <Form onSubmit={handleForm}>
        <Input
          placeholder="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          disabled={disableForm}
        />
        <Input
          placeholder="senha"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          disabled={disableForm}
        />
        <Input
          placeholder="nome"
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          disabled={disableForm}
        />
        <Input
          placeholder="foto"
          type="text"
          value={user.foto}
          onChange={(e) => setUser({ ...user, image: e.target.value })}
          disabled={disableForm}
        />
        <Button>{disableForm ? "loading" : "Cadastrar"}</Button>
      </Form>
      <TrackItLink to="/" text="Já tem uma conta? Faça login!" />
    </Layout>
  );
}
