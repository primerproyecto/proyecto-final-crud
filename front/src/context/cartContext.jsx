import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCarrito } from "../services/API_user/carrito.service";

//! 1) ---------------PRIMERO CREAR EL CONTEXTO CON EL METODO CREATECONTEXT------
const CartContext = createContext();

//! 2) -------------- CREAR LA FUNCION QUE PROVEE DEL CONTEXTO Y QUE GRAPEA A LAS PAGINAS-----

export const CartContextProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyCarrito(carrito.data).then((res) => {
      setCarrito(res);
      setLoading(() => false);
    });
  }, []);

  // UseMemo memoriza el return de una funcion
  const value = useMemo(
    () => ({
      carrito,
      setCarrito,
      loading,
    }),
    [carrito]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

//! 3) --------------CREAR UN CUSTOM HOOK QUE NOS ayude a utilizar EEL CONTEXTO -------

export const useCart = () => {
  return useContext(CartContext);
};
