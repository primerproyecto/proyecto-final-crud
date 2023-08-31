import React from "react";
import { createPortal } from "react-dom";
import { useId, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  getMyCarrito,
  postCarrito,
} from "../services/API_user/carrito.service";
import {
  addToFavorites,
  removeToFavorites,
  allUserInfo,
} from "../services/API_user/user.service";
import {
  Button,
  Box,
  Container,
  Heading,
  Flex,
  Section,
  Grid,
  AspectRatio,
  Card,
  Text,
  Strong,
  IconButton
} from "@radix-ui/themes";
import { useProducts } from "../context/productsContext";
import { useAuth } from "../context/authContext";
import { useCartAddError } from "../hooks/useCartAddError";
import * as Toast from "@radix-ui/react-toast";
import { HeartFilledIcon, HeartIcon, HomeIcon, Share2Icon } from "@radix-ui/react-icons";
import axios from "axios";

const DetalleProducto = () => {
  const { id } = useParams();
  const { products, loading, setProducts } = useProducts();
  const { user, setCarrito } = useAuth();
  const { register, handleSubmit } = useForm();
  const [isDisabled, setIsDisabled] = useState(false);
  const [res, setRes] = useState({});
  const [okAgregado, setOkAgregado] = useState(false);
  const [favoritos, setFavoritos] = useState([]);

  const formSubmit = async (formData) => {
    const customFormData = {
      propietario: user._id,
      products: [
        {
          productId: id,
          cantidad: 1,
        },
      ],
    };
    setIsDisabled(true);
    setRes(await postCarrito(user.carrito, customFormData));
    setIsDisabled(false);
  };

  useEffect(() => {
    useCartAddError(res, setRes, setOkAgregado);
  }, [res]);

  const objetoEncontrado = products?.data.find((objeto) => objeto._id === id);

  useEffect(() => {
    realizarPeticionGet();
  }, []);

  const realizarPeticionGet = async () => {
    try {
      const response = await allUserInfo();
      setFavoritos(response.data[0].favoritos); // Almacena los datos en el estado
    } catch (error) {
      console.error("Error al realizar la petición GET:", error);
    }
  };

  const agregarAFavoritosFun = async (productId) => {
    const aver = await addToFavorites(productId);

    setFavoritos(aver.data.favoritos);
  };

  const quitarDeFavoritosFun = async (productId) => {
    const aver = await removeToFavorites(productId);
    setFavoritos(aver.data.favoritos);
  };

  return (
    <>
      <Box>
      <Container size={{
        initial: '1',
        sm: '2',
        md: '3'
      }} pl="2" pr="2">
          {user?.rol && user.rol !== "admin" && (
            <Flex gap="3" align="center">
              {" "}
            </Flex>
          )}
          <Card>
            <Flex gap="3" direction="column">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={objetoEncontrado?.image}
                  alt={objetoEncontrado?.title}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    borderRadius: "var(--radius-2)",
                  }}
                />
              </AspectRatio>
              <Box>
                <Flex align="center" justify="between">
                  <Heading as="h1" size="6">
                    {objetoEncontrado?.title}
                  </Heading>
                  <Text color="pink" size="6" as="p">
                    <Strong>{objetoEncontrado?.price}</Strong>
                  </Text>
                </Flex>
                <Flex direction="column" mt="4">
                  <Text as="p">{objetoEncontrado?.desc}</Text>
                </Flex>
                {user?.rol && user.rol !== "admin" && (
                  <Box position="relative">
                    {favoritos.includes(objetoEncontrado?._id) ? (
                      <IconButton
                        size="4"
                        style={{ position: "absolute", right: "12px", top: "0" }}
                        mt="5"
                        variant="ghost"
                        color="pink"
                        onClick={() => {
                          quitarDeFavoritosFun(objetoEncontrado._id);
                        }}
                      >
                        <HeartIcon  height="40px" width="40px" />
                      </IconButton>
                    ) : (
                      <IconButton
                        style={{ position: "absolute", right: "12px", top: "0" }}
                        size="4"
                        mt="5"
                        variant="ghost"
                        color="pink"
                        onClick={() => {
                          agregarAFavoritosFun(objetoEncontrado._id);
                        }}
                      >
                        <HeartFilledIcon height="40px" width="40px" />
                      </IconButton>
                    )}
                    <form onSubmit={handleSubmit(formSubmit)}>
                      <label>
                        <input
                          type="text"
                          hidden={true}
                          style={{ display: "none" }}
                          defaultValue={objetoEncontrado?._id}
                          {...register("productId")}
                        />
                      </label>
                      {user.rol && user.rol !== "admin" && (
                        <>
                          <Flex justify="between" align="center">
                            <Button size="4" disabled={isDisabled} mt="5">
                              Comprar
                            </Button>
                          </Flex>
                        </>
                      )}
                    </form>
                  </Box>
                )}
              </Box>
            </Flex>
          </Card>
        </Container>
      </Box>
      {okAgregado &&
        createPortal(
          <Toast.Provider swipeDirection="right" duration={2000}>
            <Toast.Root
              className="ToastRoot"
              open={okAgregado}
              onOpenChange={setOkAgregado}
            >
              <Toast.Title className="ToastTitle" color="pink">
                Producto agregado al carrito
              </Toast.Title>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
          </Toast.Provider>,
          document.body
        )}
    </>
  );
};

export default DetalleProducto;
