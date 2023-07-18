import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/authContext";

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
        <NavLink to="/">
          <Home /> Inicio
        </NavLink>

        <nav>
          {user?.rol === "admin" ? (
            <NavLink to="/agregarProducto">
              {" "}
              <PlusCircle /> productos
            </NavLink>
          ) : null}
          {user !== null ? (
            <NavLink to={`/carrito/${user.carrito}`}>
              <Layout /> Carrito
            </NavLink>
          ) : null}
          {user !== null ? (
            <>
              <NavLink to="/profile">
                <UserPlus />
                Perfil{" "}
              </NavLink>
            </>
          ) : null}
          {user == null && (
            <NavLink to="/login">
              <LogIn />
              Login
            </NavLink>
          )}
          {user == null && (
            <NavLink to="/register">
              <UserPlus />
              Register
            </NavLink>
          )}

          {user !== null && (
            <a href="/login" onClick={() => logout()}>
              <LogOut /> Logout
            </a>
          )}
        </nav>
      </header>
    </>
  );
};
