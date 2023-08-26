import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Key, UserX } from "react-feather";
import { ChangePassword, FormProfile } from "../components";
import { useDeleteUser } from "../hooks";


import { Flex, Text, Button, Container, Box, Avatar, Heading, } from "@radix-ui/themes";
import '../components/avatarStyles.css'

export const Profile = () => {
  const [changeRender, setChangeRender] = useState(true);
  const { user, setUser } = useAuth();
  return (
      <Box>
      <Container size="3">
        <div className="flexContainer-ai-center">
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
          <Button onClick={() => useDeleteUser(setUser)}>
            <UserX /> Delete user
          </Button>
        </div>
        <div className="fluidContainerProfile">
          {changeRender ? <FormProfile /> : <ChangePassword />}
        </div>
        </Container>
      </Box>
      
  );
};
