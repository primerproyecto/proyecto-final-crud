import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useForgotPassword = (res, setRes, setForgotOk, setMensaje404) => {
  //! -------- 200 ={ updateUser: true, sendPassword: true}
  if (res?.status == 200) {
    if (res?.data?.sendPassword == true && res?.data?.updateUser == true) {
      setForgotOk(() => true);
      setRes(() => ({}));
    }
  }

  //! -------- 404 = { updateUser: false, sendPassword: true}
  if (
    res?.response?.data?.sendPassword == true &&
    res?.response?.data?.updateUser == false
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Error send incorrect email",
      text: "We don't change your password, your email isn't valid ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! -------- 404 = 'dont send email and dont update user'
  if (res?.response?.status == 404)  {
    setRes(() => ({}));
    setMensaje404((prevState) => !prevState)
  }

  //! -------- 500 = interval server error
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal server error ❎, please try again ",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
