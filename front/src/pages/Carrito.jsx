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
import { Box, Container,Text, Heading, Strong, Button } from "@radix-ui/themes";



export const Carrito = () => {
  const { id } = useParams();

  const [carrito, setCarrito] = useState([]);

  const { user } = useAuth();
  const idI11 = useId();

  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [removeCarrito, setORemoveCarrito] = useState(false);

  const carritoId = user.carrito;

  const { register, handleSubmit } = useForm();

  const formSubmitQuitar = async (productId) => {
    console.log('ques es productId', productId)
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
    <Box style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }} width="100%">
    <Container size="1">
      <p>Lista de productos del usuario</p>
      <ul>
        {console.log("que es carrito", carrito)}
        {carrito ? (
          carrito?.map((item, index) => {
            console.log('que es item')
            return (
              <li key={item._id}>
                <Heading>{item?.productId?.title} </Heading><Text><Strong>Cantidad </Strong> - {item?.cantidad}</Text> 
                - <img src={item?.productId?.image} width="50" alt=" " />
                <div>
                {console.log('el error', item)}
                  <Button onClick={() => formSubmitQuitar(item.productId._id)}>
                    Eliminar
                  </Button>
                </div>
              </li>
            );
          })
        ) : (
          <p>no hay carrito</p>
        )}
      </ul>
      </Container>
    </Box>
  );
};
