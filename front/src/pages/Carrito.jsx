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
} from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import "./stylesCarrito.css";
import { capitalizarPrimeraLetra } from "../utils/text";

export const Carrito = () => {
  const { id } = useParams();

  const [carrito, setCarrito] = useState([]);

  const { user } = useAuth();
  console.log('quien es user', user)
  const idI11 = useId();

  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [removeCarrito, setORemoveCarrito] = useState(false);

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
    <Box
      style={{ background: "var(--gray-a2)", borderRadius: "var(--radius-3)" }}
    >
      <Container size="2">
      <Box pt="6" pb="8">
        <Heading as="h1" size="9">El carrito de {user.user}</Heading>
        </Box>
        {carrito?.map((item, index) => {
          return (
            <Card key={item._id} style={{ marginBottom: "1rem" }}>
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
                      TOTAL : {item?.cantidad * item?.productId.price}{" "}
                    </Strong>
                  </Text>
                </Text>
                <Flex direction="row-reverse" grow="1">
                  <Button size="3" onClick={() => formSubmitQuitar(item.productId._id)}>
                    Eliminar
                  </Button>
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </Container>
    </Box>
  );
};
