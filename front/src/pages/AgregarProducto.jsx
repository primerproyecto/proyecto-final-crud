import { useForm } from "react-hook-form";
/* import "./Register.css"; */

import { useEffect, useState } from "react";
import { postOneProduct } from "../services/API_user/product.service";
import { useProductAddError } from "../hooks";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useProducts } from "../context/productsContext";
import { ProductGallery, Spinner } from "../components";

export const AgregarProducto = () => {
  const { allUser, setAllUser, bridgeData } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okAddProduct, setOkAddProduct] = useState(false);
  const { products, loading } = useProducts();

  //! ------------------------------------------------------------------------------
  //? 1) funcion que se encarga del formulario - de la data del formulario
  //! ------------------------------------------------------------------------------

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;
    console.log("que es inputfile", inputFile);

    if (inputFile.length !== 0) {
      // cuando me han hayan puesto una imagen por el input

      const custonFormData = {
        ...formData,
        image: inputFile[0],
      };

      setSend(true);
      setRes(await postOneProduct(custonFormData));
      setSend(false);

      //! me llamo al servicio
    } else {
      const custonFormData = {
        ...formData,
      };

      setSend(true);
      setRes(await postOneProduct(custonFormData));
      setSend(false);
    }
  };

  //! ------------------------------------------------------------------------------
  //? 2) funcion que se encarga del formulario- de la data del formulario
  //! ------------------------------------------------------------------------------
  useEffect(() => {
    useProductAddError(res, setOkAddProduct, setRes, setAllUser);
    /*  if (res?.status == 200) bridgeData("ALLUSER"); */
  }, [res]);

  //! ------------------------------------------------------------------------------
  //? 3) Estados de navegacion ----> lo veremos en siguiente proyectos
  //! ------------------------------------------------------------------------------

  if (okAddProduct) {
    console.log("res", res);
    console.log("registro correcto ya puedes navegar");
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="form-wrap">
        <h1>Agregar producto</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="">
            <label htmlFor="name">Título</label>
            <input
              className="input_user"
              type="text"
              id="name"
              name="title"
              autoComplete="false"
              {...register("title", { required: true })}
            />
          </div>
          <div className="">
            <label htmlFor="description">Descripcion</label>
            <input
              className="input_user"
              type="text"
              id="description"
              name="desc"
              autoComplete="false"
              {...register("desc", { required: true })}
            />
          </div>

          <div className="">
            <label htmlFor="file-upload">Imagen</label>
            <input
              type="file"
              id="file-upload"
              name="image"
              {...register("image", { required: true })}
            />

            <div className="">
              <label htmlFor="size">Size</label>
              <input
                type="text"
                id="size"
                name="size"
                {...register("size", { required: true })}
              />
            </div>
            <div className="">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                id="color"
                name="color"
                {...register("color", { required: true })}
              />
            </div>
            <div className="">
              <label htmlFor="price">Precio</label>
              <input
                type="text"
                id="price"
                name="price"
                {...register("price", { required: true })}
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
      </div>
    </>
  );
};
