import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useModifyPassword = (res, setModifyPass, setRes) => {
  //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
  //? si la respuesta no esta ok--> res.response.status
  //! ------------------ 200 : todo ok
  if (res?.status == 200) {
    setModifyPass(() => true);
    //setAllUser(() => res.data);

    Swal.fire({
      icon: "success",
      title: "Contraseña cambiado con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! ------------------- La contraseña no esta en el formato correcto
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.includes("password not match")
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Las contraseñas no coincidien",
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
  }

  //! -------------------- 500 : internal server error

  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval server error!❎ Please try again.",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
};
