import { updateToken } from "../../utils/updateToken";
import { APIuser } from "./serviceApiUser.config";

//! ------------------------------- GET MY CARRITO -----------------------------------
export const getMyCarrito = async (carritoId) => {
  return APIuser.get(`/cart/${carritoId}`)
    .then((res) => {
      return res;
    })
    .catch((error) => error);
};

//! -----------------------------ADD A PRODUCT----------------------------------

export const postCarrito = async (carritoId, formData) => {
  return APIuser.post(`/cart/${carritoId}`, formData)
    .then((res) => {
      console.log("desde el front", res);
      return res;
    })
    .catch((error) => error);
};

//! ---------------------------BORRAR UN PRODUCTO DE UN CARRITO CONCRETO --------------------------------------------

export const quitarItemCarrito = async (carritoId, formData) => {
  return APIuser.patch(`/cart/${carritoId}`, formData)
    .then((res) => {
      return res;
    })
    .catch((error) => error);
};

//! ---------------------------BORRAR UN PRODUCTO DE UN CARRITO CONCRETO --------------------------------------------

export const getAllCarritos = async (carritoId, formData) => {
  return APIuser.get(`/cart`)
    .then((res) => {
      return res;
    })
    .catch((error) => error);
};
