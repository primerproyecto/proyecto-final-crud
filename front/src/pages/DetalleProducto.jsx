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
} from "@radix-ui/themes";
import { useProducts } from "../context/productsContext";
import { useAuth } from "../context/authContext";
import { useCartAddError } from "../hooks/useCartAddError";
import * as Toast from "@radix-ui/react-toast";
import { Share2Icon } from "@radix-ui/react-icons";

const DetalleProducto = () => {
  const { id } = useParams();
  const { products, loading, setProducts } = useProducts();
  const { user, setCarrito } = useAuth();
  const { register, handleSubmit } = useForm();
  const [isDisabled, setIsDisabled] = useState(false);
  const [res, setRes] = useState({});
  const [okAgregado, setOkAgregado] = useState(false);

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

  console.log("que son objetoEncontrado", objetoEncontrado);
  return (
    <>
      <Box>
        <Container size="2">
        {user?.rol && user.rol !== "admin" && (<Button size="4"  mt="5">
                  Favoritos
                </Button>
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
                {user && (
                  <>
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
                        <Button size="4" disabled={isDisabled} mt="5">
                          Agregar
                        </Button>
                      )}
                    </form>
                  </>
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
