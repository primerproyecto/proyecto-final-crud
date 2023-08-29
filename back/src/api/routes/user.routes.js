const express = require("express");
const { upload } = require("../../middlewares/files.middleware");
const {
  register,
  checkNewUser,
  resendCode,
  login,
  forgotPassword,
  sendPassword,
  modifyPassword,
  update,
  deleteUser,
  allUsers,
  autoLoginController,
  addToFavorites,
  removeToFavorites,
  allUserInfo
} = require("../controllers/users.controller");
const { isAuth } = require("../../middlewares/auth.middleware");

const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.post("/check", checkNewUser);
UserRoutes.post("/resend", resendCode);
UserRoutes.post("/login", login);
UserRoutes.post("/forgotpassword", forgotPassword);
UserRoutes.patch("/changepassword", [isAuth], modifyPassword);
UserRoutes.patch("/update/update", [isAuth], upload.single("image"), update);

//UserRoutes.post("/login/autologin", autoLoginController);

UserRoutes.delete("/", [isAuth], deleteUser);
UserRoutes.get("/", allUsers);

UserRoutes.get("/info",[isAuth], allUserInfo);
//CREAR CONTROLADOR PARA AGREGAR A FAVORITOS
UserRoutes.post("/tofavorites/:productId",[isAuth], addToFavorites);
//CREAR CONTROLADOR PARA BORRAR DE FAVORITOS
UserRoutes.post("/removeFromfavorites/:productId",[isAuth], removeToFavorites);

//! -------REDIRECT --------------------

UserRoutes.post("/forgotpassword/sendPassword/:id", sendPassword);

module.exports = UserRoutes;
