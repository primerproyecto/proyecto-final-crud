import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Key, UserX } from "react-feather";
import { ChangePassword, FormProfile } from "../components";
import { useDeleteUser } from "../hooks";

import {
  Flex,
  Text,
  Button,
  Container,
  Box,
  Avatar,
  Heading,
  Card,
} from "@radix-ui/themes";
import "../components/avatarStyles.css";

export const Profile = () => {
  const [changeRender, setChangeRender] = useState(true);
  const { user, setUser } = useAuth();
  return (
    <Box>
      <Container size="3">
      <Card>
        <Flex gap="3" align="center" mb="5">
          <Button
            href="#"
            className="iconNav"
            onClick={() => setChangeRender(false)}
          >
            {" "}
            <Key />
            Cambiar contraseña
          </Button>
          <Button onClick={() => setChangeRender(true)}>Cambiar datos</Button>
          <Button onClick={() => useDeleteUser(setUser)} color="red">
            <UserX /> Delete user
          </Button>
        </Flex>
        <Box>
          {changeRender ? <FormProfile /> : <ChangePassword />}
        </Box>
        </Card>
      </Container>
    </Box>
  );
};
