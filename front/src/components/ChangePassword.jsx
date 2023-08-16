import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { changePasswordUser } from "../services/API_user/user.service";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useChangePasswordError } from "../hooks";

export const ChangePassword = () => {
  const { setUser } = useAuth();
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  //! -----------------1) LA FUNCIOON QUE GESTIONA EL FORMULARIO

  const formSubmit = (formData) => {
    const { password, newPassword, confirmPassword } = formData;
    if (newPassword === confirmPassword) {
      Swal.fire({
        title: "Are you sure you want to change your password?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(73, 193, 162)",
        cancelButtonColor: "#d33",
        confirmButtonText: "YES",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setSend(true);
          setRes(await changePasswordUser({ password, newPassword }));
          setSend(false);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: " New Password don't match witch confirmation password❎.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  //! ------------------2) GESTION DE LA RESPUESTA POR EL CUSTOMHOOK Y AYUDADO POR EL USEEFFECT

  useEffect(() => {
    console.log(res);
    useChangePasswordError(res, setRes, setUser);
  }, [res]);

  return (
    <>
      <div className="form-wrap">
        <h1>Change your password ♻</h1>
        <p>Please, enter your old and new passwords</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="password_container form-group">
            <label htmlFor="custom-input" className="custom-placeholder">
              Old password
            </label>
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register("password", { required: true })}
            />
          </div>
          <div className="newPassword_container form-group">
            <label htmlFor="custom-input" className="custom-placeholder">
              New password
            </label>
            <input
              className="input_user"
              type="password"
              id="newPassword"
              name="newPassword"
              autoComplete="false"
              {...register("newPassword", { required: true })}
            />
          </div>
          <div className="confirmPassword_container form-group">
            <label htmlFor="custom-input" className="custom-placeholder">
              Confirm new password
            </label>
            <input
              className="input_user"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="false"
              {...register("confirmPassword", { required: true })}
            />
          </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{
                background: send ? lightTheme.primary : lightTheme.body,
              }}
            >
              CHANGE PASSWORD
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
