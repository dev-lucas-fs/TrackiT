import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/form/Button";
import { Form } from "../../../components/form/Form";
import { Input } from "../../../components/form/Input";
import TrackItLink from "../../../components/Link";
import { AuthContext } from "../../../context/AuthContext";
import Layout from "../components/Layout";

export default function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  function updateDisabledForm() {
    setDisableForm((prev) => !prev);
  }

  function updateLoading() {
    setLoading((prev) => !prev);
  }

  function handleForm(e) {
    e.preventDefault();
    updateLoading();
    updateDisabledForm();
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      user
    );

    promise.then((res) => {
      const { token, name, email, image } = res.data;
      const user = {
        token,
        name,
        email,
        image,
      };
      context.setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/hoje");
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
        <Button data-identifier="login-btn">
          {loading ? (
            <ThreeDots color="#FFFFFF" height={25} width={25} />
          ) : (
            "Entrar"
          )}
        </Button>
      </Form>
      <TrackItLink
        data-identifier="sign-up-action"
        to="/cadastro"
        text="Não tem uma conta? Cadastre-se!"
      />
    </Layout>
  );
}
