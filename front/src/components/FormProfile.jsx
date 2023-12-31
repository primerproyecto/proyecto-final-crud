import { useForm } from "react-hook-form";

import { useAuth } from "../context/authContext";
import { Uploadfile } from "./Uploadfile";
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { updateUser } from "../services/API_user/user.service";
import { useUpdateError } from "../hooks";
import {
  Button,
  Box,
  Container,
  Flex,
  Text,
  Heading,
  Avatar,
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

export const FormProfile = () => {
  const { user, setUser, logout } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const defaultData = {
    name: user?.user,
  };

  //! ------------ 1) La funcion que gestiona el formulario----
  const formSubmit = (formData) => {
    Swal.fire({
      title: "Are you sure you want to change your data profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputfile = document.getElementById("file-upload").files;
        let customFormData;

        if (inputfile.length !== 0) {
          customFormData = { ...formData, image: inputfile[0] };
          setSend(true);
          setRes(await updateUser(customFormData));
          setSend(false);
        } else {
          customFormData = { ...formData };
          setSend(true);
          setRes(await updateUser(customFormData));
          setSend(false);
        }
      }
    });
  };

  //! -------------- 2 ) useEffect que gestiona la parte de la respuesta ------- customHook

  useEffect(() => {
    useUpdateError(res, setRes, setUser, logout);
  }, [res]);

  return (
    <>
      <Box>
        <Container size="3">
          <Heading as="h1" size="6" mb="4" mt="3">
            Cambiar nombre de usuario o avatar
          </Heading>
          <Flex gap="3" align="center">
            <Avatar src={user.image} fallback="S" size="7" />
            <Heading size="6">{user.user}</Heading>
            <Text>{user.rol}</Text>
          </Flex>

          <Form.Root className="FormRoot" onSubmit={handleSubmit(formSubmit)}>
            <Form.Field className="FormField" name="name">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Form.Label className="FormLabel">
                  Nuevo nombre de usario
                </Form.Label>
              </div>
              <Form.Control asChild>
                <input
                  className="Input"
                  type="text"
                  required
                  name="name"
                  {...register("name")}
                />
              </Form.Control>
            </Form.Field>
            <Uploadfile />

            <Form.Submit asChild>
              <Button size="3" style={{ marginTop: 10 }} color="pink">
                Cambiar
              </Button>
            </Form.Submit>
          </Form.Root>
        </Container>
      </Box>
    </>
  );
};
