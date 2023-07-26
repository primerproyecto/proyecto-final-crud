import { StrictMode, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { ThemeProvider, styled } from "styled-components";
import { Footer, Header } from "./components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme";
const App = () => {
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
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
  }, []);
  return (
    <StrictMode>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Header />
        <ButtonChange onClick={toggleTheme}>
          {isDarkTheme ? (
            <span aria-label="Light mode" role="img">
              🌞
            </span>
          ) : (
            <span aria-label="Dark mode" role="img">
              🌜
            </span>
          )}
        </ButtonChange>
        <main>
          <Outlet />
        </main>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;

const ButtonChange = styled.button`
  width: fit-content;
  border-radius: 4px;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`;
