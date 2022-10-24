import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
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
  const [loading, setLoading] = useState(false);

  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();
  function updateLoading() {
    setLoading((prev) => !prev);
  }
  function updateDisabledForm() {
    setDisableForm((prev) => !prev);
  }

  function handleForm(e) {
    e.preventDefault();
    updateLoading();
    updateDisabledForm();
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      user
    );

    promise.then((e) => {
      navigate("/");
      updateLoading();
    });

    promise.catch((err) => {
      updateDisabledForm();
      updateLoading();
      alert("Aconteceu algum problema!\nVerifique os campos!");
    });
  }

  return (
    <Layout>
      <Form onSubmit={handleForm}>
        <Input
          data-identifier="input-email"
          placeholder="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          disabled={disableForm}
        />
        <Input
          data-identifier="input-password"
          placeholder="senha"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          disabled={disableForm}
        />
        <Input
          data-identifier="input-name"
          placeholder="nome"
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          disabled={disableForm}
        />
        <Input
          data-identifier="input-photo"
          placeholder="foto"
          type="text"
          value={user.foto}
          onChange={(e) => setUser({ ...user, image: e.target.value })}
          disabled={disableForm}
        />
        <Button data-identifier="back-to-login-action">
          {disableForm ? (
            <ThreeDots color="#FFFFFF" height={25} width={25} />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </Form>
      <TrackItLink to="/" text="Já tem uma conta? Faça login!" />
    </Layout>
  );
}
