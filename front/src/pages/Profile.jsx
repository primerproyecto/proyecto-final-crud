import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Key, UserX } from "react-feather";
import { ChangePassword, FormProfile } from "../components";
import { useDeleteUser } from "../hooks";

import "../components/avatarStyles.css";
import {
  Button,
  Flex,
  Box,
  Container,
  Section,
  Grid,
  Heading,
  Tabs,
  TabsContent,
  TabsRoot,
  TabsTrigger,
  TabsList,
  Card,
  Text,
} from "@radix-ui/themes";

export const Profile = () => {
  const [changeRender, setChangeRender] = useState(true);
  const { user, setUser } = useAuth();
  return (
    <Box>
      <Container size={{
        initial: '2',
        sm: '3',
      }}  pl="2" pr="2">
        <Card style={{ boxShadow: "var(--shadow-6)" }}>
          <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Manage your account">
              <Tabs.Trigger
                className="TabsTrigger"
                value="tab1"
                style={{ fontSize: "var(--font-size-4" }}
              >
                <Text>Cambiar contraseña</Text>
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                <Text size="4">Cambiar datos</Text>
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab3">
                <Text size="4">Borrar usuario</Text>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              className="TabsContent"
              value="tab1"
              style={{ padding: "1rem" }}
            >
              <ChangePassword />
            </Tabs.Content>
            <Tabs.Content
              className="TabsContent"
              value="tab2"
              style={{ padding: "1rem" }}
            >
              <FormProfile />
            </Tabs.Content>
            <Tabs.Content
              className="TabsContent"
              value="tab3"
              style={{ padding: "1rem" }}
            >
              <Box>
                <Container size="3">
                  <Heading as="h1" size="6" mb="4" mt="3">
                    Borrar usuario
                  </Heading>
                  <Flex direction="column" gap="5">
                    <Text>
                      Si quieres darte de baja y borrar toda tu cuenta dale al
                      botón
                    </Text>
                    <Box>
                    <Button onClick={() => useDeleteUser(setUser)} color="red">
                      <UserX /> Delete user
                    </Button>
                    </Box>
                  </Flex>
                </Container>
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </Card>
      </Container>
    </Box>
  );
};
