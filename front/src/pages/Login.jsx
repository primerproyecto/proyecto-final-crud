import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../services/API_user/user.service";
import { useLoginError } from "../hooks";
import { useAuth } from "../context/authContext";
import { lightTheme } from "../theme";

export const Login = () => {
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [loginOk, setLoginOk] = useState(false);
  const { userLogin, setUser } = useAuth();

  //! 1) ------------------ FUNCION QUE GESTIONA EL FORMULARIO----------
  const formSubmit = async (formData) => {
    setSend(true);
    setRes(await loginUser(formData));
    setSend(false);
  };

  //! 2) ------------------ LOS USEEFFECT QUE GESTIONAN LA RESPUESTA: ERRORES Y 200

  useEffect(() => {
    setUser(() => null);
  }, []);
  useEffect(() => {
    useLoginError(res, setLoginOk, userLogin, setRes);
  }, [res]);

  //! 3) ------------------ ESTADOS DE NAVEGACION O ESTADOS DE FUNCIONALIDADES OK

  if (loginOk) {
    if (res.data.user.check == false) {
      return <Navigate to="/verifyCode" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return (
    <>
      <div className="form-wrap">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="form-group">
            <label htmlFor="email" className="custom-placeholder">
              Email
            </label>
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />

            <div className="form-group">
              <label htmlFor="password" className="custom-placeholder">
                Password
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
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{
                background: send ? lightTheme.body : lightTheme.primary,
              }}
            >
              {send ? "Cargando ....." : "LOGIN"}
            </button>
          </div>
          <p className="bottom-text">
            <small>
              Have you forgotten the password?
              <Link to="/forgotpassword" className="anchorCustom">
                Olvidé mi contraseña
              </Link>
            </small>
          </p>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          Are you not registered? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </>
  );
};
