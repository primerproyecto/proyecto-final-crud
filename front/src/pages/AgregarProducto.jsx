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

import {
  Button,
  Box,
  Container,
  Heading,
  Flex,
  Section,
  TextArea,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogRoot,
  DialogDescription,
  DialogClose,
  Text
} from "@radix-ui/themes";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import "../components/checkboxStyles.css";

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
    useProductAddError(res, setOkAddProduct, setRes, setRecargar);
  }, [res]);

  //! ------------------------------------------------------------------------------
  //? 3) Estados de navegacion ----> lo veremos en siguiente proyectos
  //! ------------------------------------------------------------------------------

  return (
    <>
      <Box>
        <Container size="3">
          <Form.Root className="FormRoot" onSubmit={handleSubmit(formSubmit)}>
            <Heading as="h2" size="7" mb="4">
              Agregar productos
            </Heading>
            <Form.Field className="FormField" name="title">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Form.Label className="FormLabel">
                  Título del producto
                </Form.Label>
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
                <TextArea
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
            <Form.Field className="FormField">
              <Form.Control asChild>
                <>
                  <Flex gap="3" direction="column">
                    <label className="FormLabel" htmlFor="destacado">
                      Destacado ?
                    </label>
                    <input
                      type="checkbox"
                      id="destacado"
                      name="destacado"
                      className="SwitchRoot"
                      {...register("destacado", { required: false })}
                    />
                  </Flex>
                </>
              </Form.Control>
            </Form.Field>

            <Form.Field className="FormField">
              <Flex gap="3" direction="column">
                <label className="FormLabel" htmlFor="categories">
                  Categoría
                </label>
                <Flex gap="3">
                  <label htmlFor="categories">Complementos</label>
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
                </Flex>
              </Flex>
            </Form.Field>

            <Form.Submit asChild>
              <Button size="3" style={{ marginTop: 10 }}>
                Enviar
              </Button>
            </Form.Submit>
          </Form.Root>
        </Container>
      </Box>
      <DialogRoot open={okAddProduct}>
        <DialogContent>
          <DialogTitle>Producto agregado al carrito</DialogTitle>
          <DialogDescription size="4" mb="4">
          <Text>El producto se ha agregado satisfactoriamente al catálogo de productos"</Text>
          </DialogDescription>
          <Flex gap="3" justify="end">
            <DialogClose>
              <Button size="3" variant="soft" color="gray"  onClick={() => setOkAddProduct(false)}>
                Close
              </Button>
            </DialogClose>
          </Flex>
        </DialogContent>
      </DialogRoot>
    </>
  );
};
