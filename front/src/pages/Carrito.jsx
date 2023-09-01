import { useEffect, useState } from "react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCartRemoveError } from "../hooks";
import { Link } from "react-router-dom";
import {
  getMyCarrito,
  quitarItemCarrito,
} from "../services/API_user/carrito.service";
import { Navigate } from "react-router-dom";
import useSWR from "swr";
import {
  Box,
  Container,
  Text,
  Heading,
  Strong,
  Button,
  Card,
  Flex,
  AlertDialog,
  Link as Linka,
} from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import "./stylesCarrito.css";
import {
  capitalizarPrimeraLetra,
  aEuros,
  updateToken,
  fetcher,
} from "../utils";
import * as Toast from "@radix-ui/react-toast";

export const Carrito = () => {
  const { id } = useParams();

  const [carrito, setCarrito] = useState([]);

  const { user } = useAuth();

  const [res, setRes] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [removeCarrito, setORemoveCarrito] = useState(false);
  const [mensajePrevio, setMensajePrevio] = useState(false);

  const [itemProductId, setItemProductId] = useState("");

  const carritoId = user.carrito;
  const formSubmitQuitar = async (productId) => {
    const customFormData = {
      productId: productId,
    };
    setIsDisabled(true);
    setRes(await quitarItemCarrito(carritoId, customFormData));
    setIsDisabled(false);
  };

  useEffect(() => {
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
    useCartRemoveError(res, setORemoveCarrito, setRes, setCarrito);
  }, [res]);

  const { data: favoritos } = useSWR(
    ["http://localhost:3000/api/v1/users/info", updateToken()],
    fetcher
  );

  const { data, error } = useSWR(
    "http://localhost:3000/api/v1/users/info",
    async (url) => {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${updateToken()}`,
        },
      });
      const data = await response.json();
      return data;
    }
  );

  console.log("que son favoritos", data);

  return (
    <>
      <Box
        pb="7"
        style={{
          background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Container
          size={{
            initial: "1",
            sm: "2",
            md: "3",
          }}
          pl="2"
          pr="2"
        >
          <Box pt="6" pb="8">
            <Heading as="h1" size="7">
              El carrito de {capitalizarPrimeraLetra(user.user)}
            </Heading>
          </Box>
          {carrito.length > 0 ? (
            carrito?.map((item, index) => {
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
                          {aEuros.format(
                            item?.cantidad * item?.productId.price
                          )}
                        </Strong>
                      </Text>
                    </Text>
                    <Flex direction="row-reverse" grow="1">
                      <Button
                        size="3"
                        color="pink"
                        // onClick={() => formSubmitQuitar(item.productId._id)}
                        onClick={() => {
                          setItemProductId(item.productId._id);
                          setMensajePrevio(true);
                        }}
                      >
                        Eliminar
                      </Button>
                    </Flex>
                  </Flex>
                </Card>
              );
            })
          ) : (
            <>
              <Heading as="h2">No tienes nada todavía</Heading>{" "}
              <Text>
                Ánimate a comprar alguno de nuestros productos ....empieza por
                visitar nuestra{" "}
                <Linka asChild color="pink">
                  <Link to="/">página inicial</Link>
                </Linka>
              </Text>{" "}
            </>
          )}
        </Container>
      </Box>

      <AlertDialog.Root open={mensajePrevio} onOpenChange={setMensajePrevio}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Eliminar producto</AlertDialog.Title>
          <AlertDialog.Description size="4">
            Seguro que quieres eliminar este producto del carrito ?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" size="3">
                Cancelar
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                size="3"
                onClick={() => formSubmitQuitar(itemProductId)}
              >
                Borrar producto
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="ToastRoot"
          open={removeCarrito}
          onOpenChange={setORemoveCarrito}
        >
          <Toast.Title className="ToastTitle">Producto borrado</Toast.Title>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </>
  );
};
