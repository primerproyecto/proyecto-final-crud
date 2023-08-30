import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { Toast } from "@radix-ui/react-toast";
export const useProductRemoveError = (
  res,
  setRes,
  setOkEliminado,
  setProducts,
  setEliminarProducto
) => {
  if (res?.status == 200) {
    setOkEliminado((prevState) => !prevState);
    setEliminarProducto((prevState) => !prevState)
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
