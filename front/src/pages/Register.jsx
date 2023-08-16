import { useForm, Controller } from "react-hook-form";
/* import "./Register.css"; */

import { useEffect, useState } from "react";
import { registerUser } from "../services/API_user/user.service";
import { useRegisterError } from "../hooks";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

import * as Form from "@radix-ui/react-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import "./registerStyles.css";

export const Register = () => {
  const { allUser, setAllUser, bridgeData } = useAuth();
  const { register, handleSubmit, control } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okRegister, setOkRegister] = useState(false);

  //! ------------------------------------------------------------------------------
  //? 1) funcion que se encarga del formulario - de la data del formulario
  //! ------------------------------------------------------------------------------

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;

    if (inputFile.length !== 0) {
      // cuando me han hayan puesto una imagen por el input

      const custonFormData = {
        ...formData,
        image: inputFile[0],
      };

      setSend(true);
      setRes(await registerUser(custonFormData));
      setSend(false);

      //! me llamo al servicio
    } else {
      const custonFormData = {
        ...formData,
      };

      setSend(true);
      setRes(await registerUser(custonFormData));
      setSend(false);

      ///! me llamo al servicio
    }
  };

  //! ------------------------------------------------------------------------------
  //? 2) funcion que se encarga del formulario- de la data del formulario
  //! ------------------------------------------------------------------------------
  useEffect(() => {
    useRegisterError(res, setOkRegister, setRes, setAllUser);
    if (res?.status == 201) bridgeData("ALLUSER");
  }, [res]);

  //! ------------------------------------------------------------------------------
  //? 3) Estados de navegacion ----> lo veremos en siguiente proyectos
  //! ------------------------------------------------------------------------------

  if (okRegister) {
    return <Navigate to="/verifyCode" />;
  }
  return (
    <>
      {/*  <div className="form-wrap">
        <h1>Sign Up</h1>
        <p>It’s free and only takes a minute.</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="">
            <label htmlFor="name" className="custom-placeholder">
              username
            </label>
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("name", { required: true })}
            />
          </div>
          <div className="">
            <label htmlFor="password" className="custom-placeholder">
              password
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

          <div className="">
            <label htmlFor="email" className="custom-placeholder">
              email
            </label>
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />

            <div className="sexo">
              <label htmlFor="rol" className="label-radio hombre">
                User
              </label>
              <input
                type="radio"
                name="rol"
                id="rol"
                value="user"
                {...register("rol")}
              />
              <label htmlFor="rol1" className="label-radio mujer">
                Admin
              </label>

              <input
                type="radio"
                name="rol"
                id="rol1"
                value="admin"
                {...register("rol")}
              />
            </div>
            <div className="">
              <label>Imagen</label>
              <input
                type="file"
                name="image"
                id="file-upload"
                accept="image/png, image/jpeg"
              />
            </div>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#2f7a67" }}
            >
              Register
            </button>
          </div>
        </form>
      </div> */}
      <Form.Root className="FormRoot" onSubmit={handleSubmit(formSubmit)}>
        <Form.Field className="FormField" name="name">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Nombre</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your name
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Nombre no correcto
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              required
              {...register("name", { required: true })}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="password">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Password</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your password
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="password"
              {...register("password", { required: true })}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="email">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Email</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your email
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="email"
              required
              {...register("email", { required: true })}
            />
          </Form.Control>
        </Form.Field>
        <RadioGroup.Root
          className="RadioGroupRoot"
          defaultValue="user"
          aria-label="View density"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <RadioGroup.Item
              className="RadioGroupItem"
              value="user"
              id="r1"
              {...register("user")}
            >
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </RadioGroup.Item>
            <label className="Label" htmlFor="r1">
              Usuario
            </label>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <RadioGroup.Item
              className="RadioGroupItem"
              value="admin"
              {...register("rol")}
              id="r2"
            >
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </RadioGroup.Item>
            <label className="Label" htmlFor="r2">
              Administrador
            </label>
          </div>
        </RadioGroup.Root>
        {/* <Controller
          name="rol"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <RadioGroup {...field}>
              <RadioGroup.Item value="user">User</RadioGroup.Item>
              <RadioGroup.Item value="admin">Femenino</RadioGroup.Item>
            </RadioGroup>
          )}
        /> */}
        <div className="">
          <label>Imagen</label>
          <input
            type="file"
            name="image"
            id="file-upload"
            accept="image/png, image/jpeg"
          />
        </div>

        <Form.Submit asChild>
          <button className="Button" style={{ marginTop: 10 }}>
            Enviar
          </button>
        </Form.Submit>
      </Form.Root>
    </>
  );
};
