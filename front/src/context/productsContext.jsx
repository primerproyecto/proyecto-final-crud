import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { getAllProducts } from "../services/API_user/product.service";

//! 1) ---------------PRIMERO CREAR EL CONTEXTO CON EL METODO CREATECONTEXT------
const ProductsContext = createContext();

//! 2) -------------- CREAR LA FUNCION QUE PROVEE DEL CONTEXTO Y QUE GRAPEA A LAS PAGINAS-----

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [recargar, setRecargar] = useState(false);

  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res);
      setLoading(() => false);
    });
  }, [recargar]);
  // UseMemo memoriza el return de una funcion
  const value = useMemo(
    () => ({
      products,
      setProducts,
      loading,
      setRecargar,
      setLoading
    }),
    [products]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

//! 3) --------------CREAR UN CUSTOM HOOK QUE NOS ayude a utilizar EEL CONTEXTO -------

export const useProducts = () => {
  return useContext(ProductsContext);
};
