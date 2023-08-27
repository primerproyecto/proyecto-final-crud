import { StrictMode, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

import { Footer, Header } from "./components";


import { Theme, ThemePanel, Section } from "@radix-ui/themes";
import { ThemeProvider } from 'next-themes';

const App = () => {
  return (
    <StrictMode>
    <ThemeProvider attribute="class">
      <Theme appearance="light">
        <Header />
        <Section>
          <Outlet />
        </Section>
      </Theme>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
