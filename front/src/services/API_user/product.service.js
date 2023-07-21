import { updateToken } from "../../utils/updateToken";
import { APIuser } from "./serviceApiUser.config";

//! ------------------------------- GETALLPRODUCTS -----------------------------------
export const getAllProducts = async () => {
  return APIuser.get("/products/getAllProducts")
    .then((res) => {
      return res;
    })
    .catch((error) => error);
};

//! -----------------------------ADD A PRODUCT----------------------------------

export const postOneProduct = async (formData) => {
  return APIuser.post("/products/new", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    Authorization: `Bearer ${updateToken()}`,
  })
    .then((res) => {
      return res;
    })
    .catch((error) => error);
};

//! --------------------------- BORRAR PRODUCTO --------------------------------------------

export const borraProducto = async (carritoId) => {
  return APIuser.delete(`/products/${carritoId}`, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! --------------------------- EDITAR PRODUCTO --------------------------------------------

export const editarProducto = async (carritoId) => {
  return APIuser.get(`/products/${carritoId}`, {
    Authorization: `Bearer ${updateToken()}`,
  })
    .then((res) => res)
    .catch((error) => error);
};

//! --------------------------- EDITAR PRODUCTO --------------------------------------------

export const updateProducto = async (carritoId, formData) => {
  return APIuser.patch(`/products/${carritoId}`, formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      console.log("desde updateProduct", res);
      return res;
    })
    .catch((error) => error);
};

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
