import { updateToken } from "../../utils/updateToken";
import { APIuser } from "./serviceApiUser.config";

//! ------------------------------- REGISTER -----------------------------------
export const registerUser = async (formData) => {
  return APIuser.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! -----------------------------CHECKCODE----------------------------------

export const checkCodeConfirmationUser = async (formData) => {
  return APIuser.post("/users/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------------------------LOGIN --------------------------------------------

export const loginUser = async (formData) => {
  return APIuser.post("/users/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------- AUTO LOGIN ------------------------------------------

export const autoLoginUser = async (formData) => {
  return APIuser.post("/users/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------ FORGOT PASSWORD --------------------------------------
export const forgotPasswordUser = async (formData) => {
  return APIuser.post("/users/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ----------------------- CHANGE PASSWORD ----- ESTAMOS LOGADOS----------------

export const changePasswordUser = async (formData) => {
  return APIuser.patch("/users/changepassword", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! --------------------- UPDATE ---------------------------------------

export const updateUser = async (formData) => {
  return APIuser.patch("/users/update/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//!----------------------- DELETE ---------------------------------------

export const deleteUser = async () => {
  return APIuser.delete("/users/", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! --------------------- RESEND CODE --------------------------------

export const resendCodeConfirmationUser = async (formData) => {
  return APIuser.post("/users/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};


//! --------------------- ADD TO FAVORITE --------------------------------

export const addToFavorites = async (productId) => {
  return APIuser.post(`/users/tofavorites/${productId}`, )
    .then((res) => res)
    .catch((error) => error);
};

//! --------------------- REMOVE FROM FAVORITE --------------------------------

export const removeToFavorites = async (productId) => {
  return APIuser.post(`/users/removeFromfavorites/${productId}`, )
    .then((res) => res)
    .catch((error) => error);
};

//! --------------------- ALL USER INFORMATION --------------------------------

export const allUserInfo = async () => {
  return APIuser.get('/users/info')
    .then((res) => res)
    .catch((error) => error);
};
