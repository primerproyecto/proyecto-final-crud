import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useLoginError = (res, setLoginOk, userLogin, setRes, setUserNotFound) => {
  //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
  //? si la respuesta no esta ok--> res.response.status
  //! ------------------ 200 : todo ok
  if (res?.status == 200) {
    const dataCustom = {
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
    userLogin(dataString);
    setLoginOk((prevState) => !prevState);
    // Swal.fire({
    //   icon: "success",
    //   title: "Welcome to my Page  xxxx💌",
    //   text: "Login ok ✅",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
  }

  //! ------------------- 404: 'password dont match'

  if (res?.response?.data?.includes("invalid password")) {
    setRes(() => {});
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password dont match ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ------------------- 404: 'User no register'
  if (res?.response?.data?.includes("User no found")) {
    // Swal.fire({
    //   icon: "error",
    //   title: "Oops...",
    //   text: "Unregistered user ❎",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    setUserNotFound((prevstate) => !prevstate)
    setRes(() => {});
  }

  //! --------------------500: INTERNAL SERVER ERROR
  if (res?.response?.status == 500) {
    setRes(() => {});
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
