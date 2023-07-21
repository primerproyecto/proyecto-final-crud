import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useProductEditarErrors = (res, setOkEditProduct, setRes) => {
  //! ---------------200: testUpdate: tenemos que ver que todo este a true
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
    setOkEditProduct(() => true);
    Swal.fire({
      icon: "success",
      title: "Editado",
      text: "Producto editado correctamente ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

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
