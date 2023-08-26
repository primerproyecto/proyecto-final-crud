import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { Toast } from "@radix-ui/react-toast";
export const useProductRemoveError = (
  res,
  setRes,
  setOkEliminado,
  setProducts
) => {
  //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
  //? si la respuesta no esta ok--> res.response.status
  //! ------------------ 200 : todo ok
  /*  console.log("aqui res", res); */
  if (res?.status == 200) {
    setOkEliminado((prevState) => !prevState);
    /* onsole.log("que es res.data.karrito", res.data.karrito.products); */
//    setProducts(() => res?.data?.karrito?.products);
    console.log("que es la resXX", res);
    Swal.fire({
      icon: "success",
      title: "Eliminado",
      text: res.data,
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
