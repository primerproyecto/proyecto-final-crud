import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useCartAddError = (res, setRes, setOkAgregado) => {
  //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
  //? si la respuesta no esta ok--> res.response.status
  //! ------------------ 200 : todo ok
  /*  console.log("aqui res", res); */
  if (res?.status == 200) {
    /*  const dataCustom = {
      token: res.data.token,
      user: res.data.user.name,
      email: res.data.user.email,
      _id: res.data.user._id,
      image: res.data.user.imagen,
      check: res.data.user.check,
      rol: res.data.user.rol,
      carrito: res.data.user.carrito,
    };
    const dataString = JSON.stringify(dataCustom);
    userLogin(dataString); */
    setOkAgregado(() => true);
    Swal.fire({
      icon: "success",
      title: "Agregado",
      text: "Producto agregado al carrito ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ------------------- 404: 'password dont match'

  /* if (res?.status == 200 && res?.data?.includes("Producto borrado")) {
    setOkAgregado(() => true);
    Swal.fire({
      icon: "success",
      title: "Borrado",
      text: "Producto borrado del catálogo ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  } */

  //! --------------------500: INTERNAL SERVER ERROR
  if (res?.response?.status == 500) {
    console.log(res.response);
    setRes(() => {});
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: ` ${res.response.data.mensaje} ❎!`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const erroresCargaCarrito = (res, setRes, setOkCarrito) => {
  if (res?.status == 200) {
    setOkCarrito(() => true);
  }

  //! ------------------- 404: 'password dont match'

  /*  if (res?.response?.data?.includes("invalid password")) {
    setRes(() => {});
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password dont match ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  } */

  //! ------------------- 404: 'User no register'
  /* if (res?.response?.data?.includes("User no found")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Unregistered user ❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => {});
  } */

  //! --------------------500: INTERNAL SERVER ERROR
  if (res?.response?.status == 500) {
    setRes(() => {});
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `solo ${res.response.data.mensaje} ❎!`,
      showConfirmButton: false,
      timer: 3500,
    });
  }
};
