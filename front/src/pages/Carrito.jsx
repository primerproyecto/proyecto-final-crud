import { useEffect, useState } from "react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCartRemoveError } from "../hooks";
import {
  getMyCarrito,
  quitarItemCarrito,
} from "../services/API_user/carrito.service";
import { Navigate } from "react-router-dom";
import {
  Box,
  Container,
  Text,
  Heading,
  Strong,
  Button,
  Card,
  Flex,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialog,
} from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import "./stylesCarrito.css";
import { capitalizarPrimeraLetra, aEuros } from "../utils";
import * as Toast from '@radix-ui/react-toast';

export const Carrito = () => {
  const { id } = useParams();

  const [carrito, setCarrito] = useState([]);

  const { user } = useAuth();
  const idI11 = useId();

  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [removeCarrito, setORemoveCarrito] = useState(false);
  const [mensajePrevio, setMensajePrevio] = useState(false);

  const [itemProductId, setItemProductId] = useState('');
  const [toastRemoveOk, setToastRemoveOk] = useState(false)

  const carritoId = user.carrito;

  

  const { register, handleSubmit } = useForm();

  const formSubmitQuitar = async (productId) => {
    console.log("ques es productId", productId);
    const customFormData = {
      productId: productId,
    };
    setIsDisabled(true);
    setRes(await quitarItemCarrito(carritoId, customFormData));
    setIsDisabled(false);
  };

  useEffect(() => {
    // Lógica para obtener los valores del endpoint

    const fetchData = async () => {
      try {
        const response = await getMyCarrito(carritoId);
        setCarrito(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [removeCarrito]);

  useEffect(() => {
    /*  console.log("que es carrito", carrito); */
    useCartRemoveError(res, setORemoveCarrito, setRes, setCarrito);
  }, [res]);
  useEffect(() => {
    console.log("actualicemos el carrito", carrito);
  }, [carrito]);

  return (
    <>
      <Box
        style={{
          background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Container size="2">
          <Box pt="6" pb="8">
            <Heading as="h1" size="9">
              El carrito de {capitalizarPrimeraLetra(user.user)}
            </Heading>
          </Box>
          {carrito?.map((item, index) => {
            return (
              <Card
                key={item._id}
                style={{ marginBottom: "1rem", boxShadow: "var(--shadow-4)" }}
              >
                <Flex align="center" gap="3">
                  <Avatar.Root className="AvatarRoot">
                    <Avatar.Image
                      className="AvatarImage"
                      width="40"
                      src={item?.productId?.image}
                      alt={item?.productId?.title}
                    />
                  </Avatar.Root>
                  <Box shrink={0}>
                    <Heading as="h2">
                      {capitalizarPrimeraLetra(item?.productId?.title)}{" "}
                    </Heading>
                  </Box>

                  <Text>
                    ( {item?.cantidad}{" "}
                    {item?.cantidad > 1 ? "productos" : "producto"} )
                  </Text>
                  <Text>
                    <Text size="4">
                      <Strong>
                        TOTAL :{" "}
                        {aEuros.format(item?.cantidad * item?.productId.price)}
                      </Strong>
                    </Text>
                  </Text>
                  <Flex direction="row-reverse" grow="1">
                    <Button
                      size="3"
                      // onClick={() => formSubmitQuitar(item.productId._id)}
                      onClick={() => {
                        setItemProductId(item.productId._id)
                        setMensajePrevio(true)
                        }}
                    >
                      Eliminar
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            );
          })}
        </Container>
      </Box>
      <AlertDialog.Root open={mensajePrevio} onOpenChange={setMensajePrevio}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Eliminar producto</AlertDialog.Title>
          <AlertDialog.Description size="4">
            Seguro que quieres eliminar este producto del carrito ?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel >
              <Button variant="soft" color="gray" size="3">
                Cancelar
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" size="3" onClick={() => formSubmitQuitar(itemProductId)}>
                Borrar producto
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <Toast.Provider swipeDirection="right">

      <Toast.Root className="ToastRoot" open={removeCarrito} onOpenChange={setORemoveCarrito}>
        <Toast.Title className="ToastTitle">Producto borrado</Toast.Title>
        <Toast.Description asChild>
          <time className="ToastDescription" >
          </time>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
    </>
  );
};
