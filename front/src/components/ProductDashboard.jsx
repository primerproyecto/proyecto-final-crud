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

import styled from "styled-components";
import { useCartRemoveError } from "../hooks";

export const ProductDashboard = ({ producto, modo }) => {
  const { user, setCarrito } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [okEliminado, setOkEliminado] = useState(false);

  const formSubmit = async (formData) => {
    /* const customFormData = {
      products: [
        {
          productId: formData.productId,
          cantidad: 1,
        },
      ],
    }; */
    Swal.fire({
      title: "Quieres eliminar este producto ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDisabled(true);
        setRes(await borraProducto(producto._id));
        setOkEliminado(false);
      }
    });
  };

  //? 2) funcion que se encarga del formulario- de la data del formulario
  //! ------------------------------------------------------------------------------
  useEffect(() => {
    useCartRemoveError(res, setRes, setOkEliminado);
    /* if (res?.status == 200) bridgeData("ALLUSER"); */
  }, [res]);

  useEffect(() => {}, [okEliminado]);

  //! ------------------------------------------------------------------------------
  //? 3) Estados de navegacion ----> lo veremos en siguiente proyectos
  //! ------------------------------------------------------------------------------
  if (okEliminado) {
    console.log("que es res", res);
    /*  return <Navigate to={`/carrito/${user.carrito}`} />; */
  }

  return (
    <>
      <FigureAdmin>
        <img src={producto.image} alt={producto.title} width="40" height="40" />
        <p>{producto.title}</p>
        {user && (
          <form onSubmit={handleSubmit(formSubmit)}>
            <label>
              <input
                type="text"
                hidden={true}
                value={producto._id}
                {...register("productId")}
              />
            </label>
            {/*  {user.rol && user.rol !== "admin" && (
                <Button disabled={isDisabled}>
                  <ShoppingCart />
                </Button>
              )} */}

            {user.rol && user.rol === "admin" ? (
              <>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Quieres borrar este producto del catálogo?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "rgb(73, 193, 162)",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "YES",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        console.log("que es producto", producto);
                        await borraProducto(producto._id);
                      }
                    });
                  }}
                >
                  Eliminar
                </button>
                <ButtonAlike to={`/editarProducto/${producto._id}`}>
                  <Edit />
                </ButtonAlike>
              </>
            ) : (
              ""
            )}
          </form>
        )}
      </FigureAdmin>
    </>
    /*  */
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
