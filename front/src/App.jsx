import { StrictMode, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { ThemeProvider, styled } from "styled-components";
import { Footer, Header } from "./components";

import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

const App = () => {
  /* const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark"; */

  /* const toggleTheme = () => {
    const updatedTheme = isDarkTheme ? "light" : "dark";
    setTheme(updatedTheme);
    localStorage.setItem("theme", updatedTheme);
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme && ["dark", "light"].includes(savedTheme)) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []); */
  return (
    <StrictMode>
      <Theme>
        <Header />
        <main>
          <Outlet />
        </main>
      </Theme>
    </StrictMode>
  );
};

export default App;
