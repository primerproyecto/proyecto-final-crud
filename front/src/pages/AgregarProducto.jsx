import { useForm } from "react-hook-form";
/* import "./Register.css"; */

import * as Form from "@radix-ui/react-form";
import { useEffect, useState } from "react";
import { postOneProduct } from "../services/API_user/product.service";
import { useProductAddError } from "../hooks";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useProducts } from "../context/productsContext";
import { ProductGallery, Spinner } from "../components";
import * as Switch from "@radix-ui/react-switch";
import * as RadioGroup from "@radix-ui/react-radio-group";

export const AgregarProducto = () => {
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okAddProduct, setOkAddProduct] = useState(false);

  const { products, loading, setRecargar } = useProducts();

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
      console.log('que es lo que mando desde el form', custonFormData)
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
    useProductAddError(res, setOkAddProduct, setRes, setRecargar);
  }, [res]);

  //! ------------------------------------------------------------------------------
  //? 3) Estados de navegacion ----> lo veremos en siguiente proyectos
  //! ------------------------------------------------------------------------------

  if (okAddProduct) {
    setRecargar((prevState) => !prevState);
  }
  return (
    <>
      <div className="form-wrap">
        <Form.Root className="FormRoot" onSubmit={handleSubmit(formSubmit)}>
          {/* <fieldset>
            <legend>Agregar producto</legend>
            <div className="field-wrapper">
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
            <div className="field-wrapper">
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

            <div className="field-wrapper">
              <label htmlFor="file-upload">Imagen</label>
              <input
                type="file"
                id="file-upload"
                name="image"
                {...register("image", { required: true })}
              />

              <div className="field-wrapper">
                <label htmlFor="size">Size</label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  {...register("size", { required: true })}
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="color">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  {...register("color", { required: true })}
                />
              </div>
              <div className="sexo">
                <label htmlFor="categories" className="label-radio ">
                  Complementos
                </label>
                <input
                  type="radio"
                  name="categories"
                  id="categories"
                  value="Complementos"
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
                  {...register("categories")}
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="price">Precio</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  {...register("price", { required: true })}
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="destacado">Destacdo ?</label>
                <input
                  type="checkbox"
                  id="destacado"
                  name="destacado"
                  {...register("destacado", { required: false })}
                />
              </div>
            </div>

            <div className="btn_container">
              <button
                type="submit"
                disabled={send}
                style={{ background: send ? "#49c1a388" : "#2f7a67" }}
              >
                Agregar
              </button>
            </div>
          </fieldset> */}
          <Form.Field className="FormField" name="title">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Título del producto</Form.Label>
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                type="text"
                required
                {...register("title", { required: true })}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="FormField" name="desc">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Descripcion</Form.Label>
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                type="text"
                required
                {...register("desc", { required: true })}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="FormField" name="price">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Precio</Form.Label>
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                type="number"
                required
                {...register("price", { required: true })}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="FormField" name="image">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Image</Form.Label>
            </div>
            <Form.Control asChild>
              <input
                type="file"
                id="file-upload"
                name="image"
                {...register("image", { required: true })}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="FormField" name="size">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Tamaño</Form.Label>
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                type="text"
                required
                {...register("size", { required: true })}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="FormField" name="color">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Color</Form.Label>
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                type="text"
                required
                {...register("color", { required: true })}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="FormField" name="destacado">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Destacado</Form.Label>
            </div>
            <Form.Control asChild>
            <Switch.Root
              id="destacado"
              className="SwitchRoot"
              defaultChecked={false}
            >
              <Switch.Thumb
                className="SwitchThumb"
                checked
                name="destacado"
                {...register("destacado", { required: false })}
              />
            </Switch.Root>
            </Form.Control>
          </Form.Field>

          <Form.Field className="FormField" name="categories">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Categorias</Form.Label>
            </div>
            <Form.Control asChild>
            <RadioGroup.Root
                className="RadioGroupRoot"
                aria-label="View density"
                defaultValue="Complementos"
                name="categories"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RadioGroup.Item
                    className="RadioGroupItem"
                    value="Complementos"
                    id="r1"
                    {...register("categories")}
                  >
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                  </RadioGroup.Item>
                  <label className="Label" htmlFor="r1">
                    Complementos
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RadioGroup.Item
                    className="RadioGroupItem"
                    value="Electrónico"
                    {...register("categories")}
                    id="r2"
                  >
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                  </RadioGroup.Item>
                  <label className="Label" htmlFor="r2">
                    Electrónico
                  </label>
                </div>
              </RadioGroup.Root>
            </Form.Control>
          </Form.Field>

          <Form.Submit asChild>
            <button className="Button" style={{ marginTop: 10 }}>
              Enviar
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </>
  );
};
