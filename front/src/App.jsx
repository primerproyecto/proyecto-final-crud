import { StrictMode, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { ThemeProvider, styled } from "styled-components";
import { Footer, Header } from "./components";

import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel, Section } from "@radix-ui/themes";

const App = () => {
  return (
    <StrictMode>
      <Theme>
        <Header />
        <Section>
          <Outlet />
        </Section>
      </Theme>
    </StrictMode>
  );
};

export default App;
