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
import { capitalizarPrimeraLetra } from "../utils/text";
Share2Icon;

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
  AspectRatio,
  Inset,
} from "@radix-ui/themes";
import * as Toast from "@radix-ui/react-toast";
import { Share2Icon } from "@radix-ui/react-icons";
import { aEuros } from "../utils";

export const ProductGallery = ({ itemId, producto }) => {
  const { user, setCarrito } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [okAgregado, setOkAgregado] = useState(false);
  const [open, setOpen] = React.useState(false);

  console.log('que es user ', user);

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
  // if (okAgregado) {
  //   console.log("que es res", res);
  // }


  return (
    <>
      <Card>
        <Inset side="top" mb="5">
          <Link to={`/detalleProducto/${itemId}`}>
            <img src={producto.image} alt={producto.title} />
          </Link>
        </Inset>
        {user?.rol && user.rol !== "admin" && (<Button size="4"  mt="5">
                  Favoritos
                </Button>
              )}
        <Text as="h1" size="7" mb="3">
          <Strong>{capitalizarPrimeraLetra(producto.title)}</Strong>
        </Text>
        {/* <Button>Agregar a favoritos</Button> */}
        <Text as="h2" size="5" mb="3" color="pink">
          <Strong>{aEuros.format(producto.price)}</Strong>
        </Text>

        <Flex gap="3" justify="around">
        <Flex grow="1" align="center" gap="3">
            <Text size="5">
              <Strong>Size:</Strong> 
            </Text>
            <Text size="5">{producto.size}
            </Text>
          </Flex>
          <Flex grow="1" align="center" gap="3">
            <Text size="5">
              <Strong>Color:</Strong> 
            </Text>
            <Text size="5">{producto.color}
            </Text>
          </Flex>
        </Flex>
        <Flex align="center" width="100%" mb="4" mt="4">
          <Badge color="pink" size="2" radius="full" mr="auto" ml="auto">
            <Text size="5">{producto.categories}</Text>
          </Badge>
        </Flex>
        <Text size="5">
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
              {user.rol && user.rol !== "admin" && (<Button size="4" disabled={isDisabled} mt="5">
                  Agregar
                </Button>
              )}
            </form>
          </>
        )}
      </Card>
      {okAgregado &&
        createPortal(
          <Toast.Provider swipeDirection="right" duration={2000}>
            <Toast.Root
              className="ToastRoot"
              open={okAgregado}
              onOpenChange={setOkAgregado}
            >
              <Toast.Title className="ToastTitle">
                <Text>Producto agregado al carrito</Text>
              </Toast.Title>
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
