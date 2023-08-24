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
import {capitalizarPrimeraLetra} from '../utils/text'

import { createPortal } from "react-dom";

import {
  Flex,
  Text,
  Button,
  Heading,
  Strong,
  Box,
  Badge,
  Card,
} from "@radix-ui/themes";
import * as Toast from "@radix-ui/react-toast";

export const ProductGallery = ({ producto, modo }) => {
  const { user, setCarrito } = useAuth();
  console.log("que es user", user);
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [okAgregado, setOkAgregado] = useState(false);
  const [open, setOpen] = React.useState(false);

  const formSubmit = async (formData) => {
    const customFormData = {
      propietario: user._id,
      products: [
        {
          productId: formData.productId,
          cantidad: 1,
        },
      ],
    };
    console.log("que es customFormData", customFormData);
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
  }

  return (
    <>
      <Card style={{ maxWidth: 350 }}>
        {producto.destacado && <p>es destacado</p>}
       
        <Box>
          <img src={producto.image} alt={producto.title} />
        </Box>
        <Text as="h1" size={1}>
          <Strong>{capitalizarPrimeraLetra(producto.title)}</Strong>
        </Text>

        <Flex gap="3" justify="between">
          <Text as="p">
            <Strong>Size:</Strong> {producto.size}
          </Text>
          <Text as="p">
            <Strong>Color:</Strong> {producto.color}
          </Text>
          <Badge color="orange" size={2}>
            {producto.categories}
          </Badge>
        </Flex>
        <Text as="p">
          <Strong>Descripcion:</Strong>
          {producto.desc}
        </Text>
        {user && (
          <>
            <form onSubmit={handleSubmit(formSubmit)}>
              <label>
                <input
                  type="text"
                  hidden={true}
                  style={{ display: "none" }}
                  defaultValue={producto._id}
                  {...register("productId")}
                />
              </label>
              {user.rol && user.rol !== "admin" && (
                <Button className="Button" disabled={isDisabled}>
                  <ShoppingCart />
                  Agregar
                </Button>
              )}
            </form>
          </>
        )}
      </Card>
      {okAgregado &&
        createPortal(
          <Toast.Provider swipeDirection="right" duration={20000}>
            <Toast.Root
              className="ToastRoot"
              open={okAgregado}
              onOpenChange={setOkAgregado}
            >
              <Toast.Title className="ToastTitle">
                <Text>Producto agregado al carrito</Text>
              </Toast.Title>
              <Toast.Description asChild>amecico a desayuna</Toast.Description>
              <Toast.Action
                className="ToastAction"
                asChild
                altText="Goto schedule to undo"
              >
                <button className="Button small green">Undo</button>
              </Toast.Action>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
          </Toast.Provider>,
          document.body
        )}
    </>
  );
};

/* const Button = styled.button`
  border: 1px solid red;
  cursor: pointer;
  display: inline-block;
`; */

const ButtonAlike = styled(Link)`
  border: 1px solid red;
  cursor: pointer;
  display: inline-block;
`;

const FigureAdmin = styled.figure`
  display: flex;
  gap: 1rem;
`;
