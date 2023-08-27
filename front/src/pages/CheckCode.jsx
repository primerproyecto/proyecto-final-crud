import { useAuth } from "../context/authContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  checkCodeConfirmationUser,
  resendCodeConfirmationUser,
} from "../services/API_user/user.service";
import { useAutoLogin, useCheckCodeError } from "../hooks";
import { Navigate } from "react-router-dom";
import { ButtonReSend } from "../components";
import * as Form from "@radix-ui/react-form";

import {
  Button,
  Box,
  Container,
  Flex,
  Text,
  Heading,
  Avatar,
  Section,
} from "@radix-ui/themes";

export const CheckCode = () => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okCheck, setOkCheck] = useState(false);
  const [reloadPageError, setReloadPageError] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const { allUser, userLogin, setUser, user } = useAuth();
  const { register, handleSubmit } = useForm();

  //! 1) ---------------LAS FUNCIONES QUE GESTIONAN LOS SUBMIT DE LOS FORMULARIOS--------
  const formSubmit = async (formData) => {
    const userLocal = localStorage.getItem("user");

    if (userLocal == null) {
      /// -----> este usuario viene del registro porque no se a logado previamente
      /// ---> recordar alllUser es la res que recibo del registro, solo disponible cuando he echo un registro previo
      const customFormData = {
        email: allUser.data.user.email,
        confirmationCode: parseInt(formData.confirmationCode),
      };

      //! llamada al servicio
      setSend(true);
      setRes(await checkCodeConfirmationUser(customFormData));
      setSend(false);
    } else {
      // ------> este usuario viene del login porque existe en el local storage
      const customFormData = {
        email: user.email,
        confirmationCode: parseInt(formData.confirmationCode),
      };

      //! llamada al servicio
      setSend(true);
      setRes(await checkCodeConfirmationUser(customFormData));
      setSend(false);
    }
  };

  //!2) ---------------- USEEFFECT  QUE GESTIONAN LOS ERRRORES Y EL 200 CON UN CUSTOMhook -----
  useEffect(() => {
    useCheckCodeError(
      res,
      setDeleteUser,
      setOkCheck,
      setUser,
      setReloadPageError,
      setRes
    );
  }, [res]);

  //!3) ----------------- ESTADOS DE NAVEGACION O DE CONFIRMACION DE QUE LA FUNCIONALIDAD ESTA OK ----
  if (okCheck) {
    if (!localStorage.getItem("user")) {
      // autologin
      setOkCheck(() => false);
      useAutoLogin(allUser, userLogin, setOkCheck);
    } else {
      return <Navigate to="/profile" />;
    }
  }

  if (deleteUser) {
    return <Navigate to="/register" />;
  }

  if (reloadPageError) {
    return <Navigate to="/login" />;
  }
  return (
    <Box>
      <Container size="2">
        <Section>
          <Heading as="h1" size="8" mb="4">
            Verify your code 👌
          </Heading>
          <Text>Write the code sent to your email</Text>
          {/*  <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("confirmationCode", { required: false })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Registration code
            </label>
          </div>

          <div className="btn_container">
            <button
              id="btnCheck"
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              Verify Code
            </button>
          </div>
        </form> */}
        <Flex gap="3" align="baseline" mb="5">
          <Form.Root className="FormRoot" onSubmit={handleSubmit(formSubmit)}>
            <Flex gap="3" align="baseline">
              <Form.Field className="FormField" name="email">
                <Flex gap="3">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <Form.Label className="FormLabel">
                      Código de verificación
                    </Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                      Que has recibido en tu correo
                    </Form.Message>
                    <Form.Message className="FormMessage" match="typeMismatch">
                      Introduce el código válido
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className="Input"
                      type="text"
                      required
                      {...register("confirmationCode", { required: false })}
                    />
                  </Form.Control>
                </Flex>
              </Form.Field>
              <Form.Submit asChild>
                <Button size="3" style={{ marginTop: 10 }}>
                  Verificar código
                </Button>
              </Form.Submit>
            </Flex>
          </Form.Root>
          <ButtonReSend setReloadPageError={setReloadPageError} />
          </Flex>
          <Text as="p">
            If the code is not correct ❌, your user will be deleted from the
            database and you will need to register again.{" "}
          </Text>
        </Section>
      </Container>
    </Box>
  );
};
