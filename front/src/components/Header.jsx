import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/authContext";
import styled from "styled-components";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon, DashboardIcon, ExitIcon, HomeIcon, AvatarIcon, BackpackIcon, EnterIcon, InputIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import "./headerStyles.css";
import * as Toolbar from "@radix-ui/react-toolbar";


export const Header = () => {
  const { user, logout } = useAuth();
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
                  <NavLink to="/dashboard" active="true">
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
                <NavigationMenu.Link className="NavigationMenuLink" asChild>
                  <NavLink to="/login" onClick={() => logout()} active="true">
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
    </>
  );
};
