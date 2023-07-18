import { StrictMode } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./components";
const App = () => {
  return (
    <StrictMode>
      <Header />
      <main>
        <Outlet />
      </main>
    </StrictMode>
  );
};

export default App;
