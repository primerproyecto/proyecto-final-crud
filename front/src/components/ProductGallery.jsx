import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart, Edit } from "react-feather";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import {
  getMyCarrito,
  postCarrito,
} from "../services/API_user/carrito.service";
import { borraProducto } from "../services/API_user/product.service";
import { useCartAddError } from "../hooks/useCartAddError";
import styled from "styled-components";

export const ProductGallery = ({ producto, modo }) => {
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
    console.log('que es customFormData', customFormData)
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
    <>
        <figure>
          {producto.destacado && <p>es destacado</p>}
          <strong>{producto.title}</strong>
          <img src={producto.image} alt={producto.title} />
          <p>Precio: {producto.price}</p>
          <p>Size: {producto.size}</p>
          <p>Color: {producto.color}</p>
          <p>Categoría: {producto.categories}</p>
          <p>Destacado: {producto.destacado}</p>
          <figcaption>{producto.desc}</figcaption>
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
                {user.rol && user.rol !== "admin" && (
                  <Button disabled={isDisabled}>
                    <ShoppingCart />
                  </Button>
                )}
              </form>
            </>
          )}
        </figure>
    </>
  );
};

const Button = styled.button`
  border: 1px solid red;
  cursor: pointer;
  display: inline-block;
`;

const ButtonAlike = styled(Link)`
  border: 1px solid red;
  cursor: pointer;
  display: inline-block;
`;

const FigureAdmin = styled.figure`
  display: flex;
  gap: 1rem;
`;
