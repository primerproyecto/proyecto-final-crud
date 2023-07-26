import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/authContext";
import styled from "styled-components";
import { lightTheme, darkTheme } from "../theme";

import {
  Home,
  LogIn,
  LogOut,
  UserPlus,
  Layout,
  PlusCircle,
} from "react-feather";

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <header>
        <StyleNavLinks to="/">
          <Home /> Inicio
        </StyleNavLinks>

        <nav>
          {user && user.rol === "admin" ? (
            <StyleNavLinks to="/dashboard">
              <PlusCircle /> Dashboard
            </StyleNavLinks>
          ) : null}
          {user !== null ? (
            <StyleNavLinks to={`/carrito/${user.carrito}`}>
              <Layout /> Carrito
            </StyleNavLinks>
          ) : null}
          {user !== null ? (
            <>
              <StyleNavLinks to="/profile">
                <UserPlus />
                Perfil{" "}
              </StyleNavLinks>
            </>
          ) : null}
          {user == null && (
            <StyleNavLinks to="/login">
              <LogIn />
              Login
            </StyleNavLinks>
          )}
          {user == null && (
            <StyleNavLinks to="/register">
              <UserPlus />
              Register
            </StyleNavLinks>
          )}

          {user !== null && (
            <ALink href="/login" onClick={() => logout()}>
              <LogOut /> Logout
            </ALink>
          )}
        </nav>
      </header>
    </>
  );
};

const ALink = styled.a`
  color: ${(props) => props.theme.text};
  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

const StyleNavLinks = styled(NavLink)`
  color: ${(props) => props.theme.text};
  &:hover {
    color: ${(props) => props.theme.text};
  }
`;
