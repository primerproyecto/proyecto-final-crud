import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/authContext";
import styled from "styled-components";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon, DashboardIcon, ExitIcon, HomeIcon, AvatarIcon, BackpackIcon, EnterIcon, InputIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import "./headerStyles.css";
import * as Toolbar from "@radix-ui/react-toolbar";
import { Navigate } from "react-router-dom";
import {
  Box,
  Container,
  Text,
  Heading,
  Strong,
  Button,
  Card,
  Flex,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialog,
} from "@radix-ui/themes";


export const Header = () => {
  const { user, logout } = useAuth();

  const [alertLogOut, setAlertLogOut] = useState(false)

  const navigate = useNavigate()
  return (
    <>
      <Toolbar.Root className="topToolbar">
        <NavigationMenu.Root
          className="NavigationMenuRoot"
        >
          <NavigationMenu.List className="NavigationMenuList">
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild className="NavigationMenuLink">
                <NavLink to="/" active="true">
                  <HomeIcon />Inicio
                </NavLink>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            {user && user.rol === "user" ? (
              <NavigationMenu.Item>
                <NavigationMenu.Link className="NavigationMenuLink" asChild>
                  <NavLink to={`/carrito/${user.carrito}`} active="true">
                    <BackpackIcon />Carrito
                  </NavLink>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ) : null}

            {user && user.rol === "admin" ? (
              <NavigationMenu.Item>
                <NavigationMenu.Link className="NavigationMenuLink" asChild>
                  <NavLink to="/dashboard">
                    <DashboardIcon /> Dashboard
                  </NavLink>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ) : null}

            {user !== null ? (
              <NavigationMenu.Item>
                <NavigationMenu.Link className="NavigationMenuLink" asChild>
                  <NavLink to="/profile" active="true">
                    <AvatarIcon />Profile
                  </NavLink>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ) : null}

            <NavigationMenu.Item>
              {user !== null && (
                <NavigationMenu.Link className="NavigationMenuLink issue" asChild>
                  <NavLink to="" onClick={() => setAlertLogOut(true)} style={{color: 'blue !important'}}>
                   <ExitIcon /> Logout
                  </NavLink>
                </NavigationMenu.Link>
              )}
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              {user == null && (
                <NavigationMenu.Link className="NavigationMenuLink" asChild>
                  <NavLink to="/register" active="true">
                    <InputIcon />Register
                  </NavLink>
                </NavigationMenu.Link>
              )}
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              {user == null && (
                <NavigationMenu.Link className="NavigationMenuLink" asChild>
                  <NavLink to="/login" active="true">
                    <EnterIcon />Log in
                  </NavLink>
                </NavigationMenu.Link>
              )}
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="NavigationMenuIndicator">
              <div className="Arrow" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="ViewportPosition">
            <NavigationMenu.Viewport className="NavigationMenuViewport" />
          </div>
        </NavigationMenu.Root>
        <Toolbar.Separator />
      </Toolbar.Root>
      <AlertDialog.Root open={alertLogOut} onOpenChange={setAlertLogOut}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Salir de tu cuenta</AlertDialog.Title>
          <AlertDialog.Description size="4">
            Seguro que quieres hacer logout ?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel >
              <Button variant="soft" color="gray" size="3">
                Cancelar
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" size="3" onClick={() => {
                logout()
                navigate("/login");
                }}>
                Salir
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};
