import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { loginUser } from "../services/API_user/user.service";
import { useLoginError } from "../hooks";
import { useAuth } from "../context/authContext";
import * as Form from "@radix-ui/react-form";
import { Flex, Text, Button, Heading, Strong, Box, Card, Container } from "@radix-ui/themes";

import "./loginStyles.css";

export const Login = () => {
  const { handleSubmit, register, control } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [loginOk, setLoginOk] = useState(false);
  const { userLogin, setUser } = useAuth();

  //! 1) ------------------ FUNCION QUE GESTIONA EL FORMULARIO----------
  const formSubmit = async (formData) => {
    console.log("que es formdata", formData);
    setSend(true);
    setRes(await loginUser(formData));
    setSend(false);
  };

  //! 2) ------------------ LOS USEEFFECT QUE GESTIONAN LA RESPUESTA: ERRORES Y 200

  useEffect(() => {
    setUser(() => null);
  }, []);
  useEffect(() => {
    useLoginError(res, setLoginOk, userLogin, setRes);
  }, [res]);

  //! 3) ------------------ ESTADOS DE NAVEGACION O ESTADOS DE FUNCIONALIDADES OK

  if (loginOk) {
    if (res.data.user.check == false) {
      return <Navigate to="/verifyCode" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return (
    <Container size="1">
    <Card size="5">
    <Flex align="center">
      <Form.Root className="FormRoot" onSubmit={handleSubmit(formSubmit)}>
        <Form.Field className="FormField" name="email">
          <div>
            <Form.Label className="FormLabel">Email</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your email
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="email"
              required
              {...register("email", { required: true })}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="password">
          <div>
            <Form.Label className="FormLabel">Password</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your password
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="password"
              {...register("password", { required: true })}
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <Button size="3" style={{ marginTop: 10 }} accent="ogange">
            Enviar
          </Button>
        </Form.Submit>
      </Form.Root>
      </Flex>
    </Card>
    </Container>
  );
};
