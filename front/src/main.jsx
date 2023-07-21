import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  CheckCode,
  Carrito,
  ForgotPassword,
  Home,
  Login,
  Profile,
  Register,
  ModifyPassword,
  AgregarProducto,
  EditarProducto,
} from "./pages";
import { ProtectedCheckChildren, Protected } from "./components";
import { AuthContextProvider } from "./context/authContext.jsx";
import { ProductsContextProvider } from "./context/productsContext.jsx";
import { CartContextProvider } from "./context/cartContext.jsx";
import GlobalStyle from "./globalStyles.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/">
    <AuthContextProvider>
      <ProductsContextProvider>
        <GlobalStyle />
        {/* <CartContextProvider> */}
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/verifyCode"
              element={
                <ProtectedCheckChildren>
                  <CheckCode />
                </ProtectedCheckChildren>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
            <Route
              path="/carrito/:id"
              element={
                <Protected>
                  <Carrito />
                </Protected>
              }
            />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/changepassword"
              element={
                <Protected>
                  <ModifyPassword />
                </Protected>
              }
            />
            <Route
              path="/agregarProducto"
              element={
                <Protected>
                  <AgregarProducto />
                </Protected>
              }
            />
            <Route
              path="/editarProducto/:id"
              element={
                <Protected>
                  <EditarProducto />
                </Protected>
              }
            />
          </Route>
        </Routes>
        {/* </CartContextProvider>  */}
      </ProductsContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
