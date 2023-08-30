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
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialog,
  Separator,
  Grid,
} from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import "./stylesCarrito.css";
import { capitalizarPrimeraLetra, aEuros, fetcher } from "../utils";
import * as Toast from "@radix-ui/react-toast";
import {
  addToFavorites,
  removeToFavorites,
  allUserInfo,
} from "../services/API_user/user.service";
import {
  HeartFilledIcon,
  HeartIcon,
  HomeIcon,
  Share2Icon,
} from "@radix-ui/react-icons";

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

  const [itemProductId, setItemProductId] = useState("");
  const [toastRemoveOk, setToastRemoveOk] = useState(false);

  const [favoritos, setFavoritos] = useState([]);

  const carritoId = user.carrito;
  const { register, handleSubmit } = useForm();
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

  useEffect(() => {
    realizarPeticionGet();
  }, []);

  const realizarPeticionGet = async () => {
    try {
      const response = await allUserInfo();
      console.log("desde aquí", response?.data[0].favoritos);
      console.log("desde aquí", response);
      setFavoritos(response?.data[0].favoritos); // Almacena los datos en el estado
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
  console.log("que son favoritos", favoritos);

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
            <Heading as="h1" size="7">
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
          })}

          <Box pt="9" pb="8">
            <Heading as="h1" size="7">
              Los artículos favoritos de {capitalizarPrimeraLetra(user.user)}
            </Heading>
          </Box>
          <Grid columns="4" gap="2">
            {favoritos.map((item) => {
              {/* console.log("id de favorito", item);
              console.log("que es karrito", carrito); */}

              {
                /* const inventado */
              }

              const nodosFavoritos = carrito.filter((item2) => {
                {/* console.log("DENTRO DE FUNCION1", item2.productId._id);
                console.log("DENTRO DE FUNCION2", item); */}
                return item2.productId._id == item;
              });
              {/* console.log("empezamos a pisparnos?", nodosFavoritos); */}
              return (
                <Card key={item}>
                
                  {/* <Flex direction="column" align="center">
                    <Avatar.Root className="AvatarRoot">
                      <Avatar.Image
                        className="AvatarImage"
                        src={item2.productId.image}
                        alt={item2.productId.title}
                      />
                    </Avatar.Root>
                    <Heading mt="4" align="center">
                        {item.productId.title}
                      </Heading>

                    {favoritos.includes(carrito._id) ? (
                      <Button
                        size="4"
                        style={{
                          position: "absolute",
                          right: "24px",
                          top: "0",
                        }}
                        mt="5"
                        variant="ghost"
                        color="pink"
                        onClick={() => {
                          quitarDeFavoritosFun(carrito._id);
                        }}
                      >
                        <HeartIcon height="40px" width="40px" />
                      </Button>
                    ) : (
                      <Button
                        style={{
                          position: "absolute",
                          right: "24px",
                          top: "0",
                        }}
                        size="4"
                        mt="5"
                        variant="ghost"
                        color="pink"
                        onClick={() => {
                          agregarAFavoritosFun(carrito._id);
                        }}
                      >
                        <HeartFilledIcon height="40px" width="40px" />
                      </Button>
                    )}
                  </Flex> */}

                </Card>
              );
            })}
            {/* {favoritos.map((itemId) => {
              const info = carrito.filter((item) => {
                return item.productId._id === itemId;
              });
              console.log('que es info', info)

              return (
                <Box
                key={itemId}
                  style={{ marginBottom: "1rem", boxShadow: "var(--shadow-4)" }}
                >
                  <Card>
                    <Flex direction="column" align="center">
                      <Avatar.Root className="AvatarRoot">
                        <Avatar.Image
                          className="AvatarImage"
                          src={item.productId.image}
                          alt={item.productId.title}
                        />
                      </Avatar.Root>
                      <Heading mt="4" align="center">
                        {item.productId.title}
                      </Heading>

                      {favoritos.includes(carrito._id) ? (
                        <Button
                          size="4"
                          style={{
                            position: "absolute",
                            right: "24px",
                            top: "0",
                          }}
                          mt="5"
                          variant="ghost"
                          color="pink"
                          onClick={() => {
                            quitarDeFavoritosFun(carrito._id);
                          }}
                        >
                          <HeartIcon height="40px" width="40px" />
                        </Button>
                      ) : (
                        <Button
                          style={{
                            position: "absolute",
                            right: "24px",
                            top: "0",
                          }}
                          size="4"
                          mt="5"
                          variant="ghost"
                          color="pink"
                          onClick={() => {
                            agregarAFavoritosFun(carrito._id);
                          }}
                        >
                          <HeartFilledIcon height="40px" width="40px" />
                        </Button>
                      )}
                    </Flex>
                  </Card>
                </Box>
              );
            })} */}
          </Grid>
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
