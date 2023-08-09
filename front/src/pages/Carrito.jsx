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
        console.log("que es response.data.products", response.data.products);
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

  return (
    <div>
      <p>Lista de productos del usuario</p>
      <ul>
        {console.log("que es carrito", carrito)}
        {carrito ? (
          carrito?.map((item, index) => {
            return (
              <li key={item._id}>
                -Producto {item?.productId?.title} - Cantidad - {item?.cantidad}{" "}
                - {item.productId._id}
                - <img src={item?.productId?.image} width="30" alt=" " />
                <div>
                  <button onClick={() => formSubmitQuitar(item.productId._id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p>no hay carrito</p>
        )}
      </ul>
    </div>
  );
};
