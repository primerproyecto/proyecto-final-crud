import { useEffect, useContext, useState } from "react";
import { ProductGallery, Spinner } from "../components";
import Buscador from "../components/Buscador";
import { Search, X } from "react-feather";
import { useAuth } from "../context/authContext";
import { useProducts } from "../context/productsContext";
import { getAllProducts } from "../services/API_user/product.service";
import * as Form from "@radix-ui/react-form";

import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import "./homeStyles.css";
import './stylesCarrito.css'
import { Button, Flex, Box, Container, Section } from "@radix-ui/themes";

export const Home = () => {
  const { products, loading, setProducts, setLoading } = useProducts();
  // console.log('que son products', products)

  const [filterProducts, setFilterProducts] = useState(() => products);
  console.log("1 - que eson filterProducts", filterProducts);

  const [palabraABuscar, setPalabraABuscar] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const [value, setValue] = React.useState('');
  // función para manejar el envío de formulario.
  const handleFormSearch = (e) => {
    e.preventDefault();
    const coincidentes = products?.data.filter((item) => {
      return item.title.includes(palabraABuscar);
    });
    setFilterProducts({ data: coincidentes });
  };

  // funcion para filtrar por una cadena de texto pasada como categoriaABuscar
  const funcionFiltrar = (categoriaABuscar) => {
    const filtrados = products?.data.filter((item) => {
      return item.categories === categoriaABuscar;
    });
    // console.log("que eson filtrados", filtrados);
    // console.log("2 - que eson filterProducts", filterProducts);
    //  setFilterProducts({ data: filtrados });
    //  console.log("3 - que eson filterProducts", filterProducts);
  };

  useEffect(() => {
    //Llamamos de primera a esta función para mostrar los productos.
    getAllProducts().then((res) => {
      // setProducts(res);
      setFilterProducts(res);
      setLoading(() => false);
    });
  }, [mostrarTodos]);

  useEffect(() => {
    console.log('ALGO CAMBIA', value)
    if (value === "Complementos") {
      setFilterProducts({ data: funcionFiltrar("Complementos") });
    }
    if (value === "Electrónico") {
      setFilterProducts({ data: funcionFiltrar("Electrónico") });
    } else {
      setMostrarTodos((prevValue) => !prevValue);
    }
  }, [value]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Box>
          <Container size="3">
          <Form.Root className="FormRoot" onSubmit={handleFormSearch}>
            <Form.Field className="FormField" name="email">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Form.Label className="FormLabel">Buscar producto</Form.Label>
              </div>

              <Form.Control asChild>
                <Flex gap="3">
                <Box grow="1">
                  <input
                    className="Input"
                    type="text"
                    required
                    value={palabraABuscar}
                    onChange={(e) => {
                      setPalabraABuscar(e.target.value);
                    }}
                  />
                  </Box>
                  <Box>
                  <Button className="Button" size="small">
                    <Search />
                  </Button>
                  </Box>
                  <Box>
                  <Button
                    size="small"
                    className="Button"
                    onClick={() => setMostrarTodos(true)}
                  >
                    <X /> 
                  </Button>
                  </Box>
                </Flex>
              </Form.Control>
            </Form.Field>
          </Form.Root>

          <div>
            <ToggleGroup.Root
              className="ToggleGroup"
              type="single"
              defaultValue="center"
              value={value}
              name="categories"
              aria-label="Text alignment"
              onValueChange={(value) => {
                console.log("que es value", value);
                if (value) {
                   setValue(value);
                  // setFilterProducts(funcionFiltrar(value))
                }
              }}
            >
              <ToggleGroup.Item
                className="ToggleGroupItem"
                value="Complementos"
                aria-label="Complementos"
              >
                <TextAlignLeftIcon />
              </ToggleGroup.Item>
              <ToggleGroup.Item
                className="ToggleGroupItem"
                value="Electrónico"
                aria-label="Electrónico"
              >
                <TextAlignCenterIcon />
              </ToggleGroup.Item>
              <ToggleGroup.Item
                className="ToggleGroupItem"
                value="Todos"
                aria-label="Right aligned"
              >
                <TextAlignRightIcon />
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
          {/* <div className="destacados">
          {filterProducts ? (
              filterProducts?.data?.map((item) => {
                if(item.destacado) {
                  return <Section key={item._id}><ProductGallery producto={item} /></Section>;
                }
               
              })
            ) : (
              <h1>No hay productos destacados</h1>
            )}

          </div> */}
          <div className="grilla">
            {filterProducts ? (
              filterProducts?.data?.map((item) => {
                return <Section key={item._id} ><ProductGallery key={item._id} producto={item} /></Section>;
              })
            ) : (
              <h1>No hay productos</h1>
            )}
          </div>
          </Container>
          </Box>
        </>
      )}
    </>
  );
};
