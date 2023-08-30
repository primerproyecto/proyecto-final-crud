import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { forgotPasswordUser } from "../services/API_user/user.service";
import { useForgotPassword } from "../hooks";

import {
  Flex,
  Text,
  Button,
  Heading,
  Strong,
  Box,
  Card,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogRoot,
  DialogDescription,
  DialogClose,
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

export const ForgotPassword = () => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const { handleSubmit, register } = useForm();
  const [forgotOk, setForgotOk] = useState(false);

  const [mensajeOk, setMensajeOk] = useState(false);
  const [mensaje404, setMensaje404] = useState(false);

  //! 1)-------------------- LA FUNCIOON QUE SE ENCARGA DE GESTIONAR LOS DATOS DEL FORMULARIO

  const formSubmit = async (formData) => {
    setSend(true);
    setRes(await forgotPasswordUser(formData));
    setSend(false);
  };
  //! 2) ----------------USEEFFECT QUE GESTIONA LA RES CON SUS ERRORES Y SUS 200
  useEffect(() => {
    useForgotPassword(res, setRes, setForgotOk, setMensaje404);
  }, [res]);

  //! 3) ---------------- ESTADOS DE NAVEGACION O QUE LA fiuncion ESTA ok

  if (forgotOk) {
    setTimeout(() => {
      return <Navigate to="/login" />;
    }, 20000);
    
  }

  return (
    <>
      <Container size="2">
        <Card>
          <div className="form-wrap">
            <h1>Olvidaste tu contraseña ?</h1>
            <Form.Root className="FormRoot" onSubmit={handleSubmit(formSubmit)}>
              <Form.Field className="FormField" name="email">
                <div>
                  <Form.Label className="FormLabel">
                    Enter your email to send you the new password 💌
                  </Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    Please enter your email fdfd
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
              <Form.Submit asChild>
                <Button
                  size="3"
                  style={{ marginTop: 10 }}
                  accent="ogange"
                  disabled={send}
                >
                  Enviar
                </Button>
              </Form.Submit>
            </Form.Root>

            {/* <form onSubmit={handleSubmit(formSubmit)}>
          <div className="form-group">
            <label htmlFor="custom-input" className="custom-placeholder">
              Email
            </label>
            <input
              className="input_user"
              type="text"
              id="custom-input"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
          </div>

          <div className="btn_container">
            <Button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              Change password
            </Button>
          </div>

          <p className="bottom-text">
            <small></small>
          </p>
        </form> */}
          </div>
        </Card>
      </Container>

      <DialogRoot open={forgotOk}>
        <DialogContent>
          <DialogTitle>Contraseña enviada</DialogTitle>
          <DialogDescription size="4" mb="4">
            <Text>
              Te hemos enviado una nueva contraseña a la dirección de mail suministrada.
            </Text>
          </DialogDescription>
          <Flex gap="3" justify="end">
            <DialogClose>
              <Button
                size="3"
                variant="soft"
                color="gray"
                 onClick={() => setForgotOk(false)}
              >
                Close
              </Button>
            </DialogClose>
          </Flex>
        </DialogContent>
      </DialogRoot>
      <DialogRoot open={mensaje404}>
        <DialogContent>
          <DialogTitle>No reconocemos esa dirección de email</DialogTitle>
          <DialogDescription>Asegurate de introducir el mail con el que te registraste</DialogDescription>
          <Flex gap="3" justify="end">
            <DialogClose>
              <Button
                size="3"
                variant="soft"
                color="gray"
                 onClick={() => setMensaje404(false)}
              >
                Close
              </Button>
            </DialogClose>
          </Flex>
        </DialogContent>
      </DialogRoot>
    </>
  );
};
