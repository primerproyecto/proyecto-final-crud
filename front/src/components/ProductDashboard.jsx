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
import { Toast } from "@radix-ui/react-toast";

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

export const ProductDashboard = ({ producto, setProducts }) => {
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
    // Swal.fire({
    //   title: "Quieres eliminar este producto ?",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "rgb(73, 193, 162)",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "YES",
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     setIsDisabled(true);
    //     setRes(await borraProducto(producto._id));
    //     setOkEliminado(false);
    //   }
    // });
  };

  const borrar = async () => {
    setIsDisabled(true);
    setRes(await borraProducto(producto._id));
    setOkEliminado(true);
  }

  //? 2) funcion que se encarga del formulario- de la data del formulario
  //! ------------------------------------------------------------------------------
  useEffect(() => {
    useProductRemoveError(res, setRes, setOkEliminado, setProducts);
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
      <Card>
        <Avatar.Root className="AvatarRoot">
          <Avatar.Image
            className="AvatarImage"
            src={producto.image}
            alt={producto.title}
          />
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            CT
          </Avatar.Fallback>
        </Avatar.Root>
        <p>{producto.title}</p>

        <form onSubmit={handleSubmit(formSubmit)}>
          {/* <label>
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
                  await borraProducto(producto._id);
                }
              });
            }}
          >
            Eliminar
          </Button> */}
          <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="Button violet">Eliminar</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
              <Dialog.Title className="DialogTitle">Eliminar producto</Dialog.Title>
              <Dialog.Description className="DialogDescription">
                Quieres eleminar el producto {producto._id}
              </Dialog.Description>
              
              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                }}
              >
                <Dialog.Close asChild>
                  <button
                    className="Button green"
                    onClick={async () => borrar()}
                  >
                    Eliminar producto
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Close asChild>
                <button className="IconButton" aria-label="Close">
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        </form>
        <Link href={`/editarProducto/${producto._id}`}>
          <Edit />
        </Link>
        
      </Card>
      {okEliminado &&
        createPortal(
          <Toast.Provider
            swipeDirection="right"
            duration={200000}
          >
            <Toast.Root
              className="ToastRoot"
              open={okEliminado}
              onOpenChange={setOkEliminado}
            >
              <Toast.Title className="ToastTitle">
                <Text>Producto eliminado del carrito</Text>
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
