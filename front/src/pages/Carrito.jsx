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

  const formSubmitQuitar = async (formData) => {
    const customFormData = {
      productId: formData.productId,
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
        /*  const arr = [...response.data.products]; */
        setCarrito(response.data.products);
        console.log('que es response.data.products', response.data.products)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [removeCarrito]);

  useEffect(() => {
    /*  console.log("que es carrito", carrito); */
    useCartRemoveError(res, setORemoveCarrito, setRes);
  }, [res]);


  return (
   
    <div>
      <p>Lista de productos del usuario</p>
      <ul>
        {carrito ?
          carrito?.map((item) => {
            return (
              <li key={item._id}>
                -Producto {item?.productId?.title} - Cantidad - {item?.cantidad}{" "}
                - <img src={item?.productId?.image} width="30" alt=" " />
                <form onSubmit={handleSubmit(formSubmitQuitar)}>
                  <label>
                    <input
                      type="text"
                      hidden={true}
                      value={item?.productId?._id}
                      {...register("productId")}
                    />
                  </label>
                  <button>Eliminar</button>
                </form>
              </li>
            );
          }) : <p>no hay carrito</p>}
      </ul>
    </div>
  );
};
