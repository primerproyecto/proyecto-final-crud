import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useProductEditarErrors = (res, setOkEditProduct, setRes) => {
  //! ---------------200: testUpdate: tenemos que ver que todo este a true
  if (res?.status == 200) {
    setOkEditProduct(() => true);
  }

  //! --------------------500: INTERNAL SERVER ERROR
  if (res?.response?.status == 500) {
    console.log('que es res en el error', res.response);
    setRes(() => {});
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: ` ${res.response.data} ❎!`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
