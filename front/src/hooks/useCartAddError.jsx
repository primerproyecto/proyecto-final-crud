import { Toast } from "@radix-ui/react-toast";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useCartAddError = (res, setRes, setOkAgregado) => {
  //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
  //? si la respuesta no esta ok--> res.response.status
  //! ------------------ 200 : todo ok
  /*  console.log("aqui res", res); */
  if (res?.status == 200) {
    setOkAgregado((prevState) => !prevState);
    // Swal.fire({
    //   icon: "success",
    //   title: "Agregado",
    //   text: "Producto agregado al carrito ✅",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
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
