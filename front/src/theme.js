import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;
export const lightTheme = {
  body: "#f1f1f1",
  text: "#121620",
  primary: "#C7EF00",
};
export const darkTheme = {
  body: "#121620",
  text: "#f1f1f1",
  primary: "#D56F3E",
};
