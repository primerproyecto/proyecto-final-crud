import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ShoppingCart, Heart, Edit } from "react-feather";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import * as Dialog from "@radix-ui/react-dialog";
import {
  getMyCarrito,
  postCarrito,
} from "../services/API_user/carrito.service";
import { borraProducto } from "../services/API_user/product.service";
import * as Toast from "@radix-ui/react-toast";
import "./toast-styles.css";

import {
  Flex,
  Text,
  Button,
  Heading,
  Strong,
  Box,
  Card,
  Container,
  Link,
} from "@radix-ui/themes";

import { Cross2Icon } from "@radix-ui/react-icons";

import styled from "styled-components";
import { useProductRemoveError } from "../hooks";
import * as Avatar from "@radix-ui/react-avatar";
import { capitalizarPrimeraLetra } from "../utils/text";

export const ProductDashboard = ({ producto, setProducts }) => {
  const { user, setCarrito } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [okEliminado, setOkEliminado] = useState(false);

  const formSubmit = async (formData) => {
    const customFormData = {
      products: [
        {
          productId: formData.productId,
          cantidad: 1,
        },
      ],
    };
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

  const borrar = async () => {
    setIsDisabled(true);
    setRes(await borraProducto(producto._id));
    setOkEliminado(true);
  };

  //? 2) funcion que se encarga del formulario- de la data del formulario
  //! ------------------------------------------------------------------------------
  useEffect(() => {
    useProductRemoveError(res, setRes, setOkEliminado, setProducts);
    /* if (res?.status == 200) bridgeData("ALLUSER"); */
  }, [res]);

  //! ------------------------------------------------------------------------------
  //? 3) Estados de navegacion ----> lo veremos en siguiente proyectos
  //! ------------------------------------------------------------------------------
  if (okEliminado) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Card>
        <Flex gap="3" align="center" direction="column">
          <Avatar.Root className="AvatarRoot">
            <Avatar.Image
              className="AvatarImage"
              src={producto.image}
              alt={producto.title}
              width="300px"
            />
          </Avatar.Root>
          <Text size="5">
            <Strong>{capitalizarPrimeraLetra(producto.title)}</Strong>
          </Text>

          <Flex gap="5" p="3">
            {" "}
            <form onSubmit={handleSubmit(formSubmit)}>
              <label>
                <input
                  type="text"
                  hidden={true}
                  style={{ display: "none" }}
                  value={producto._id}
                  {...register("productId")}
                />
              </label>

              <Button
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
                      // await borraProducto(producto._id);
                      setIsDisabled(true);
                      setRes(await borraProducto(producto._id));
                      setOkEliminado(true);
                    }
                  });
                }}
              >
                Eliminar
              </Button>
            </form>
            <Link
              className="Button violet"
              href={`/editarProducto/${producto._id}`}
            >
              Editar
            </Link>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};
