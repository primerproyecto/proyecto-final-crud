import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import {
  editarProducto,
  updateProducto,
} from "../services/API_user/product.service";
import { useProductEditarErrors } from "../hooks";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useProducts } from "../context/productsContext";
import { ProductGallery, Spinner } from "../components";

useProductEditarErrors;

export const EditarProducto = () => {
  const { id } = useParams();
  const { allUser, setAllUser, bridgeData } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okEditProduct, setOkEditProduct] = useState(false);
  const [product, setProduct] = useState({});
  /* const { products, loading } = useProducts(); */

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
      const valor = await updateProducto(product._id, custonFormData);

      setSend(true);
      setRes(await updateProducto(product._id, custonFormData));
      setSend(false);
    } else {
      const custonFormData = {
        ...formData,
      };

      setSend(true);
      setRes(await updateProducto(product._id, custonFormData));
      setSend(false);
    }
  };

  //////////////////////// LLAMADA PARA OBTENER LOS DATOS DE ESTE PRODUCTO QUE NOS LLEGA POR PARAMS

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await editarProducto(id);
        console.log("que es response", response);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [res]);

  //! ------------------------------------------------------------------------------
  //? 2) funcion que se encarga del formulario- de la data del formulario
  //! ------------------------------------------------------------------------------
  useEffect(() => {
    useProductEditarErrors(res, setOkEditProduct, setRes);
  }, [res]);

  //! ------------------------------------------------------------------------------
  //? 3) Estados de navegacion ----> lo veremos en siguiente proyectos
  //! ------------------------------------------------------------------------------

  /*  if (okEditProduct) {
    return <Navigate to="/" />;
  } */

  return (
    <>
      <div className="form-wrap">
        <h1>Editar producto</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="">
            <label htmlFor="name">Título</label>
            <input
              className="input_user"
              type="text"
              defaultValue={product.title}
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
              defaultValue={product.desc}
              type="text"
              id="description"
              name="desc"
              autoComplete="false"
              {...register("desc", { required: true })}
            />
          </div>
          <div className="">
            <img src={product.image} width="100" />
            <label htmlFor="file-upload">Imagen</label>
            <input
              type="file"
              id="file-upload"
              name="image"
              {...register("image")}
            />

            <div className="">
              <label htmlFor="size">Size</label>
              <input
                type="text"
                id="size"
                defaultValue={product.size}
                name="size"
                {...register("size", { required: true })}
              />
            </div>
            <div className="categories">
              <label htmlFor="categories" className="label-radio ">
                Complementos
              </label>
              <input
                type="radio"
                name="categories"
                id="categories"
                value="Complementos"
                defaultChecked={
                  product.categories === "Complementos" ? true : false
                }
                {...register("categories")}
              />
              <label htmlFor="rol1" className="label-radio">
                Electrónico
              </label>
              <input
                type="radio"
                name="categories"
                id="rol1"
                value="Electrónico"
                defaultChecked={
                  product.categories === "Electrónico" ? true : false
                }
                {...register("categories")}
              />
            </div>
            <div className="">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                id="color"
                defaultValue={product.color}
                name="color"
                {...register("color", { required: true })}
              />
            </div>
            <div className="">
              <label htmlFor="price">Precio</label>
              <input
                type="number"
                id="price"
                defaultValue={product.price}
                name="price"
                {...register("price", { required: true })}
              />
            </div>
            <div className="">
              <label htmlFor="destacado">Destacado</label>
              <input
                type="checkbox"
                id="destacado"
                defaultChecked={product.destacado}
                name="destacado"
                {...register("destacado", { required: false })}
              />
            </div>
          </div>
          <div className="btn_container">
            <button
              className="btn"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#2f7a67" }}
            >
              Editar producto
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
