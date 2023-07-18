import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useCartRemoveError = (res, setORemoveCarrito, setRes) => {
  //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
  //? si la respuesta no esta ok--> res.response.status
  //! ------------------ 200 : todo ok
  /*  console.log("aqui res", res); */
  if (res?.status == 200) {
    setORemoveCarrito(() => true);
    Swal.fire({
      icon: "success",
      title: "Eliminado",
      text: "Producto ekiminado del carrito ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ------------------- 404: 'password dont match'

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
