import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useCartRemoveError = (
  res,
  setORemoveCarrito,
  setRes,
  setCarrito,
) => {
  //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
  //? si la respuesta no esta ok--> res.response.status
  //! ------------------ 200 : todo ok
  if (res?.status == 200) {
    setORemoveCarrito((prevValue) => !prevValue);
  }

  //! ------------------- 404: 'password dont match'

  //! --------------------500: INTERNAL SERVER ERROR
  if (res?.response?.status == 500) {
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
