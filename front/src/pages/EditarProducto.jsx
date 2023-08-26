import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import {
  editarProducto,
  updateProducto,
} from "../services/API_user/product.service";
import "./editarproductoStyles.css";
import { useProductEditarErrors } from "../hooks";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useProducts } from "../context/productsContext";
import { ProductGallery, Spinner } from "../components";
import { Button, Flex, Box, Container } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Switch from "@radix-ui/react-switch";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

export const EditarProducto = () => {
  const { id } = useParams();
  const { allUser, setAllUser, bridgeData } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okEditProduct, setOkEditProduct] = useState(false);
  const [product, setProduct] = useState({});
  /* const { products, loading } = useProducts(); */

  console.log("que son product", product);

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

      console.log('que es custonFormData', custonFormData)

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
    <Box>
      <Container size="3">
        <div className="form-wrap">
          <h1>Editar producto</h1>
          <Form.Root className="FormRoot" onSubmit={handleSubmit(formSubmit)}>
            <Form.Field className="FormField" name="name">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Form.Label className="FormLabel">Título</Form.Label>
              </div>
              <Form.Control asChild>
                <input
                  className="Input"
                  type="text"
                  defaultValue={product.title}
                  required
                  name="title"
                  {...register("title", { required: true })}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field className="FormField" name="name">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Form.Label className="FormLabel">Descripción</Form.Label>
              </div>
              <Form.Control asChild>
                <textarea
                  className="Textarea"
                  name="desc"
                  {...register("desc", { required: true })}
                >
                  {product.desc}
                </textarea>
              </Form.Control>
            </Form.Field>
            
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
             
              <Flex align="center" gap="2">
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
              </Flex>

              
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
              
              <Form.Field className="FormField" name="name">
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
                    type="text"
                    defaultValue={product.price}
                    required
                    name="price"
                    {...register("price", { required: true })}
                  />
                </Form.Control>
              </Form.Field>

              
            </div>
            <div className="field-wrapper">
                <label htmlFor="destacado">Destacdo ?</label>
                <input
                  type="checkbox"
                  id="destacado"
                  name="destacado"
                  className="SwitchRoot"
                  {...register("destacado", { required: false })}
                />
              </div>
            
            <div className="btn_container">
              <Button
                className="Button"
                disabled={send}
                style={{ background: send ? "#49c1a388" : "#2f7a67" }}
              >
                Editar producto
              </Button>
            </div>
          </Form.Root>
        </div>
      </Container>
    </Box>
  );
};
