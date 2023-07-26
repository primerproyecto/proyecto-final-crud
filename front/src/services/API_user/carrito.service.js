import { updateToken } from "../../utils/updateToken";
import { APIuser } from "./serviceApiUser.config";

//! ------------------------------- GETALLPRODUCTS -----------------------------------
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

//! ------------------------ FORGOT PASSWORD --------------------------------------
/* export const forgotPasswordUser = async (formData) => {
  return APIuser.patch("/users/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
}; */

//! ----------------------- CHANGE PASSWORD ----- ESTAMOS LOGADOS----------------

/* export const changePasswordUser = async (formData) => {
  return APIuser.patch("/users/changepassword", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
}; */

//! --------------------- UPDATE ---------------------------------------

/* export const updateUser = async (formData) => {
  return APIuser.patch("/users/update/update", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
}; */

//!----------------------- DELETE ---------------------------------------

/* export const deleteUser = async () => {
  return APIuser.delete("/users/", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
}; */
