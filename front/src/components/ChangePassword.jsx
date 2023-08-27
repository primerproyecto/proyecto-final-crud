import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { changePasswordUser } from "../services/API_user/user.service";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useChangePasswordError } from "../hooks";

import * as Form from '@radix-ui/react-form';
import { Button, Box, Container, Section, Heading } from "@radix-ui/themes";

export const ChangePassword = () => {
  const { setUser } = useAuth();
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  //! -----------------1) LA FUNCIOON QUE GESTIONA EL FORMULARIO

  const formSubmit = (formData) => {
    const { password, newPassword, confirmPassword } = formData;
    if (newPassword === confirmPassword) {
      Swal.fire({
        title: "Are you sure you want to change your password?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(73, 193, 162)",
        cancelButtonColor: "#d33",
        confirmButtonText: "YES",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setSend(true);
          setRes(await changePasswordUser({ password, newPassword }));
          setSend(false);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: " New Password don't match witch confirmation password❎.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  //! ------------------2) GESTION DE LA RESPUESTA POR EL CUSTOMHOOK Y AYUDADO POR EL USEEFFECT

  useEffect(() => {
    console.log(res);
    useChangePasswordError(res, setRes, setUser);
  }, [res]);

  return (
    <Box>
    <Container size="3">
    <Heading as="h1" size="6" mb="2" mt="3">Cambiar contraseña</Heading>
      <Form.Root className="FormRoot">
      <Form.Field className="FormField" name="name">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Contraseña</Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="password"
              name="password"
              {...register("password", { required: true })}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="name">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Nueva contraseña</Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="password"
              name="newPassword"
              {...register("newPassword", { required: true })}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="name">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Confirma la nueva contraseña</Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="password"
              name="confirmPassword"
              {...register("confirmPassword", { required: true })}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
        <Button size="3" style={{ marginTop: 10 }}>
          Cambiar contraseña
        </Button>
      </Form.Submit>
      </Form.Root>
      </Container>
    </Box>
  );
};
