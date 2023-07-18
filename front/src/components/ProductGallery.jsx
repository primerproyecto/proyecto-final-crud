import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart } from "react-feather";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useForm } from "react-hook-form";
import {
  getMyCarrito,
  postCarrito,
} from "../services/API_user/carrito.service";
import { borraProducto } from "../services/API_user/product.service";
import { useCartAddError } from "../hooks/useCartAddError";

export const ProductGallery = ({ producto }) => {
  const { user, setCarrito } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [okAgregado, setOkAgregado] = useState(false);

  const formSubmit = async (formData) => {
    const customFormData = {
      products: [
        {
          productId: formData.productId,
          cantidad: 1,
        },
      ],
    };
    setIsDisabled(true);
    setRes(await postCarrito(user.carrito, customFormData));
    setIsDisabled(false);
  };

  //? 2) funcion que se encarga del formulario- de la data del formulario
  //! ------------------------------------------------------------------------------
  useEffect(() => {
    useCartAddError(res, setRes, setOkAgregado);
    /* if (res?.status == 200) bridgeData("ALLUSER"); */
  }, [res]);

  //! ------------------------------------------------------------------------------
  //? 3) Estados de navegacion ----> lo veremos en siguiente proyectos
  //! ------------------------------------------------------------------------------
  if (okAgregado) {
    console.log("que es res", res);
    /*  return <Navigate to={`/carrito/${user.carrito}`} />; */
  }

  return (
    <figure>
      <img src={producto.image} alt={producto.title} />
      <p>{producto.desc}</p>
      <p>Precio: {producto.price}</p>
      <p>Size: {producto.size}</p>
      <p>Color: {producto.color}</p>
      <p>Categoría: {producto.categories}</p>
      {user && (
        <>
          <form onSubmit={handleSubmit(formSubmit)}>
            <label>
              <input
                type="text"
                hidden={false}
                value={producto._id}
                {...register("productId")}
              />
            </label>
            <button disabled={isDisabled}>
              <ShoppingCart />
            </button>
            {user.rol && user.rol === "admin" ? (
              <button onClick={() => borraProducto(producto._id)}>
                Eliminar
              </button>
            ) : (
              ""
            )}
          </form>
          <button>
            <Heart />
          </button>{" "}
        </>
      )}

      <figcaption></figcaption>
    </figure>
  );
};
